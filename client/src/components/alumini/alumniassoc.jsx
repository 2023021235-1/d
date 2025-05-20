import React from 'react';
import './styles/alumniassoc.css'; // Make sure the path is correct

const AlumniAssoc = () => {
  return (
    <>
      <div className="alumniAssoc_headTitle">Alumni Association Members</div>
      <div className="alumniAssoc_pageContent">
        <table className="alumniAssoc_table">
          <thead>
            <tr>
              <th className="alumniAssoc_th_rightAlign">Name</th>
              <th className="alumniAssoc_th_rightAlign">Designation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="alumniAssoc_td_rightAlign">Prof. Shail Pande</td>
              <td className="alumniAssoc_td_rightAlign">Convener</td>
            </tr>
            <tr>
              <td className="alumniAssoc_td_rightAlign">Shri Jaspal Singh</td>
              <td className="alumniAssoc_td_rightAlign">President</td>
            </tr>
            <tr>
              <td className="alumniAssoc_td_rightAlign">Mrs. Reeta Srivastava</td>
              <td className="alumniAssoc_td_rightAlign">Vice President</td>
            </tr>
            <tr>
              <td className="alumniAssoc_td_rightAlign">Dr. Sanjay Pandey</td>
              <td className="alumniAssoc_td_rightAlign">Secretary</td>
            </tr>
            <tr>
              <td className="alumniAssoc_td_rightAlign">Shri Amit Singhaniya</td>
              <td className="alumniAssoc_td_rightAlign">Treasurer</td>
            </tr>
            <tr>
              <td className="alumniAssoc_td_rightAlign">Dr. Poonam Srivastava</td>
              <td className="alumniAssoc_td_rightAlign">Member</td>
            </tr>
            <tr>
              <td className="alumniAssoc_td_rightAlign">Dr. Sanjay Singh</td>
              <td className="alumniAssoc_td_rightAlign">Member</td>
            </tr>
            <tr>
              <td className="alumniAssoc_td_rightAlign">Dr. Alpana Tripathi</td>
              <td className="alumniAssoc_td_rightAlign">Member</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AlumniAssoc;