import React, { useState } from "react";
import "./styles/AddFaculty.css"; // Import the CSS file

const BASE_URL = "http://localhost:8000";
const token = localStorage.getItem("token");

const departmentOptions = [
  "Department of Computer Science",
  "Department of Commerce",
  "Department of Science",
  "Department of Arts"
];

const AddFaculty = () => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    dept: "",
    psw: "",
    email: "",
    userType: "faculty"
  });
  const [submitMessage, setSubmitMessage] = useState({ text: "", type: "" });
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState(departmentOptions);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
    
    if (name === "dept") {
      const filtered = departmentOptions.filter(option =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDepartments(filtered);
      setShowDeptDropdown(true);
    }
  };

  const handleDeptSelect = (dept) => {
    setFormData(fd => ({ ...fd, dept }));
    setShowDeptDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDeptDropdown(!showDeptDropdown);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage({ text: "Submitting...", type: "info" });

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([k, v]) => payload.append(k, v));
      console.log(payload);
      const res = await fetch(`${BASE_URL}/faculty/addfaculty`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: payload
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitMessage({ text: data.message, type: "success" });
        setFormData({
          name: "",
          designation: "",
          dept: "",
          psw: "",
          email: "",
          userType: "faculty"
        });
      } else {
        setSubmitMessage({ text: data.error || "Failed to add faculty", type: "error" });
      }
    } catch (err) {
      console.error(err);
      setSubmitMessage({ text: "An error occurred. Please try again.", type: "error" });
    }
  };

  return (
    <div className="add-faculty-page">
      <h3 className="page-title">Add New Faculty</h3>

      {submitMessage.text && (
        <div className={`message-box ${submitMessage.type}`}>
          {submitMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="faculty-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="designation">Designation</label>
            <input
              type="text"
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dept">Department</label>
            <div className="dropdown-container">
              <div className="input-with-icon">
                <input
                  type="text"
                  id="dept"
                  name="dept"
                  value={formData.dept}
                  onChange={handleChange}
                  onFocus={() => setShowDeptDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDeptDropdown(false), 200)}
                  required
                />
                <span className="dropdown-icon" onClick={toggleDropdown}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="#666"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              {showDeptDropdown && (
                <div className="dropdown-list">
                  {filteredDepartments.map((dept) => (
                    <div
                      key={dept}
                      className="dropdown-item"
                      onClick={() => handleDeptSelect(dept)}
                    >
                      {dept}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="psw">Password</label>
            <input
              type="password"
              id="psw"
              name="psw"
              value={formData.psw}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="userType">User Type</label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
            >
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">Add Faculty</button>
          <button
            type="button"
            className="reset-button"
            onClick={() => {
              setFormData({
                name: "",
                designation: "",
                dept: "",
                psw: "",
                email: "",
                userType: "faculty"
              });
              setSubmitMessage({ text: "", type: "" });
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFaculty;