import React, { useEffect, useState } from 'react';
import './styles/FacultyAwards.css';
import { Trash2 } from 'lucide-react';

const FacultyAwards = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAward, setNewAward] = useState({
    title: '',
    year: '',
    organization: ''
  });

  const fetchAwards = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8000/faculty/faculty_awards', {
       headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,}
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const data = await res.json();
      setAwards(data.awards);
    } catch (err) {
      console.error('Error fetching awards:', err);
      setError('Failed to load awards. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAwards(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this award?')) return;
    try {
      const res = await fetch(`http://localhost:8000/faculty/delete_faculty_award/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      alert('Award deleted successfully!');
      fetchAwards();
    } catch (err) {
      console.error('Error deleting award:', err);
      alert('Failed to delete award. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAward(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/faculty/update_faculty_award', {
        method: 'POST',
        
         headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  'Content-Type': 'application/json'},
       
        body: JSON.stringify({
          title: newAward.title,
          year: newAward.year,
          organization: newAward.organization
        })
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      alert('Award added successfully!');
      fetchAwards();
      setNewAward({ title: '', year: '', organization: '' });
      setShowAddForm(false);
    } catch (err) {
      console.error('Error adding award:', err);
      alert('Failed to add award. Please try again.');
    }
  };

  return (
    <div className="faculty-container">
      <div className="awards-content">
        <header className="awards-header">
          <h2>Awards and Honours</h2>
          <button className="add-button" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Cancel' : 'Add New Award'}
          </button>
        </header>

        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <div className="loading-spinner">Loading awards...</div>
        ) : (
          <div className="awards-wrapper">
            {showAddForm && (
              <div className="add-award-form">
                <h3>Add New Award</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-field">
                    <label htmlFor="title">Award Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newAward.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="year">Year</label>
                    <input
                      type="text"
                      id="year"
                      name="year"
                      placeholder="YYYY"
                      value={newAward.year}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="organization">Awarding Organization</label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={newAward.organization}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="submit-button">
                      <i className="fa-solid fa-upload"></i> Save Award
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="awards-list">
              {awards.length === 0 ? (
                <div className="no-awards">No awards found. Add your first award!</div>
              ) : (
                awards.map((award) => (
                  <div key={award.id} className="award-card">
                    <div className="award-header-card">
                      <h3 className="award-title">{award.award}</h3>
                      <div className="award-actions">
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(award.id)}
                          aria-label="Delete award"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="award-details">
                      <div className="detail-row">
                        <span className="detail-label">Year:</span>
                        <span className="detail-value">{award.year}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Awarding Organization:</span>
                        <span className="detail-value">{award.awarding_organization}</span>
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

export default FacultyAwards;
