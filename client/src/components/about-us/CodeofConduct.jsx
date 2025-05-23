import React from 'react';
import './styles/CodeofConduct.css';

const CodeofConduct = () => {
  return (
    <div className="conduct-container">
      <div className="head-title">Code Of Conduct</div>

      <div className="page-content">
        <p>
         The college has a prescribed code of conduct for students, teachers, administrators and other non-teaching
staff in order to provide all stakeholders of the college a broader view of institutional policies,
regulations and smooth conduct of academic and extra-curricular activities, along with the fulfilment of
social responsibilities at their level. 
        </p>

        <div className="section">
          <h4 className="section-title">Students</h4>
          <ul className="custom-list">
            <li>Students must abide by the dress code of the college, are expected to adhere to the timetable for
          attending lectures and follow strict moral conduct.</li>
             <li>
          Ragging is forbidden and is an act of punishment. Any occurrence should be immediately reported to the
          Proctorial committee.
        </li>
        <li>No act of sexual harassment or misconduct will be tolerated.</li>
        <li>
          Smoking, chewing and spitting tobacco products, consumption of alcohol or psychotropic substances is
          strictly prohibited inside the college premises.
        </li>
        <li>
          All college students should participate in academic seminars and community engagement activities and follow
          green practices to make campus environment-friendly.
        </li>
        <li>
          Students are responsible for their personal belongings including laptops, mobile phones, books, helmets,
          etc.
        </li>
        <li>
          Students should refrain from activities that can damage college property or cause harm to others.
          Activities such as these will invite disciplinary action.
        </li>
        <li>
          Students are expected to read notices/circulars displayed on the notice board and visit college website
          frequently for information.
        </li>
          </ul>
        </div>


 <div className="section">
          <h4 className="section-title">Teachers</h4>
          <ul className="custom-list">
            <li>All faculty members should adhere to a sincere conduct and deliver their assigned duties in accordance with
          the values and ethics of this profession and institutional policies.
        </li>
            <li> Teachers should cooperate and assist in carrying out functions relating to the educational responsibilities
          of the college and the university such as: assisting in admission process, participate in extension
          activities, advising and counselling students as well as assisting in the conduct of university and college
          examinations, including supervision, invigilation and evaluation.</li>
            <li> All teachers should deal justly with students regardless of their religion, caste, political, economic,
          social and physical demeanour.</li>
            <li> Teachers should refrain from taking part in or subscribing to or assisting in any activity that tends to
          promote hatred or enmity among different communities or linguistic groups but actively work for national
          integration.</li>
          </ul>
        </div>

        <div className="section">
          <h4 className="section-title">Administrators/Non-Teaching staff</h4>
          <ul className="custom-list">
            <li> All the staff members are expected to display the highest standard of professional ethics and behaviour.
          Punctuality and diligence at work should be maintained.</li>
            <li> They must discharge their duties without any unlawful conduct or discrimination against other staff
          members, teachers or students particularly on the grounds of caste, creed or religion.</li>
            <li>College strictly follows a zero tolerance policy against sexual harassment of any kind.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CodeofConduct;
