// AlumniReg.jsx
import React, { useState } from 'react';
import './styles/alumnireg.css';

const AlumniReg = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    father: '',
    mother: '',
    email: '',
    MoNo: '',
    dob: '',
    address: '',
    gender: 'Male',
    degree: 'B.A.',
    year: '',
    designation: '',
    workingplace: '',
    specialization: '',
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((v) => ({ ...v, [name]: value }));
  };

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photoFile) {
      setMessage('Please select a profile picture.');
      return;
    }

    setSubmitting(true);
    setMessage('');

    const data = new FormData();
    Object.entries(formValues).forEach(([k, v]) => data.append(k, v));
    data.append('photo', photoFile);

    try {
      const res = await fetch('http://localhost:8000/alumni/reg_sub', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: data,
      });

      if (res.ok) {
        setMessage('Data Submitted Successfully');
        setFormValues({
          name: '',
          father: '',
          mother: '',
          email: '',
          MoNo: '',
          dob: '',
          address: '',
          gender: 'Male',
          degree: 'B.A.',
          year: '',
          designation: '',
          workingplace: '',
          specialization: '',
        });
        setPhotoFile(null);
        e.target.reset();
      } else {
        const err = await res.text();
        setMessage('Submission failed: ' + err);
      }
    } catch (err) {
      setMessage('Error: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="alumni-page">
      <h2 className="alumni-title">Alumni Cell</h2>
      <p className="alumni-description">
         We invite and solicit the presence of all former students of our college
        who had got admission in the college and completed at least one
        year/semester in a degree program (UG/PG). Our college takes great pride
        in the achievements and accomplishments of our alumni. We wish to bring
        valuable pieces of advice, experiences and any other contribution from our
        alumni that are needed to help improve and serve our college and the
        society at large. Therefore, college has constituted an alumni cell to
        provide a platform for our alumni to increase their involvement with
        their alma mater and foster interaction between them. It is an effort to
        stay connected with one another and the college, and to share knowledge
        and skills. Through this forum we wish to remain updated with the latest
        achievements of our alumni and not be deprived of the joy of
        accomplishment. We are one big family and share and rejoice in the
        success of one another. This alumni cell will help in renewing the bonds
        and associations of old which are a treasure in these days of weakening
        family and social bonds. For us alumni are not our past or former
        students – they are our future who may make strong contributions to the
        welfare of their alma mater.
      </p>

      {!showForm && (
        <div className="text-center">
          <button className="btn primary-button small-center-btn" onClick={() => setShowForm(true)}>
            Get Registered
          </button>
        </div>
      )}

      {showForm && (
        <>
          <div className="close-btn-container">
            <button className="close-btn" onClick={() => setShowForm(false)}>×</button>
          </div>

          {message && (
            <div className={`alert ${submitting ? 'alert-info' : 'alert-success'}`}>{message}</div>
          )}

          <div className="form-card">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="father">Father Name</label>
                  <input
                    type="text"
                    id="father"
                    name="father"
                    value={formValues.father}
                    onChange={handleChange}
                    placeholder="Enter your father's name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mother">Mother Name</label>
                  <input
                    type="text"
                    id="mother"
                    name="mother"
                    value={formValues.mother}
                    onChange={handleChange}
                    placeholder="Enter your mother's name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="MoNo">Mobile No (WhatsApp)</label>
                  <input
                    type="text"
                    id="MoNo"
                    name="MoNo"
                    value={formValues.MoNo}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formValues.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formValues.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="photo">Profile Picture</label>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select id="gender" name="gender" value={formValues.gender} onChange={handleChange}>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="form-group full-width degree-highlight-label">
                  <label>Highest Degree Obtained from D.A.V.P.G. College Gorakhpur:</label>
                </div>
                <div className="form-group">
                  <label htmlFor="degree">Name of Degree</label>
                  <select id="degree" name="degree" value={formValues.degree} onChange={handleChange}>
                    <option>B.Tech.</option>
                    <option>M.Tech</option>
                    <option>B.C.A.</option>
                    <option>B.A.</option>
                    <option>B.Sc.</option>
                    <option>B.Com.</option>
                    <option>M.A.(History)</option>
                    <option>M.A.(Political Science)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="year">Year of Obtaining Degree</label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    value={formValues.year}
                    onChange={handleChange}
                    placeholder="Enter year of passing"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="designation">Present Status/Designation</label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={formValues.designation}
                    onChange={handleChange}
                    placeholder="Enter your designation"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="workingplace">Address of Working Place</label>
                  <input
                    type="text"
                    id="workingplace"
                    name="workingplace"
                    value={formValues.workingplace}
                    onChange={handleChange}
                    placeholder="Enter working place address"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="specialization">Any Specialization</label>
                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    value={formValues.specialization}
                    onChange={handleChange}
                    placeholder="Enter any specialization"
                  />
                </div>
              </div>

              <div className="button-container">
                <button className="btn primary-button" type="submit" disabled={submitting}>
                  {submitting ? 'Submitting…' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default AlumniReg;