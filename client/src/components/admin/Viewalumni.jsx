import React, { useEffect, useState } from "react";
import "./styles/ViewAlumni.css";

const BASE_URL = encodeURI("http://localhost:8000");

const ViewAlumni = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await fetch(`${BASE_URL}/alumni/viewalumni`, {
        method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setAlumni(data.send || []);
      } catch (err) {
        console.error("Error fetching alumni:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlumni();
  }, []);

  if (loading) {
    return (
      <div className="view-alumni-container">
        <h2 className="page-title">Alumni List</h2>
        <div className="content-row">
          <div className="main-content">
            <table className="alumni-table loading-table">
              <thead>
                <tr>
                  <th className="loading-cell"><div className="skeleton h-6 w-20"></div></th>
                  <th className="loading-cell"><div className="skeleton h-6 w-20"></div></th>
                  <th className="loading-cell"><div className="skeleton h-6 w-20"></div></th>
                  <th className="loading-cell"><div className="skeleton h-6 w-32"></div></th>
                  <th className="loading-cell"><div className="skeleton h-6 w-24"></div></th>
                  <th className="loading-cell"><div className="skeleton h-6 w-32"></div></th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td className="loading-cell"><div className="skeleton h-16 w-16 rounded-full"></div></td>
                    <td className="loading-cell"><div className="skeleton h-6 w-32"></div></td>
                    <td className="loading-cell"><div className="skeleton h-6 w-32"></div></td>
                    <td className="loading-cell"><div className="skeleton h-6 w-48"></div></td>
                    <td className="loading-cell"><div className="skeleton h-6 w-32"></div></td>
                    <td className="loading-cell"><div className="skeleton h-6 w-48"></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="view-alumni-container">
      <h2 className="page-title">Alumni List</h2>
      <div className="content-row">
        <div className="main-content">
          {alumni.length > 0 ? (
            <table className="alumni-table">
              <thead>
                <tr>
                  <th className="alumni-table-head">Photo</th>
                  <th className="alumni-table-head">Name</th>
                  <th className="alumni-table-head">Designation</th>
                  <th className="alumni-table-head">Working Place</th>
                  <th className="alumni-table-head">Mobile Number</th>
                  <th className="alumni-table-head">Email</th>
                </tr>
              </thead>
              <tbody>
                {alumni.map((row) => (
                  <tr key={row.Id}>
                    <td className="alumni-table-cell">
                      <img
                        src={`${BASE_URL}/docs/${row.Photo}`}
                        alt={row.Name}
                        className="alumni-photo"
                      />
                    </td>
                    <td className="alumni-table-cell name">{row.Name}</td>
                    <td className="alumni-table-cell">{row.Designation}</td>
                    <td className="alumni-table-cell">{row.WorkingAddress}</td>
                    <td className="alumni-table-cell mobile">{row.Mobile}</td>
                    <td className="alumni-table-cell email">{row.Email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-records">No Record Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAlumni;
