import React from 'react';
import './styles/Course.css';

// Course images
import baCourseImg from '../images/ba-course.webp';
import baImg from '../images/ba.webp';
import bscImg from '../images/bsc.webp';
import bcomImg from '../images/bcom.webp';
import bcaImg from '../images/bca.webp';
import mscImg from '../images/msc.webp';
import backImg from '../images/back.webp';


const Course = () => {
  const courses = [
    {
      id: 1,
      title: "BACHELOR OF ARTS",
      image: baCourseImg,
      description: "The Bachelor of Arts faculty in the college has a total of 10 topics including Hindi, English, Sanskrit, History…",
      link: "/ba"
    },
    {
      id: 2,
      title: "MASTER OF ARTS",
      image: baImg,
      description: "Permanent recognition in political science and history (medieval and modern) under at the postgraduate level in college is approved by the government.",
      link: "/ma"
    },
    {
      id: 3,
      title: "BACHELOR OF SCIENCE",
      image: bscImg,
      description: "We have two subject groups for B.Sc. students: 1. Mathematics, Chemistry, Physics 2. Biology, Chemistry, Zoology, Botany",
      link: "/bsc"
    },
    {
      id: 4,
      title: "BACHELOR OF COMMERCE",
      image: bcomImg,
      description: "Commerce department was established in 2019 and is thus it is the newest department in the college.",
      link: "/bcom"
    },
    {
      id: 5,
      title: "BACHELOR OF COMPUTER APPLICATION",
      image: bcaImg,
      description: "Bachelor of Computer Application is started from session 2024-2025 with intake of 60.",
      link: "/bca"
    },
    {
      id: 6,
      title: "MASTER OF SCIENCE",
      image: mscImg,
      description: "We are running M.Sc. Botany from academic session 2024-2025.",
      link: "/msc"
    }
  ];

  const handleEnquiry = (courseTitle) => {
    alert(`Thank you for your interest in ${courseTitle}. Our team will contact you shortly.`);
  };

  return (
    <div className="co-courses-section-grid" style={{ backgroundImage: `url(${backImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
      <div className="co-sectionc-title">
        <h1>OUR COURSES</h1>
      </div>
      <div className="co-courses-grid-container">
        {courses.map((course) => (
          <div className="co-course-card-grid" key={course.id}>
            <div className="co-course-image-grid">
              <img src={course.image} alt={course.title} className="co-img-fluid-grid" />
            </div>
            <div className="co-course-content-grid">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="co-course-buttons-grid">
                <a href={course.link} className="co-btn-grid co-btn-primary-grid">View Details</a>
                <button
                  type="button"
                  className="co-btn-grid co-btn-outline-primary-grid"
                  onClick={() => handleEnquiry(course.title)}
                >
                  Send Enquiry
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;