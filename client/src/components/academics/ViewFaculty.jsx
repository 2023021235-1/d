import React, { useEffect, useState } from "react";
import "./styles/ViewFaculty.css";

const FacultyList = ({ factultyType }) => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/faculty/facultylist`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Status ${response.status}`);
        }

        const { send } = await response.json();
        const filtered = send.filter((f) => f.Department === factultyType);
        setFaculty(filtered);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Something went wrong!");
        setLoading(false);
      }
    };

    fetchFaculty();
  }, [factultyType]);

  return (
    <div className="faculty-container" id="facultyContainer">
      <div className="faculty-heading">
        <h1>Faculty List</h1>
      </div>

      {loading ? (
        <p className="faculty-message">Loading...</p>
      ) : error ? (
        <p className="faculty-error">{error}</p>
      ) : faculty.length > 0 ? (
        <div className="faculty-grid">
          {faculty.map((result) => (
            <div className="faculty-card" key={result.Id}>
              <img
                src={`/docs/${result.photo}`}
                alt="Profile"
                className="faculty-photo"
              />
              <div className="faculty-content">
                <h2 className="faculty-name">{result.Name}</h2>
                <p className="faculty-designation">{result.Designation}</p>
                <p className="faculty-email">{result.Email}</p>
                <a
                  href={`/facutly_profile/${result.Id}`}
                  className="faculty-button"
                  role="button"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="faculty-message">No faculty found.</p>
      )}
    </div>
  );
};

export default FacultyList;
