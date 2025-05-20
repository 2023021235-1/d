import React from 'react';
import './styles/GoverningBody.css';

const members = [
  { name: 'Shri Chaudhary Pramod Kumar', designation: 'President' },
  { name: 'Dr. Sharad Srivastava', designation: 'Senior Vice President' },
  { name: 'Shri Ajeet Kumar Jauhari', designation: 'Junior Vice President' },
  { name: 'Shri Ranveer Shanker', designation: 'Manager' },
  { name: 'Shri Prabhat Kumar Srivastava', designation: 'Joint Secretary' },
  { name: 'Shri Ashtabhuja Das', designation: 'Member' },
  { name: 'Shri Ganga Dayal Srivastava', designation: 'Member' },
  { name: 'Shri Rakesh Chandra Verma', designation: 'Member' },
  { name: 'Shri Veerendra Kumar Srivastava', designation: 'Member' },
  { name: 'Shri V. K. Singh', designation: 'Member' },
  { name: 'Shri Jagdamba Jaiswal', designation: 'Member' },
  { name: 'Shri Devendra Nath Srivastava', designation: 'Member' },
  { name: 'Two Teachers by Rotation', designation: 'Member' },
  { name: 'Two Non Teaching Staff by Rotation', designation: 'Member' },
  { name: 'Prof. Shail Pande', designation: 'Principal' },
];

const GoverningBody = () => {
  return (
    <>
      <div className="GoverningBody_headTitle">College Governing Body</div>
      <div className="GoverningBody_pageContent">
        <table className="GoverningBody_table">
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
    </>
  );
};

export default GoverningBody;
