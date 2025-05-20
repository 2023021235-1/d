import React from 'react';
import './styles/NonTeaching.css';

const NonTeaching = () => {
  const staffLists = {
    nonTeachingLeft: [
      ['Sri Chandramohan Srivastava', 'Office Superintendent'],
      ['Sri Raghvendra Kumar', 'Clerk'],
      ['Sri Gyan Prakash Rai', 'Stenographer'],
      ['Sri Ankit Kumar', 'Clerk'],
      ['Sri Nigmendra Pratap Pandey', 'Clerk'],
      ['Vaishnavi Sushil', 'Clerk']
    ],
    nonTeachingRight: [
      ['Sri Veer Vikram Shahi', 'Library Assistant'],
      ['Sri Ram Bhavan Kannaujia', 'Library Assistant'],
      ['Sri Sudhanshu Mishra', 'Lab Assistant'],
      ['Sri Chandrasen Sonkar', 'Lab Assistant'],
      ['Sri Master Rajiv Kumar Chaudhary', 'Lab Assistant']
    ],
    otherLeft: [
      'Sri Ramakant',
      'Sri Vinod Kumar Singh',
      'Sri Manoj Kumar',
      'Sri Rajendra Prasad',
      'Sri Rakesh Kumar Yadav',
      'Sri Manish Kumar Yadav',
      'Sri Amit Kumar Rai',
      'Sri Arun Kumar Srivastava'
    ],
    otherRight: [
      'Sri Premchand',
      'Sri Akhilesh Kumar',
      'Sri Ali Ahmad',
      'Sri Jai Pratap Yadav',
      'Sri Dinesh Kumar Yadav',
      'Sri Mevalal Gupta',
      'Sri Dharmdev',
      'Sri Yashvant Singh'
    ]
  };

  return (
    <div className="non-teaching-container">
      <h2 className="non-teaching-title">Non-Teaching Staff</h2>

      <section className="staff-section">
        <h3 className="section-heading">Administrative & Technical Staff</h3>
        <div className="staff-grid">
          {[...staffLists.nonTeachingLeft, ...staffLists.nonTeachingRight].map(
            ([name, role], index) => (
              <div className="staff-card" key={index}>
                <div className="staff-name">{name}</div>
                <div className="staff-role">{role}</div>
              </div>
            )
          )}
        </div>
      </section>

      <section className="staff-section">
        <h3 className="section-heading">Support Staff</h3>
        <div className="staff-grid">
          {[...staffLists.otherLeft, ...staffLists.otherRight].map((name, index) => (
            <div className="staff-card" key={index}>
              <div className="staff-name">{name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NonTeaching;
