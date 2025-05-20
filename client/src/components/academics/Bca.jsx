import React from "react";
import "./styles/BCA.css"; // Ensure this path is correct

const BCA = () => {
  return (
    <section className="bca-wrapper">
      <div className="bca-header">
        <h1>Bachelor of Computer Application (BCA)</h1>
      </div>
      <div className="bca-content">
        <div className="bca-card">
          <p>
          The Bachelor of Computer Application program has been introduced
          starting from the academic session 2024-2025. This program is designed
          to equip students with the necessary skills and knowledge in the field
          of computer applications.
        </p>
          <div className="bca-details">
            <h2 id="program-details">Program Details</h2>
            <ul>
              <li>
                <strong>Intake:</strong> 60 Seats
              </li>
              <li>
                <strong>Annual Fee:</strong> Rs. 40,000
              </li>
              {/* Add more details as needed */}
            </ul>
          </div>

          <div className="bca-highlights">
            <h3 id="key-highlights">Key Highlights</h3>
            <ul>
              <li>Industry-relevant curriculum</li>
              <li>Experienced faculty members</li>
              <li>State-of-the-art computer labs</li>
              <li>Focus on practical learning and projects</li>
              <li>Career guidance and placement support</li>
            </ul>
          </div>

          <p className="bca-footer-note">
            Admissions are based on merit and subject to university guidelines
            and seat availability. We are committed to providing a comprehensive
            and high-quality education in computer applications.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BCA;
