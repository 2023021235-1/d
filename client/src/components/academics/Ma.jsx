import React from 'react';
import './styles/Ma.css';

const MAProgram = () => {
  return (
    <section className="ma-wrapper">
      {/* Header Outside the Card */}
      <div className="ma-header">
        <h1>Master of Arts (M.A.)</h1>
        <p>Advance Your Academic Journey in Humanities</p>
      </div>

      {/* Main Card */}
      <div className="ma-card">
        <div className="ma-content">
          <p>
            The college is permanently recognized to offer postgraduate programs in Political Science and History (Medieval and Modern) under a self-financed curriculum, approved by the government.
          </p>

          <p>The available seats for first-year M.A. programs are as follows:</p>
          <ul className="ma-subject-groups">
            <li><strong>M.A. Political Science:</strong> 60 Seats</li>
            <li><strong>M.A. History:</strong> 60 Seats</li>
          </ul>

          <hr className="ma-divider" />

          <div className="ma-details">
            <p><strong>Duration:</strong> 2 Years (4 Semesters)</p>
            <p><strong>Eligibility:</strong> Graduation with relevant subjects</p>
            <p><strong>Medium:</strong> English / Hindi</p>
          </div>

          <div className="ma-admission">
            <h3>Admission Process</h3>
            <ol>
              <li>Online application via college portal</li>
              <li>Merit-based shortlisting</li>
              <li>Document verification</li>
              <li>Final admission confirmation</li>
            </ol>
          </div>

          <div className="ma-cta">
            <button className="ma-btn">Download Prospectus</button>
            <button className="ma-btn outline">Apply Now</button>
          </div>

          <div className="ma-contact">
            <p>For queries, contact <a href="mailto:admissions@college.edu">admissions@college.edu</a> or call <a href="tel:+919876543210">+91 98765 43210</a></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MAProgram;
