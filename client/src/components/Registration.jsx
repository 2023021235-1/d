import { useState } from 'react';
import './Registration.css';

export default function AdmissionForm() {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    dob: '',
    gender: '',
    category: '',
    qualification: '',
    course: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 // Inside Registration.jsx

const handleSubmit = async (e) => { // Make it async
  e.preventDefault();
  console.log('Form submitted:', formData);

  try {
    const response = await fetch('http://localhost:8000/api/reg/register', { // Adjust URL if your backend runs elsewhere
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json(); // Get the JSON response from the backend

    if (response.ok) {
      alert(`Form submitted successfully! Server says: ${result.message}`);
      // Reset form
      setFormData({
        name: '',
        fatherName: '',
        motherName: '',
        dob: '',
        gender: '',
        category: '',
        qualification: '',
        course: '',
        mobile: '',
        email: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        // declaration: false, // if you have a state for it
      });
    } else {
      alert(`Error submitting form: ${result.message || 'Unknown error'}`);
      console.error('Submission error details:', result);
    }
  } catch (error) {
    console.error('Failed to submit form:', error);
    alert('Failed to submit form. Check the console for more details.');
  }
};

  return (
    <div className="admission-container">
      <div className="admission-card">
         <div className="offline-notice">
          <p>For offline admission form please visit DAV PG College, Buxipur Gorakhpur - Contact: 0551-3500218</p>
          
        </div>
        <div className="admission-header">
          <h2>Admission Registration</h2>
        </div>
         
        <div className="admission-form-container">
          <form className="form-fields" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="fatherName">Father's Name</label>
                <input
                  type="text"
                  id="fatherName"
                  name="fatherName"
                  placeholder="Enter your father's name"
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="motherName">Mother's Name</label>
                <input
                  type="text"
                  id="motherName"
                  name="motherName"
                  placeholder="Enter your mother's name"
                  value={formData.motherName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="general">General</option>
                  <option value="obc">OBC</option>
                  <option value="sc">SC</option>
                  <option value="st">ST</option>
                  <option value="ews">EWS</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="qualification">Qualification</label>
                <input
                  type="text"
                  id="qualification"
                  name="qualification"
                  placeholder="Your highest qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="course">Course</label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a course</option>
                  <option value="BA">BA</option>
                  <option value="BSc">BSc</option>
                  <option value="BCom">BCom</option>
                  <option value="BBA">BBA</option>
                  <option value="BCA">BCA</option>
                  <option value="MA">MA</option>
                  <option value="MSc">MSc</option>
                  <option value="MCom">MCom</option>
                  <option value="MBA">MBA</option>
                  <option value="MCA">MCA</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  placeholder="Enter your 10-digit mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter your complete address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="Enter your state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="pincode">PIN Code</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  placeholder="Enter your PIN code"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="declaration"
                name="declaration"
                required
              />
              <label htmlFor="declaration">
                I hereby declare that all the information provided by me is correct and true to the best of my knowledge.
              </label>
            </div>
            
            <div className="form-submit">
              <button type="submit">
                Submit Application
              </button>
            </div>
          </form>
        </div>
        
      
        
        <div className="disclaimer">
          <p>Disclaimer: All rights for admission are with the admission committee of the college.</p>
          <p>Applicant have to follow all the rules of DDUGU for admission in new academic session.</p>
        </div>
      </div>
    </div>
  );
}