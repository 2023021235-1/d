import React from 'react';
import './styles/Vision.css';

const Vision = () => {
  return (
    <div className="vision-mission-container">
      <div className="head-title">Vision And Mission</div>

      <div className="page-content">
        <div className="section">
          <h4 className="section-title">Vision</h4>
          <p className="italic-line">
            <i>Yad Bhadram Tanna Asuva</i>, the fundamental part of Arya Samaj Vedic prayer in the logo of the college,
            sets forth an education system that keeps one away from evil and enriches with good, noble, and auspicious qualities.
          </p>
          <p>
             DAV PG college envisions to become one of the leading learning centers of the nations that provides
            value based quality education for the empowerment of the society. To enliven this vision, we emphasize
            over the constant learning process, enrichment of sensitivity towards gender issues and environmental
            sustainability, inculcation of moral values and ethics among all its members so as to produce citizens
            which can work for nation prosperity and betterment of the society.
          </p>
        </div>
 <div className="section">
          <h4 className="section-title">Mission</h4>
          <ul className="mission-list">
            <li>To Impart value based, quality education in all fields of science, arts and commerce.</li>
            <li>
              To create a teaching-learning environment where education can be made available without any
              discrimination of caste, colour, gender and religion.
            </li>
            <li>To Promote awareness on environmental issues and sensitize students towards their social responsibility.</li>
            <li>To promote use of ICT and e-learning.</li>
            <li>To promote holistic development.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Vision;
