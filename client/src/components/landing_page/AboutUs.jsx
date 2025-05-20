// src/components/AboutUs.jsx
import React from 'react';
import './styles/AboutUs.css';
import Services from './Services'; // Import the Services component

const AboutUs = () => {
  const aboutUsText = `D.A.V. Degree College, established in 1970 and efficiently operated by the Aryan Educational Trust, is dedicated to spreading education in Purvanchal. Initially, the college received accreditation for graduate arts faculty classes. Within a year, it expanded to include Mathematics and Biology programs. In 2006, under the government's self-funded scheme, the college introduced M.A. programs in Political Science and History (Medieval and Modern).`;

  return (
    <section className="auAboutSection_9f7x">
      <div className="auFlexContainer_9f7x">
        {/* Left Column: About Us Heading and Text */}
        <div className="auLeftColumn_9f7x">
          <div className='about'>
          <h2 className="auHeadingLeft_9f7x">About Us</h2></div>
          <div className="auAboutContainer_9f7x">
            <p className="auBody_9f7x">{aboutUsText}</p>
          </div>
        </div>

        {/* Right Column: Services Section */}
        <div className="auRightColumn_9f7x">
          <Services />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
