import React, { useEffect, useState } from 'react';
import './styles/FacultyExperience.css';
import { Trash2 } from 'lucide-react';
const FacultyExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExperience, setNewExperience] = useState({
    designation: '',
    from: '',
    to: '',
    organization: ''
  });
  const fetchExperiences = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:8000/faculty/faculty_experiences', {
          method: 'GET',
         headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
        
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }
        
        const data = await res.json();
        setExperiences(data.experiences);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching experiences:', err);
        setError('Failed to load experiences. Please try again later.');
        setLoading(false);
      }
    };
  useEffect(() => {
  

    fetchExperiences();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        const res = await fetch(`http://localhost:8000/faculty/delete_faculty_experience/${id}`, {
          method: 'POST',
           headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
        
        if (res.ok) {
            alert('Experience deleted successfully!');
          fetchExperiences(); // Refresh the list of experiences
        } else {
          throw new Error('Failed to delete experience');
        }
      } catch (err) {
        alert('Failed to delete experience. Please try again.');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExperience(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/faculty/update_faculty_experience', {
        method: 'POST',
         headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          designation: newExperience.designation,
          _from: newExperience.from,
          _to: newExperience.to,
          organization: newExperience.organization
        }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

     alert('Experience added successfully!');

      fetchExperiences(); // Refresh the list of experiences
      // Reset the form
      setNewExperience({
        designation: '',
        from: '',
        to: '',
        organization: ''
      });
      
      // Hide the form
      setShowAddForm(false);
    } catch (err) {
      console.error('Error adding experience:', err);
      alert('Failed to add experience. Please try again.');
    }
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  return (
    <div className="faculty-container">
      {/* Sidebar navigation would go here */}
      
      <div className="experience-content">
        <header className="experience-header">
          <h2>Professional Experience</h2>
          <button className="add-button" onClick={toggleAddForm}>
            {showAddForm ? 'Cancel' : 'Add New Experience'}
          </button>
        </header>

        {error && <div className="error-message">{error}</div>}
        
        {loading ? (
          <div className="loading-spinner">Loading experiences...</div>
        ) : (
          <div className="experience-wrapper">
            {showAddForm && (
              <div className="add-experience-form">
                <h3>Add New Experience</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-field">
                    <label htmlFor="designation">Designation</label>
                    <input 
                      type="text" 
                      id="designation" 
                      name="designation"
                      value={newExperience.designation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="from">From</label>
                      <input 
                        type="text" 
                        id="from" 
                        name="from"
                        placeholder="YYYY-MM-DD"
                        value={newExperience.from}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="to">To</label>
                      <input 
                        type="text" 
                        id="to" 
                        name="to"
                        placeholder="YYYY-MM-DD or Present"
                        value={newExperience.to}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="organization">Organization</label>
                    <input 
                      type="text" 
                      id="organization" 
                      name="organization"
                      value={newExperience.organization}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="submit-button">
                      <i className="fa-solid fa-upload"></i> Save Experience
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="experiences-list">
              {experiences.length === 0 ? (
                <div className="no-experiences">No professional experiences found. Add your first experience!</div>
              ) : (
                experiences.map((experience, index) => (
                  <div key={experience.id || index} className="experience-card">
                    <div className="experience-header-card">
                      <h3 className="experience-title">{experience.position}</h3>
                    <div className="experience-actions">
  <button
    className="delete-button"
    onClick={() => handleDelete(experience.id)}
    aria-label="Delete experience"
  >
    <Trash2 size={18} /> 
  </button>
</div>
                    </div>
                    
                    <div className="experience-details">
                      <div className="detail-row">
                        <span className="detail-label">Organization:</span>
                        <span className="detail-value">{experience.organization}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Period:</span>
                        <span className="detail-value">{experience._from} - {experience._to}</span>
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

export default FacultyExperience;