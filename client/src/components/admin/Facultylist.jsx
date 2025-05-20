import React, { useEffect, useState } from "react";
import { X, Search, Edit, List, Grid } from "lucide-react";
import "./styles/FacultyCardList.css";

const BASE_URL = encodeURI("http://localhost:8000");

// Modal Component
const FacultyDetailModal = ({ faculty, onClose, onEdit }) => {
  if (!faculty) {
    return null;
  }

  return (
    <div className="ad-faculty-detail-modal-overlay">
      <div className="ad-faculty-detail-modal">
        <div className="ad-panel-header">
          <button onClick={onClose} className="ad-close-detail-button-modal">
            <X size={24} />
          </button>
          <button onClick={() => onEdit(faculty)} className="ad-edit-detail-button">
            <Edit size={24} />
          </button>
        </div>

        <div className="ad-faculty-profile-header">
          <div className="ad-faculty-detail-image">
            <img
              src={
                faculty.Photo ||
                faculty.photo ||
                `https://picsum.photos/seed/${encodeURIComponent(
                  faculty.Id || faculty.email
                )}/200/200`
              }
              alt={faculty.Name || faculty.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://picsum.photos/seed/${encodeURIComponent(
                  faculty.Id || faculty.email
                )}/200/200`;
              }}
            />
          </div>

          <div className="ad-faculty-detail-info">
            <h2 className="ad-faculty-detail-name">
              {faculty.Name || faculty.name}
            </h2>
            <p className="ad-faculty-detail-designation">
              {faculty.Designation || faculty.designation}
            </p>
            <p className="ad-faculty-detail-department">
              {faculty.Department || faculty.department}
            </p>
          </div>
        </div>

        <div className="ad-detail-sections">
          <div className="ad-faculty-details-grid">
            <div className="ad-detail-section">
              <h3 className="ad-detail-item-title">Qualification</h3>
              <p className="ad-detail-item-content">
                {faculty.Qualification || faculty.highest_qualification}
              </p>
            </div>

            <div className="ad-detail-section">
              <h3 className="ad-detail-item-title">Experience</h3>
              <p className="ad-detail-item-content">
                {faculty.Experience || faculty.teaching_experience}
              </p>
            </div>

            <div className="ad-detail-section">
              <h3 className="ad-detail-item-title">Email</h3>
              <p className="ad-detail-item-content">
                {faculty.Email || faculty.email}
              </p>
            </div>

            <div className="ad-detail-section">
              <h3 className="ad-detail-item-title">Phone</h3>
              <p className="ad-detail-item-content">
                {faculty.Mobile || faculty.phone}
              </p>
            </div>
          </div>

          {(faculty.area_of_interest || faculty.Area_of_Interest) && (
            <div className="ad-detail-section">
              <h3 className="ad-detail-section-title">Areas of Interest</h3>
              <p className="ad-detail-section-content">
                {faculty.area_of_interest || faculty.Area_of_Interest}
              </p>
            </div>
          )}

          {(faculty.publications_books_patents || faculty.Publications) && (
            <div className="ad-detail-section">
              <h3 className="ad-detail-section-title">
                Publications/Books/Patents
              </h3>
              <p className="ad-detail-section-content">
                {faculty.publications_books_patents || faculty.Publications}
              </p>
            </div>
          )}

          {(faculty.seminar_conference_workshop_organized ||
            faculty.Seminars_Organized) && (
            <div className="ad-detail-section">
              <h3 className="ad-detail-section-title">
                Seminars/Conferences Organized
              </h3>
              <p className="ad-detail-section-content">
                {faculty.seminar_conference_workshop_organized ||
                  faculty.Seminars_Organized}
              </p>
            </div>
          )}

          {(faculty.seminar_conference_workshop_attended ||
            faculty.Seminars_Attended) && (
            <div className="ad-detail-section">
              <h3 className="ad-detail-section-title">
                Seminars/Conferences Attended
              </h3>
              <p className="ad-detail-section-content">
                {faculty.seminar_conference_workshop_attended ||
                  faculty.Seminars_Attended}
              </p>
            </div>
          )}

          {(faculty.fellowship_awards || faculty.Awards) && (
            <div className="ad-detail-section">
              <h3 className="ad-detail-section-title">Fellowships/Awards</h3>
              <p className="ad-detail-section-content">
                {faculty.fellowship_awards || faculty.Awards}
              </p>
            </div>
          )}

          {(faculty.masters_supervised || faculty.Masters_Supervised) && (
            <div className="ad-detail-section">
              <h3 className="ad-detail-section-title">
                Masters Students Supervised
              </h3>
              <p className="ad-detail-section-content">
                {faculty.masters_supervised || faculty.Masters_Supervised}
              </p>
            </div>
          )}

          {(faculty.phd_supervised || faculty.PhD_Supervised) && (
            <div className="ad-detail-section">
              <h3 className="ad-detail-section-title">PhD Students Supervised</h3>
              <p className="ad-detail-section-content">
                {faculty.phd_supervised || faculty.PhD_Supervised}
              </p>
            </div>
          )}

          {(faculty.other_info || faculty.Other_Info) && (
            <div className="ad-detail-section">
              <h3 className="ad-detail-section-title">Additional Information</h3>
              <p className="ad-detail-section-content">
                {faculty.other_info || faculty.Other_Info}
              </p>
            </div>
          )}

          {(faculty.resume || faculty.Resume) && (
            <a
              href={faculty.resume || faculty.Resume}
              target="_blank"
              rel="noopener noreferrer"
              className="ad-resume-button"
            >
              View Resume
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const FacultyCardList = () => {
  const [adFaculty, setAdFaculty] = useState([]);
  const [adLoading, setAdLoading] = useState(true);
  const [adSearchTerm, setAdSearchTerm] = useState("");
  const [adSelectedDepartment, setAdSelectedDepartment] = useState("");
  const [adDepartments, setAdDepartments] = useState([]);
  const [adSelectedFaculty, setAdSelectedFaculty] = useState(null);
  const [adIsModalOpen, setAdIsModalOpen] = useState(false);
  const [adIsCreating, setAdIsCreating] = useState(false);
  const [adView, setAdView] = useState("grid"); // 'grid' or 'list'
  const [adNewFacultyData, setAdNewFacultyData] = useState({
    name: "",
    designation: "",
    department: "",
    email: "",
    photo: null,
  });

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    setAdLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/faculty/facultylist`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error(`Status ${response.status}`);

      const data = await response.json();
      const facultyList = data.send || [];
      setAdFaculty(facultyList);

      const uniqueDepartments = [
        ...new Set(facultyList.map((item) => item.Department).filter(Boolean)),
      ].sort();
      setAdDepartments(uniqueDepartments);
    } catch (error) {
      console.error("Error fetching faculty data:", error);
    } finally {
      setAdLoading(false);
    }
  };

  const handleCardClick = (faculty) => {
    setAdSelectedFaculty(faculty);
    setAdIsModalOpen(true);
  };

  const closeDetails = () => {
    setAdIsModalOpen(false);
    setAdSelectedFaculty(null);
    setAdIsCreating(false);
    setAdNewFacultyData({
      name: "",
      designation: "",
      department: "",
      email: "",
      photo: null,
    });
  };

  const handleEditFaculty = (facultyMember) => {
    setAdIsCreating(true);
    setAdSelectedFaculty(facultyMember);
    setAdNewFacultyData({
      name: facultyMember.Name || facultyMember.name,
      designation: facultyMember.Designation || facultyMember.designation,
      department: facultyMember.Department || facultyMember.department,
      email: facultyMember.Email || facultyMember.email,
      photo: facultyMember.Photo || facultyMember.photo,
    });
    setAdIsModalOpen(true);
  };

  const handleSaveFaculty = () => {
    if (adIsCreating) {
      // Create new faculty member (in real app, send to API)
      const newId = String(
        Math.max(...adFaculty.map((f) => Number(f.Id || f.email))) + 1
      ); // Simple ID generation
      const newFaculty = {
        ...adNewFacultyData,
        id: newId,
        photo: adNewFacultyData.photo || null,
      }; // Ensure photo is handled
      setAdFaculty([...adFaculty, newFaculty]);
      console.log("Creating Faculty:", newFaculty);
    } else if (adSelectedFaculty) {
      // Update existing faculty member (in real app, send to API)
      const updatedFaculty = { ...adSelectedFaculty, ...adNewFacultyData };
      setAdFaculty(
        adFaculty.map((f) =>
          (f.Id || f.email) === (adSelectedFaculty.Id || adSelectedFaculty.email)
            ? updatedFaculty
            : f
        )
      );
      console.log("Updating Faculty:", updatedFaculty);
    }
    setAdIsCreating(false);
    setAdIsModalOpen(false); // Close modal and reset form state
    setAdNewFacultyData({
      // Reset form data
      name: "",
      designation: "",
      department: "",
      email: "",
      photo: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdNewFacultyData({ ...adNewFacultyData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload this file to a server
      // and get back a URL.  For this example, we'll just
      // use a data URL.
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdNewFacultyData({ ...adNewFacultyData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setAdNewFacultyData({ ...adNewFacultyData, photo: null });
    }
  };

  const filteredFaculty = adFaculty.filter((item) => {
    const matchesSearch = item.Name?.toLowerCase().includes(
      adSearchTerm.toLowerCase()
    );
    const matchesDepartment =
      !adSelectedDepartment || item.Department === adSelectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  if (adLoading) {
    return (
      <div className="ad-flex ad-items-center ad-justify-center ad-h-64">
        <div className="ad-text-lg ad-text-gray-600">Loading faculty data...</div>
      </div>
    );
  }

  return (
    <div className="ad-faculty-directory-container">
      <div className="ad-faculty-header">
        <h2>Faculty Directory</h2>
      </div>

      <div className="ad-search-filter-container">
        <div className="ad-search-box">
          <Search className="ad-search-icon ad-custom-search-icon" size={18} />
          <input
            type="text"
            placeholder="Search by name..."
            value={adSearchTerm}
            onChange={(e) => setAdSearchTerm(e.target.value)}
            className="ad-f-search-input"
          />
        </div>

        <div className="ad-department-filter">
          <select
            value={adSelectedDepartment}
            onChange={(e) => setAdSelectedDepartment(e.target.value)}
            className="ad-department-select"
          >
            <option value="">All Departments</option>
            {adDepartments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <button
            onClick={() => setAdView(adView === "grid" ? "list" : "grid")}
            className="ad-view-toggle-button"
          >
            {adView === "grid" ? <List size={20} /> : <Grid size={20} />}
          </button>
        </div>
      </div>

      {filteredFaculty.length === 0 ? (
        <div className="ad-no-results-container">
          <p className="ad-no-results-message">
            No faculty records found.{" "}
            {adSearchTerm || adSelectedDepartment
              ? "Try changing your search criteria."
              : ""}
          </p>
        </div>
      ) : (
        <div
          className={`ad-faculty-container ${
            adIsModalOpen && window.innerWidth < 768
              ? "ad-modal-open"
              : adSelectedFaculty
              ? "ad-detail-view"
              : ""
          }`}
        >
          <div className="ad-faculty-view-container">
            {/* View Toggle Buttons */}

            {/* Grid View */}
            {adView === "grid" && (
              <div className="ad-faculty-grid">
                {filteredFaculty.map((faculty) => (
                  <div
                    key={faculty.Id || faculty.email}
                    className="ad-faculty-grid-card"
                    onClick={() => handleCardClick(faculty)}
                  >
                    <div className="ad-faculty-image-container">
                      <img
                        src={
                          faculty.Photo ||
                          `${BASE_URL}/faculty_photos/${faculty.photo}` ||
                          `https://picsum.photos/seed/${encodeURIComponent(
                            faculty.Id || faculty.email
                          )}/200/200`
                        }
                        alt={faculty.Name || faculty.name}
                        className="ad-faculty-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://picsum.photos/seed/${encodeURIComponent(
                            faculty.Id || faculty.email
                          )}/200/200`;
                        }}
                      />
                    </div>
                    <div className="ad-faculty-info">
                      <h3 className="ad-faculty-name">
                        {faculty.Name || faculty.name}
                      </h3>
                      <p className="ad-faculty-department">
                        {faculty.Department || faculty.department}
                      </p>
                      <p className="ad-faculty-designation">
                        {faculty.Designation || faculty.designation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* List View */}
            {adView === "list" && (
              <div className="ad-faculty-list">
                <div className="ad-list-header">
                  <div className="ad-header-item ad-photo-header">Photo</div>
                  <div className="ad-header-item">Name</div>
                  <div className="ad-header-item">Department</div>
                  <div className="ad-header-item">Designation</div>
                </div>
                {filteredFaculty.map((faculty) => (
                  <div
                    key={faculty.Id || faculty.email}
                    className="ad-faculty-list-item"
                    onClick={() => handleCardClick(faculty)}
                  >
                    <div className="ad-list-item-photo">
                      <img
                        src={
                          faculty.Photo ||`${BASE_URL}/faculty_photos/${faculty.photo}` ||
                          `https://picsum.photos/seed/${encodeURIComponent(
                            faculty.Id || faculty.email
                          )}/200/200`
                        }
                        alt={faculty.Name || faculty.name}
                        className="ad-faculty-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://picsum.photos/seed/${encodeURIComponent(
                            faculty.Id || faculty.email
                          )}/200/200`;
                        }}
                      />
                    </div>
                    <div className="ad-list-item-name">
                      {faculty.Name || faculty.name}
                    </div>
                    <div className="ad-list-item-department">
                      {faculty.Department || faculty.department}
                    </div>
                    <div className="ad-list-item-designation">
                      {faculty.Designation || faculty.designation}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {filteredFaculty.length === 0 && (
              <div className="ad-no-results">
                <p>No faculty members found matching your criteria</p>
              </div>
            )}
          </div>

          {window.innerWidth >= 768 && adSelectedFaculty && (
            <div className="ad-faculty-detail-panel">
              <div className="ad-panel-header">
                <button onClick={closeDetails} className="ad-close-detail-button">
                  <X size={24} />
                </button>
                <button
                  onClick={() => handleEditFaculty(adSelectedFaculty)}
                  className="ad-edit-detail-button"
                >
                  <Edit size={24} />
                </button>
              </div>
              <div className="ad-faculty-profile-header">
                <div className="ad-faculty-detail-image">
                  <img
                    src={
                      adSelectedFaculty.Photo ||
                      adSelectedFaculty.photo ||
                      `https://picsum.photos/seed/${encodeURIComponent(
                        adSelectedFaculty.Id || adSelectedFaculty.email
                      )}/200/200`
                    }
                    alt={adSelectedFaculty.Name || adSelectedFaculty.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://picsum.photos/seed/${encodeURIComponent(
                        adSelectedFaculty.Id || adSelectedFaculty.email
                      )}/200/200`;
                    }}
                  />
                </div>

                <div className="ad-faculty-detail-info">
                  <h2 className="ad-faculty-detail-name">
                    {adSelectedFaculty.Name || adSelectedFaculty.name}
                  </h2>
                  <p className="ad-faculty-detail-designation">
                    {adSelectedFaculty.Designation ||
                      adSelectedFaculty.designation}
                  </p>
                  <p className="ad-faculty-detail-department">
                    {adSelectedFaculty.Department ||
                      adSelectedFaculty.department}
                  </p>
                </div>
              </div>

              <div className="ad-detail-sections">
                <div className="ad-faculty-details-grid">
                  <div className="ad-detail-section">
                    <h3 className="ad-detail-item-title">Qualification</h3>
                    <p className="ad-detail-item-content">
                      {adSelectedFaculty.Qualification ||
                        adSelectedFaculty.highest_qualification}
                    </p>
                  </div>

                  <div className="ad-detail-section">
                    <h3 className="ad-detail-item-title">Experience</h3>
                    <p className="ad-detail-item-content">
                      {adSelectedFaculty.Experience ||
                        adSelectedFaculty.teaching_experience}
                    </p>
                  </div>

                  <div className="ad-detail-section">
                    <h3 className="ad-detail-item-title">Email</h3>
                    <p className="ad-detail-item-content">
                      {adSelectedFaculty.Email || adSelectedFaculty.email}
                    </p>
                  </div>

                  <div className="ad-detail-section">
                    <h3 className="ad-detail-item-title">Phone</h3>
                    <p className="ad-detail-item-content">
                      {adSelectedFaculty.Mobile || adSelectedFaculty.phone}
                    </p>
                  </div>
                </div>

                {(adSelectedFaculty.area_of_interest ||
                  adSelectedFaculty.Area_of_Interest) && (
                  <div className="ad-detail-section">
                    <h3 className="ad-detail-section-title">Areas of Interest</h3>
                    <p className="ad-detail-section-content">
                      {adSelectedFaculty.area_of_interest ||
                        adSelectedFaculty.Area_of_Interest}
                    </p>
                  </div>
                )}

                {(adSelectedFaculty.publications_books_patents ||
                  adSelectedFaculty.Publications) && (
                  <div className="ad-detail-section">
                    <h3 className="ad-detail-section-title">
                      Publications/Books/Patents
                    </h3>
                    <p className="ad-detail-section-content">
                      {adSelectedFaculty.publications_books_patents ||
                        adSelectedFaculty.Publications}
                    </p>
                  </div>
                )}

                {(adSelectedFaculty.seminar_conference_workshop_organized ||
                  adSelectedFaculty.Seminars_Organized) && (
                  <div className="ad-detail-section">
                    <h3 className="ad-detail-section-title">
                      Seminars/Conferences Organized
                    </h3>
                    <p className="ad-detail-section-content">
                      {adSelectedFaculty.seminar_conference_workshop_organized ||
                        adSelectedFaculty.Seminars_Organized}
                    </p>
                  </div>
                )}

                {(adSelectedFaculty.seminar_conference_workshop_attended ||
                  adSelectedFaculty.Seminars_Attended) && (
                  <div className="ad-detail-section">
                    <h3 className="ad-detail-section-title">
                      Seminars/Conferences Attended
                    </h3>
                    <p className="ad-detail-section-content">
                      {adSelectedFaculty.seminar_conference_workshop_attended ||
                        adSelectedFaculty.Seminars_Attended}
                    </p>
                  </div>
                )}

                {(adSelectedFaculty.fellowship_awards ||
                  adSelectedFaculty.Awards) && (
                  <div className="ad-detail-section">
                    <h3 className="ad-detail-section-title">Fellowships/Awards</h3>
                    <p className="ad-detail-section-content">
                      {adSelectedFaculty.fellowship_awards ||
                        adSelectedFaculty.Awards}
                    </p>
                  </div>
                )}

                {(adSelectedFaculty.masters_supervised ||
                  adSelectedFaculty.Masters_Supervised) && (
                  <div className="ad-detail-section">
                    <h3 className="ad-detail-section-title">
                      Masters Students Supervised
                    </h3>
                    <p className="ad-detail-section-content">
                      {adSelectedFaculty.masters_supervised ||
                        adSelectedFaculty.Masters_Supervised}
                    </p>
                  </div>
                )}

                {(adSelectedFaculty.phd_supervised ||
                  adSelectedFaculty.PhD_Supervised) && (
                  <div className="ad-detail-section">
                    <h3 className="ad-detail-section-title">
                      PhD Students Supervised
                    </h3>
                    <p className="ad-detail-section-content">
                      {adSelectedFaculty.phd_supervised ||
                        adSelectedFaculty.PhD_Supervised}
                    </p>
                  </div>
                )}

                {(adSelectedFaculty.other_info ||
                  adSelectedFaculty.Other_Info) && (
                  <div className="ad-detail-section">
                    <h3 className="ad-detail-section-title">
                      Additional Information
                    </h3>
                    <p className="ad-detail-section-content">
                      {adSelectedFaculty.other_info ||
                        adSelectedFaculty.Other_Info}
                    </p>
                  </div>
                )}

                {(adSelectedFaculty.resume || adSelectedFaculty.Resume) && (
                  <a
                    href={adSelectedFaculty.resume || adSelectedFaculty.Resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ad-resume-button"
                  >
                    View Resume
                  </a>
                )}
              </div>
            </div>
          )}

          {adIsModalOpen && window.innerWidth < 768 && (
            <FacultyDetailModal
              faculty={adSelectedFaculty}
              onClose={closeDetails}
              onEdit={handleEditFaculty} // Pass handleEditFaculty
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FacultyCardList;