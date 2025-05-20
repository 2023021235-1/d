import React from 'react';
import './styles/BCOM.css';

const BCOM = () => {
  return (
    <div className="bcom-wrapper">
      <h1 className="bcom-page-title">Bachelor Of Commerce (B.Com.)</h1>
      <div className="bcom-card">
        <section className="bcom-intro">
          <p>
            The Commerce department, established in 2019, is the newest department in the college. It has three faculty members
            renowned for their expertise in finance, marketing management, and banking. The department focuses on imparting
            practical knowledge in auditing, company law, and income tax.
          </p>
          <p>
            Commerce students engage with the fast-paced business world, and the department strives to create a stimulating environment
            for their growth. Subjects offered include business organization, financial accounting, corporate law, economic theory,
            and business communication.
          </p>
        </section>

        <section className="bcom-highlights">
          <h2>Course Highlights</h2>
          <ul>
            <li>Comprehensive curriculum covering finance, marketing, and accounting.</li>
            <li>Practical learning in auditing, company law, and income tax.</li>
            <li>Experienced faculty with industry expertise.</li>
            <li>Focus on business communication and economic theory.</li>
            <li>Personalized guidance with accessible teachers.</li>
          </ul>
        </section>

        <section className="bcom-cta">
          <button className="btn-primary">Apply Now</button>
          <button className="btn-secondary">Download Syllabus</button>
        </section>
      </div>
    </div>
  );
};

export default BCOM;
