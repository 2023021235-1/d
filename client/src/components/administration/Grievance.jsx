import React from 'react';
import './styles/Grievance.css';

const grievanceMembers = [
  { name: 'Prof. Prabeen Sinha', designation: 'Convener' },
  { name: 'Dr. Nirupma Tiwari', designation: 'Member' },
  { name: 'Dr. Poonam', designation: 'Member' },
  { name: 'Dr. Sanjay Mishra', designation: 'Member' }
];

const GrievanceBoard = () => {
  return (
    <div className="grievanceBoard-wrapper">
      <h2 className="grievanceBoard-title">Grievance Redressal Cell</h2>
      <div className="grievanceBoard-tableContainer">
        <table className="grievanceBoard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
            </tr>
          </thead>
          <tbody>
            {grievanceMembers.map((member, index) => (
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

export default GrievanceBoard;
