import React from 'react';
import './styles/BSC.css';

const BSC = () => {
  return (
    <section className="bsc-wrapper">
      {/* Header Outside the Card */}
      <div className="bsc-header">
        <h1>Bachelor of Science (B.Sc.)</h1>
        <p>Explore Your Path in Science</p>
      </div>
      {/* Main Card */}
      <div className="bsc-card">
        <div className="bsc-content">
          <p>Candidates interested in first-year B.Sc. admissions can choose from the following subject groups:</p>

          <ul className="bsc-subject-groups">
            <li><strong>Mathematics:</strong> Chemistry, Physics, Mathematics</li>
            <li><strong>Biology:</strong> Chemistry, Zoology, Botany</li>
          </ul>

          <p>Based on university regulations and the college's available resources, enrollment will be allotted in B.Sc. Mathematics and B.Sc. Biology streams.</p>

          <hr className="bsc-divider" />

          <div className="bsc-details">
            <p><strong>Duration:</strong> 3 Years (6 Semesters)</p>
            <p><strong>Eligibility:</strong> 10+2 with relevant science subjects</p>
            <p><strong>Medium:</strong> English / Hindi (as applicable)</p>
          </div>

          <div className="bsc-admission">
            <h3>Admission Process</h3>
            <ol>
              <li>Online application submission via college portal</li>
              <li>Merit list based on qualifying exam</li>
              <li>Verification of documents</li>
              <li>Final allotment and fee payment</li>
            </ol>
          </div>

          <div className="bsc-cta">
            <button className="bsc-btn">Download Prospectus</button>
            <button className="bsc-btn outline">Apply Now</button>
          </div>

          <div className="bsc-contact">
            <p>Need help? Contact <a href="mailto:admissions@college.edu">admissions@college.edu</a> or call <a href="tel:+919876543210">+91 98765 43210</a></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BSC;
