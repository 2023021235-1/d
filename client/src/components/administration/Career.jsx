import React from 'react';
import './styles/Career.css';

const members = [
  { name: 'Shri Abhishek Kumar Gupta', role: 'Convener' },
  { name: 'Dr. Pramod Kumar Tripathi', role: 'Member' }
];

const Career = () => {
  return (
    <div className="career-section-container">
      <h2 className="career-section-heading">Career Counselling And Placement</h2>
      <div className="career-section-table-wrapper">
        <table className="career-section-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index}>
                <td>{member.name}</td>
                <td>{member.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Career;
