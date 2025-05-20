import React, { useEffect, useState } from 'react';
import './styles/FacultyQualifications.css';
import { Trash2 } from 'lucide-react';

const FacultyQualifications = () => {
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newQualification, setNewQualification] = useState({
    degree: '',
    specialisation: '',
    institute: '',
    year: ''
  });

  const fetchQualifications = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8000/faculty/faculty_qualifications', {
        method: 'GET',
       headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const data = await res.json();
      setQualifications(data.qualifications);
    } catch (err) {
      console.error('Error fetching qualifications:', err);
      setError('Failed to load qualifications. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchQualifications(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this qualification?')) return;
    try {
      const res = await fetch(`http://localhost:8000/faculty/delete_faculty_qualification/${id}`, {
        method: 'POST',
         headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      alert('Qualification deleted successfully!');
      fetchQualifications();
    } catch (err) {
      console.error('Error deleting qualification:', err);
      alert('Failed to delete qualification. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQualification(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/faculty/update_faculty_qualification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type':'application/json',
        },
        body: JSON.stringify(newQualification)
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      alert('Qualification added successfully!');
      fetchQualifications();
      setNewQualification({ degree: '', specialisation: '', institute: '', year: '' });
      setShowAddForm(false);
    } catch (err) {
      console.error('Error adding qualification:', err);
      alert('Failed to add qualification. Please try again.');
    }
  };

  return (
    <div className="faculty-container">
      <div className="qualification-content">
        <header className="qualification-header">
          <h2>Educational Qualifications</h2>
          <button className="add-button" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Cancel' : 'Add New Qualification'}
          </button>
        </header>

        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <div className="loading-spinner">Loading qualifications...</div>
        ) : (
          <div className="qualification-wrapper">
            {showAddForm && (
              <div className="add-qualification-form">
                <h3>Add New Qualification</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="degree">Degree</label>
                      <input id="degree" name="degree" type="text" placeholder="e.g., Ph.D., M.Tech, B.E." value={newQualification.degree} onChange={handleInputChange} required />
                    </div>
                    <div className="form-field">
                      <label htmlFor="specialisation">Field of Study</label>
                      <input id="specialisation" name="specialisation" type="text" placeholder="e.g., Computer Science" value={newQualification.specialisation} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="institute">Institution</label>
                    <input id="institute" name="institute" type="text" placeholder="University/College Name" value={newQualification.institute} onChange={handleInputChange} required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="year">Year of Completion</label>
                    <input id="year" name="year" type="text" placeholder="YYYY" value={newQualification.year} onChange={handleInputChange} required />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="submit-button">
                      <i className="fa-solid fa-upload"></i> Save Qualification
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="qualifications-list">
              {qualifications.length === 0 ? (
                <div className="no-qualifications">No qualifications found. Add your first qualification!</div>
              ) : (
                qualifications.map((q) => (
                  <div key={q.id} className="qualification-card">
                    <div className="qualification-header-card">
                      <div className="qualification-title-container">
                        <h3 className="qualification-title">{q.degree}</h3>
                        <span className="qualification-field">{q.specialization}</span>
                      </div>
                      <div className="qualification-actions">
                        <button className="delete-button" onClick={() => handleDelete(q.id)} aria-label="Delete qualification">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="qualification-details">
                      <div className="detail-row">
                        <span className="detail-label">Institution:</span>
                        <span className="detail-value">{q.institute}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Year:</span>
                        <span className="detail-value">{q.year}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyQualifications;
