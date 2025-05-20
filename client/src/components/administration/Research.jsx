import React from 'react';
import './styles/Research.css';

const ResearchBoard = () => {
  const members = [
    { name: "Dr. Sanjay Pandey", designation: "Convener" },
    { name: "Dr. Vishwa Deepak Singh", designation: "Member" }
  ];

  return (
    <div className="researchBoard-container">
      <h2 className="researchBoard-heading">Research & Innovation</h2>
      <div className="researchBoard-table-wrapper">
        <table className="researchBoard-table">
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
                <td>{member.designation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResearchBoard;
