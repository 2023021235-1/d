import React from 'react';
import "./styles/FacultyofScience.css"; // Make sure this imports the correct CSS
import FacultyList from './ViewFaculty';

const FacultyOfScience = ({ send }) => {
  return (
    <>
      {/* 1. Top Title */}
      <div className="top">
        <h1>Faculty of Science</h1> {/* Updated Title */}
      </div>

      {/* 2. Full-Width Carousel */}
      {/* Removed inline style, will handle margin in CSS */}
      <div className="carousall">
        <div className="carouselBox">
          {/* Keep your image sources */}
          <img src="http://www.mmmut.ac.in/images/CS-Banner-01.jpg" alt="banner1" />
        </div>
      </div>

      {/* 3. Two-Column Layout (About and News) */}
      {/* Added new container for the 2-column section */}
      <div className="content-columns-container">
        {/* Left Column: About Faculty */}
        {/* Reusing leftpart class */}
        <div className="leftpart">
          <div className="csed-section"> {/* Keep card styling */}
            <h3>About the Faculty</h3>
            <div className="vision">
              <p>
                {/* Updated Description */}
                The Faculty of Science, centrally located on the campus, is one of the faculties of the DAVPG College Gorakhpur comprising departments like Physics, Chemistry, Zoology, Botany, and Mathematics.
              </p>
            </div>
            <div className="mission" style={{ marginTop: "20px" }}>
              <h4 style={{ fontWeight: 600, marginBottom: "10px" }}>
                Programs Offered
              </h4>
              <p>The Faculty of Science offers the following programs:</p>
              <ul>
                {/* Updated Programs */}
                <li>Bachelor of Science</li>
                <li>Master of Science</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Department News */}
        {/* Reusing rightpart class */}
        <div className="rightpart">
          <div className="departmentNews"> {/* Keep card styling */}
            <h3>Department News</h3>
            <div
              className="items-body"
              style={{
                marginTop: "15px",
                maxHeight: "300px",
                overflow: "hidden",
              }}
            >
              {/* Marquee content remains */}
              <marquee
                direction="up"
                scrollAmount="2"
                onMouseOver={(e) => e.currentTarget.stop()}
                onMouseOut={(e) => e.currentTarget.start()}
              >
                {send.map((item, i) =>
                  item.Type === "News" ? (
                    <div className='nwc'>
                    <a
                      href={item.Link ? `/docs/${item.Link}` : "#"}
                      target="_blank"
                      rel="noreferrer"
                      key={i}
                    >
                      <span>
                        <img src="/assets/img/new.gif" alt="new" width="24" />
                        {item.Title}
                      </span>
                    </a>
                    </div>
                  ) : null
                )}
              </marquee>
            </div>
            <div className="read-more-link">
              <a href="/viewallnews">Read More</a>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Full-Width Faculty List */}
      {/* Add a wrapper div for spacing */}
      <div className="faculty-list-section">
         {/* Render FacultyList, updated factultyType prop */}
        <FacultyList factultyType="Faculty of Science" />
      </div>
    </>
  );
};

export default FacultyOfScience;