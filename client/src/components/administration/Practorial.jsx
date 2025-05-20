import React from 'react';
import './styles/Practorial.css';

const members = [
  { name: 'Prof. Prabeen Sinha', designation: 'Convener' },
  { name: 'Dr. Ajay Kirti Tiwari', designation: 'Member' },
  { name: 'Dr. Vinod Kumar Gupta', designation: 'Member' },
  { name: 'Dr. Snehlata Tiwari', designation: 'Member' },
  { name: 'Dr. Sanjay Kumar Pandey', designation: 'Member' },
  { name: 'Dr. Rajesh Rai', designation: 'Member' },
  { name: 'Sri Bimlesh Kushwaha', designation: 'Member' },
  { name: 'Dr. Sanjay Kumar', designation: 'Member' },
  { name: 'Dr. Amrendra Kumar Pandey', designation: 'Member' },
  { name: 'Dr. Sugandha Pandey', designation: 'Member' },
  { name: 'Dr. Pankaj Tiwari', designation: 'Member' },
];

const PractorialBoard = () => {
  return (
    <div className="practorial-container">
      <h2 className="practorial-title">Practorial Board Members</h2>
      <div className="practorial-table-wrapper">
        <table className="practorial-table">
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

export default PractorialBoard;
