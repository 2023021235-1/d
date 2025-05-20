import React, { useEffect, useState } from 'react';
import './styles/FacultyPublications.css';
import { Trash2 } from 'lucide-react';
const FacultyPublications = () => {
  const [publications, setPublications] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    publication: '',
    department: '',
    category: '',
    month: '',
    year: '',
    indexing: '',
    issn: '',
    impact: ''
  });
 const fetchPublications = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:8000/faculty/faculty_publications', {
          method: 'GET',
         headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        const data = await res.json();
        setPublications(data.publications);
      } catch (err) {
        console.error(err);
        setError('Failed to load publications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  // Fetch publications on mount
  useEffect(() => {
   
    fetchPublications();
  }, []);

  // Handle input change
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit new publication
  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/faculty/add_faculty_publication', {
        method: 'POST',
      
       headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPublications(prev => [
        ...prev,
        { id: data.id, ...formData }
      ]);
      setFormData({
        publication: '',
        department: '',
        category: '',
        month: '',
        year: '',
        indexing: '',
        issn: '',
        impact: ''
      });
      setShowUploadForm(false);
    } catch {
      alert('Error adding publication. Please try again.');
    }
  };

  // Delete publication
  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this publication?')) return;
    try {
      const res = await fetch(`http://localhost:8000/faculty/delete_faculty_publication/${id}`, {
        method: 'POST',
       headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res);
      if (res.ok) 
      {
        alert('Publication deleted successfully.');
        fetchPublications();
      }
      
    } catch {
      alert('Failed to delete publication. Please try again.');
    }
  };

  return (
    <div className="faculty-container">
      <div className="publications-content">
        <header className="publications-header">
          <h2>Faculty Publications</h2>
          <button
            className="add-button"
            onClick={() => setShowUploadForm(show => !show)}
            aria-label={showUploadForm ? 'Cancel add' : 'Add publication'}
          >
            {showUploadForm ? '×' : 'Add publication'}
          </button>
        </header>

        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <div className="loading-spinner">Loading publications...</div>
        ) : (
          <>
            {showUploadForm && (
              <div className="upload-form-container">
                <form className="publication-form" onSubmit={handleFormSubmit}>
                  <h3>Add New Publication</h3>
                  <input
                    type="text"
                    name="publication"
                    placeholder="Publication Title"
                    value={formData.publication}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleInputChange}
                  />
                  <div className="date-row">
                    <input
                      type="text"
                      name="month"
                      placeholder="Month (e.g. Jan)"
                      value={formData.month}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="year"
                      placeholder="Year (e.g. 2025)"
                      value={formData.year}
                      onChange={handleInputChange}
                    />
                  </div>
                  <input
                    type="text"
                    name="indexing"
                    placeholder="Indexing"
                    value={formData.indexing}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="issn"
                    placeholder="ISSN"
                    value={formData.issn}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="impact"
                    placeholder="Impact Factor"
                    value={formData.impact}
                    onChange={handleInputChange}
                  />
                  <button type="submit" className="form-button">
                    Add Publication
                  </button>
                </form>
              </div>
            )}

            <div className="publications-list">
              {publications.length === 0 ? (
                <div className="no-publications">
                  No publications found. Add your first publication!
                </div>
              ) : (
                publications.map(pub => (
                  <div key={pub.id} className="publication-card">
                    <div className="publication-header">
                      <h3 className="publication-title">{pub.publication}</h3>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(pub.id)}
                         aria-label="Delete experience"
  >
    <Trash2 size={18} /> 
                      </button>
                    </div>
                    <div className="publication-details">
                      <div className="detail-row">
                        <span className="detail-label">Department:</span>
                        <span className="detail-value">{pub.department}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Category:</span>
                        <span className="detail-value">{pub.category}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Date:</span>
                        <span className="detail-value">
                          {pub.month}/{pub.year}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Indexing:</span>
                        <span className="detail-value">{pub.indexing}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">ISSN:</span>
                        <span className="detail-value">{pub.issn || 'N/A'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Impact Factor:</span>
                        <span className="detail-value">{pub.impact || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FacultyPublications;
