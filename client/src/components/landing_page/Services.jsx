// src/components/Services.jsx
import React, { useState } from 'react';
import './styles/Services.css';

import regIcon         from '../images/reg.webp';
import calIcon         from '../images/cal.webp';
import feedIcon        from '../images/feed.webp';
import grievIcon       from '../images/griev.webp';
import creativeIcon    from '../images/creative.webp';
import syllIcon        from '../images/syll.webp';
import timetableIcon   from '../images/timetable.webp';
import codeIcon        from '../images/code.webp';
import pptIcon         from '../images/ppt.webp';
import broucherIcon    from '../images/broucher.webp';
import admissionIcon   from '../images/admission.webp';
import studentLoginIcon from '../images/student_login.png'; // Import student login icon
import teacherLoginIcon from '../images/teacher_login.png'; // Import teacher login icon
import adminLoginIcon   from '../images/admin_login.png'; 
const Services = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="svc-root">
      <div className="svc-container">
        <div className="svc-tablist" role="tablist">
          {['Students', 'Admission',"Login"].map((label, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={active === idx}
              className={`svc-tab ${active === idx ? 'svc-tab--on' : ''}`}
              onClick={() => setActive(idx)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="svc-content">
          <div className={`svc-panel ${active === 0 ? 'svc-panel--show' : ''}`}>
            <a href="/registration" target="_blank" rel="noopener noreferrer">
              <img src={regIcon} alt="Registration" /><span>Registration</span>
            </a>
            <a href="http://ddugu.ac.in/academic_calendar.aspx" target="_blank" rel="noopener noreferrer">
              <img src={calIcon} alt="Calendar" /><span>University Calendar</span>
            </a>
            <a href="/feedback" target="_blank" rel="noopener noreferrer">
              <img src={feedIcon} alt="Feedback" /><span>Feedback Form</span>
            </a>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSc47HWKe9dJx8C6XJsTDibN6zXNr9972P88WqVKuiaZryTAvw/viewform" target="_blank" rel="noopener noreferrer">
              <img src={grievIcon} alt="Grievance" /><span>Grievance Redressal</span>
            </a>
            <a href="/c_corner" target="_blank" rel="noopener noreferrer">
              <img src={creativeIcon} alt="Creative" /><span>Creative Corner</span>
            </a>
            <a href="/syllabus" target="_blank" rel="noopener noreferrer">
              <img src={syllIcon} alt="Syllabus" /><span>Syllabus</span>
            </a>
            <a href="/timetable" target="_blank" rel="noopener noreferrer">
              <img src={timetableIcon} alt="Timetable" /><span>Time Table</span>
            </a>
            <a href="./COURSE_CODE_BA.pdf" target="_blank" rel="noopener noreferrer">
              <img src={codeIcon} alt="Code" /><span>BA Course Code</span>
            </a>
            <a href="./ORIENTATION.pdf" target="_blank" rel="noopener noreferrer">
              <img src={pptIcon} alt="Orientation PPT" /><span>Orientation PPT</span>
            </a>
          </div>

          <div className={`svc-panel ${active === 1 ? 'svc-panel--show' : ''}`}>
            <a href="/admission-procedure" target="_blank" rel="noopener noreferrer">
              <img src={broucherIcon} alt="Brochure" /><span>Admission Procedure</span>
            </a>
            <a href="./Prospectus.pdf" target="_blank" rel="noopener noreferrer">
              <img src={admissionIcon} alt="Prospectus" /><span>Prospectus</span>
            </a>
          </div>
          <div className={`svc-panel ${active === 2 ? 'svc-panel--show svc-panel--few-items' : ''}`}>
  <a href="/student/login" target="_blank" rel="noopener noreferrer">
    <img src={studentLoginIcon} alt="Student Login" /><span>Student Login</span>
  </a>
  <a href="/teacher/login" target="_blank" rel="noopener noreferrer">
    <img src={teacherLoginIcon} alt="Teacher Login" /><span>Teacher Login</span>
  </a>
  <a href="/admin/login" target="_blank" rel="noopener noreferrer">
    <img src={adminLoginIcon} alt="Admin Login" /><span>Admin Login</span>
  </a>
</div>
        </div>
      </div>
    </div>
  );
}

export default Services;