import React from 'react';
import './styles/Literary.css';

const literaryMembers = [
  { name: 'Prof. Praveen Sinha', role: 'Convener' },
  { name: 'Dr. Amrita Srivastava', role: 'Member' },
  { name: 'Dr. Sanjay Srivastava', role: 'Member' },
  { name: 'Dr. Sanjay Mishra', role: 'Member' }
];

const LiteraryClub = () => (
  <div className="literaryClub-container">
    <h2 className="literaryClub-heading">Literary Club</h2>
    <div className="literaryClub-table-wrapper">
      <table className="literaryClub-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          {literaryMembers.map((member, index) => (
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

export default LiteraryClub;
