import React from 'react';
import './styles/Sexual.css';

const members = [
  { name: "Dr. Amrita Tripathi", role: "Convener" },
  { name: "Dr. Snehlata Tiwari", role: "Member" },
  { name: "Dr. Preeti Sharma", role: "Member" },
  { name: "Dr. Sugandha Pandey", role: "Member" },
];

const CommitteeAgainstSexualHarassment = () => {
  return (
    <div className="sexual-committee-container">
      <h2 className="sexual-committee-heading">Committee Against Sexual Harassment</h2>
      <div className="sexual-committee-table-wrapper">
        <table className="sexual-committee-table">
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

export default CommitteeAgainstSexualHarassment;
