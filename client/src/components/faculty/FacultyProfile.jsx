import React, { useState, useEffect } from 'react';
import './styles/FacultyProfile.css';
import { Download, Edit, Save, X } from "lucide-react";

const FacultyProfile = () => {
   const [results, setResults] = useState([]);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({
    photo: null,
    resume: null
  });
  const fetchFacultyData = async () => {
  const response = await fetch('http://localhost:8000/faculty/faculty_dashboard', {
    method: "GET",
    headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
  });

  if (!response.ok) {
    throw new Error(`Status ${response.status}`);
  }

  const json = await response.json();

  return {
    results: json.result || [],
    experiences: json.experiences || [],
    awards: json.awards || [],
    qualifications: json.qualifications || [],
    publications: json.publications || []
  };
};
useEffect(() => {
   fetchFacultyData().then(d => setResults(d.results));
 }, []);
  // Initialize editing mode with faculty data
  const handleEdit = (faculty) => {
    setEditingFaculty(faculty.Id || faculty.email);
    setFormData({
      // Don't include name, designation, department in editable fields
      email: faculty.Id || faculty.email,
      phone: faculty.phone || "",
      highest_qualification: faculty.highest_qualification || "",
      area_of_interest: faculty.area_of_interest || "",
      teaching_experience: faculty.teaching_experience || "",
      publications_books_patents: faculty.publications_books_patents || "",
      seminar_conference_workshop_organized: faculty.seminar_conference_workshop_organized || "",
      seminar_conference_workshop_attended: faculty.seminar_conference_workshop_attended || "",
      fellowship_awards: faculty.fellowship_awards || "",
      membership: faculty.membership || "",
      masters_supervised: faculty.masters_supervised || "",
      phd_supervised: faculty.phd_supervised || "",
      other_info: faculty.other_info || ""
    });
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFiles(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingFaculty(null);
    setFormData({});
    setFiles({ photo: null, resume: null });
  };

  // Submit form to backend
  const handleSubmit = async (e) => {
    alert('Submitting form...');
    e.preventDefault();             // 1) stop the browser's native submit
    const submitData = new FormData();
    
    // Only include editable fields, not name, designation, or department
    Object.entries(formData).forEach(([k, v]) => {
      // Ensure we're not sending name, designation, or department
      if (k !== 'name' && k !== 'designation' && k !== 'department') {
        submitData.append(k, v);
      }
    });
    
    if (files.photo)  submitData.append('photo', files.photo);
    if (files.resume) submitData.append('resume', files.resume);

    try {
      const res = await fetch('http://localhost:8000/faculty/update_faculty_details', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },    
        body: submitData,            // 3) FormData body, no Content-Type header
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      // Optionally read the JSON: const json = await res.json();
      // 4) close edit-mode on success
      alert('Profile updated!');
      setEditingFaculty(null);
      setFiles({ photo: null, resume: null });
      // re-fetch and immediately set local results
  const updated = await fetchFacultyData();
   setResults(updated.results);
     
    } catch (err) {
      console.error('Error updating faculty details:', err);
      alert('Failed to update profile. Please try again.');
    }
  };


  return (
    <div className="main-box">
      {results.map((result, idx) => (
        <div className="basic-card" key={idx}>
          {editingFaculty === (result.Id || result.email) ? (
            // Edit Form View
            <form onSubmit={handleSubmit} className="edit-form" encType="multipart/form-data">
              <div className="profile-top-row">
                {/* Left: Profile Photo */}
                <div className="profile-photo-container">
                  <img
                    src={files.photo ? URL.createObjectURL(files.photo) : `./logo512.png`}
                    alt={`${result.Name} Profile`}
                    className="profile-photo"
                    style={{
                      width: '180px',
                      height: '180px',
                      objectFit: 'cover',
                      borderRadius: '50%',
                      marginBottom: '1rem'
                    }}
                  />
                  <input 
                    type="file" 
                    name="photo" 
                    id="photo" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="file-input"
                  />
                  <label htmlFor="photo" className="file-label">Change Photo</label>
                </div>

                {/* Middle: Basic Details - Now Read-Only */}
                <div className="profile-header-info">
                  <div className="form-group">
                    <label>Name</label>
                    <div className="readonly-field">{result.Name}</div>
                  </div>
                  <div className="form-group">
                    <label>Designation</label>
                    <div className="readonly-field">{result.designation}</div>
                  </div>
                  <div className="form-group">
                    <label>Department</label>
                    <div className="readonly-field">{result.Department}</div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input 
                      type="text" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone || ''} 
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email || ''} 
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                </div>

                {/* Right: Action Buttons */}
                <div className="profile-action-buttons">
                  <button
                    type="submit"
                    className="action-button save-button"
                    title="Save Changes"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "2.5rem",
                      height: "2.5rem",
                      backgroundColor: "#198754",
                      color: "#fff",
                      border: "none",
                      borderRadius: "0.375rem",
                      cursor: "pointer",
                    }}
                  >
                    <Save size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="action-button cancel-button"
                    title="Cancel Editing"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "2.5rem",
                      height: "2.5rem",
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "0.375rem",
                      cursor: "pointer",
                    }}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Resume Upload Field */}
              <div className="resume-upload">
                <label htmlFor="resume">Resume/CV:</label>
                <input 
                  type="file" 
                  name="resume" 
                  id="resume" 
                  accept=".pdf,.doc,.docx" 
                  onChange={handleFileChange} 
                  className="file-input"
                />
                <span className="current-file">
                  {files.resume ? files.resume.name : (result.resume ? result.resume : 'No file selected')}
                </span>
              </div>

              {/* Bottom Row: Two Column Details in Edit Mode */}
              <div className="profile-details-section">
                <div className="profile-details-container">
                  <h4 className="profile-details-title">Edit Faculty Profile Details</h4>
                  
                  <div className="two-column-grid">
                    {/* Left Column */}
                    <div className="detail-section">
                      <h5>Qualifications & Experience</h5>
                      <div className="form-group">
                        <label htmlFor="highest_qualification">Highest Qualification</label>
                        <input 
                          type="text" 
                          id="highest_qualification" 
                          name="highest_qualification" 
                          value={formData.highest_qualification || ''} 
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="teaching_experience">Teaching Experience</label>
                        <input 
                          type="text" 
                          id="teaching_experience" 
                          name="teaching_experience" 
                          value={formData.teaching_experience || ''} 
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="area_of_interest">Area of Interest</label>
                        <textarea 
                          id="area_of_interest" 
                          name="area_of_interest" 
                          value={formData.area_of_interest || ''} 
                          onChange={handleChange}
                          rows="3"
                        />
                      </div>
                      
                      <h5>Research Supervision</h5>
                      <div className="form-group">
                        <label htmlFor="masters_supervised">Masters Supervised</label>
                        <input 
                          type="text" 
                          id="masters_supervised" 
                          name="masters_supervised" 
                          value={formData.masters_supervised || ''} 
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phd_supervised">Ph.D. Supervised</label>
                        <input 
                          type="text" 
                          id="phd_supervised" 
                          name="phd_supervised" 
                          value={formData.phd_supervised || ''} 
                          onChange={handleChange}
                        />
                      </div>
                      
                      <h5>Achievements</h5>
                      <div className="form-group">
                        <label htmlFor="fellowship_awards">Fellowships/Awards</label>
                        <textarea 
                          id="fellowship_awards" 
                          name="fellowship_awards" 
                          value={formData.fellowship_awards || ''} 
                          onChange={handleChange}
                          rows="3"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="membership">Memberships</label>
                        <textarea 
                          id="membership" 
                          name="membership" 
                          value={formData.membership || ''} 
                          onChange={handleChange}
                          rows="3"
                        />
                      </div>
                    </div>
                    
                    {/* Right Column */}
                    <div className="detail-section">
                      <h5>Publications & Research</h5>
                      <div className="form-group">
                        <label htmlFor="publications_books_patents">Publications/Books/Patents</label>
                        <textarea 
                          id="publications_books_patents" 
                          name="publications_books_patents" 
                          value={formData.publications_books_patents || ''} 
                          onChange={handleChange}
                          rows="5"
                        />
                      </div>
                      
                      <h5>Conferences & Workshops</h5>
                      <div className="form-group">
                        <label htmlFor="seminar_conference_workshop_organized">Organized</label>
                        <textarea 
                          id="seminar_conference_workshop_organized" 
                          name="seminar_conference_workshop_organized" 
                          value={formData.seminar_conference_workshop_organized || ''} 
                          onChange={handleChange}
                          rows="4"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="seminar_conference_workshop_attended">Attended</label>
                        <textarea 
                          id="seminar_conference_workshop_attended" 
                          name="seminar_conference_workshop_attended" 
                          value={formData.seminar_conference_workshop_attended || ''} 
                          onChange={handleChange}
                          rows="4"
                        />
                      </div>
                      
                      <h5>Additional Information</h5>
                      <div className="form-group">
                        <label htmlFor="other_info">Other Information</label>
                        <textarea 
                          id="other_info" 
                          name="other_info" 
                          value={formData.other_info || ''} 
                          onChange={handleChange}
                          rows="4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            // View Mode (Non-editing)
            <>
              {/* Top Row: Photo and Basic Details */}
              <div
                className="profile-top-row"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '2rem',
                }}
              >
                {/* Left: Profile Photo */}
                <div
                  className="profile-photo-container"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: '200px'
                  }}
                >
                  <img
                    src={`./logo512.png`}
                    alt={`${result.Name} Profile`}
                    style={{
                      width: '180px',
                      height: '180px',
                      objectFit: 'cover',
                      borderRadius: '50%',
                      marginBottom: '1rem'
                    }}
                  />
                </div>

                {/* Middle: Basic Details */}
                <div
                  className="profile-header-info"
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    textAlign: 'left'
                  }}
                >
                  <h2 style={{ margin: 0, fontSize: '1.75rem' }}>{result.Name}</h2>
                  <h4 style={{ fontWeight: 'normal', color: '#555' }}>
                    {result.designation}
                  </h4>

                  <div
                    className="profile-contact-info"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      textAlign: 'left',
                      lineHeight: 1.5,
                      marginTop: '1rem'
                    }}
                  >
                    <div>
                      <i className="fa fa-building" style={{ marginRight: '0.5rem' }} />
                      {result.Department}
                    </div>
                    <div>
                      <i className="fa fa-phone" style={{ marginRight: '0.5rem' }} />
                      {result.phone}
                    </div>
                    <div>
                      <i className="fa fa-envelope" style={{ marginRight: '0.5rem' }} />
                      {result.email || result.Id}
                    </div>
                  </div>
                </div>

                {/* Right: Action Buttons */}
                <div  
                  className="profile-action-buttons"
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginLeft: "auto",
                    alignItems: "center",
                  }}
                >
                  {/* Download (Primary Blue) */}
                  <a
                    href={`/docs/${result.resume}`}
                    download
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "2.5rem",
                      height: "2.5rem",
                      backgroundColor: "#0d6efd",
                      color: "#fff",
                      borderRadius: "0.375rem",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                    title="Download Resume"
                  >
                    <Download size={20} />
                  </a>

                  {/* Edit (Secondary Gray) */}
                  <button
                    onClick={() => handleEdit(result)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "2.5rem",
                      height: "2.5rem",
                      backgroundColor: "#6c757d",
                      color: "#fff",
                      border: "none",
                      borderRadius: "0.375rem",
                      cursor: "pointer",
                    }}
                    title="Edit Profile"
                  >
                    <Edit size={20} />
                  </button>
                </div>
              </div>

              {/* Bottom Row: Two Column Details */}
              <div className="profile-details-section">
                <div className="profile-details-container">
                  <h4 className="profile-details-title">Faculty Profile Details</h4>
                  
                  <div className="two-column-grid">
                    {/* Left Column */}
                    <div className="detail-section">
                      <h5>Qualifications & Experience</h5>
                      <table className="detail-table">
                        <tbody>
                          <tr>
                            <th>Highest Qualification</th>
                            <td>{result.highest_qualification}</td>
                          </tr>
                          <tr>
                            <th>Teaching Experience</th>
                            <td>{result.teaching_experience}</td>
                          </tr>
                          <tr>
                            <th>Area of Interest</th>
                            <td>{result.area_of_interest}</td>
                          </tr>
                        </tbody>
                      </table>
                      
                      <h5>Research Supervision</h5>
                      <table className="detail-table">
                        <tbody>
                          <tr>
                            <th>Masters Supervised</th>
                            <td>{result.masters_supervised}</td>
                          </tr>
                          <tr>
                            <th>Ph.D. Supervised</th>
                            <td>{result.phd_supervised}</td>
                          </tr>
                        </tbody>
                      </table>
                      
                      <h5>Achievements</h5>
                      <table className="detail-table">
                        <tbody>
                          <tr>
                            <th>Fellowships/Awards</th>
                            <td>{result.fellowship_awards}</td>
                          </tr>
                          <tr>
                            <th>Memberships</th>
                            <td>{result.membership}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Right Column */}
                    <div className="detail-section">
                      <h5>Publications & Research</h5>
                      <table className="detail-table">
                        <tbody>
                          <tr>
                            <th>Publications/Books/Patents</th>
                            <td>{result.publications_books_patents}</td>
                          </tr>
                        </tbody>
                      </table>
                      
                      <h5>Conferences & Workshops</h5>
                      <table className="detail-table">
                        <tbody>
                          <tr>
                            <th>Organized</th>
                            <td>{result.seminar_conference_workshop_organized}</td>
                          </tr>
                          <tr>
                            <th>Attended</th>
                            <td>{result.seminar_conference_workshop_attended}</td>
                          </tr>
                        </tbody>
                      </table>
                      
                      <h5>Additional Information</h5>
                      <table className="detail-table">
                        <tbody>
                          <tr>
                            <th>Other Information</th>
                            <td>{result.other_info}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default FacultyProfile;