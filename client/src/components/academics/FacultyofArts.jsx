import React from "react";
import "./styles/FacultyofArts.css"; // Import the CSS file
import FacultyList from "./ViewFaculty"; // Import the FacultyList component

const FacultyOfArts = ({ send }) => {
  return (
    <>
      {/* 1. Top Title */}
      <div className="top">
        <h1>Faculty of Arts</h1>
      </div>

      {/* 2. Full-Width Carousel */}
      {/* Removed inline style, will handle margin in CSS */}
      <div className="carousall">
        <div className="carouselBox">
          <img
            src="http://www.mmmut.ac.in/images/CS-Banner-01.jpg"
            alt="banner1"
          />
        </div>
      </div>

      {/* 3. Two-Column Layout (About and News) */}
      {/* Renamed containerdepartment to content-columns-container for clarity */}
      <div className="content-columns-container">
        {/* Left Column: About Faculty */}
        {/* Reusing leftpart class, will adjust its flex properties in CSS */}
        <div className="leftpart">
          <div className="csed-section"> {/* Keep card styling */}
            <h3>About the Faculty</h3>
            <div className="vision">
              <p>
                The Faculty of Arts, centrally located on the campus, is one of
                the faculties of the DAVPG College Gorakhpur comprising 10
                departments: Hindi, English, Sanskrit, History, Political
                Science, Sociology, Economics, Education, Psychology, and
                Geography.
              </p>
            </div>
            <div className="mission" style={{ marginTop: "20px" }}>
              <h4 style={{ fontWeight: 600, marginBottom: "10px" }}>
                Programs Offered
              </h4>
              <p>The Faculty of Arts offers the following programs:</p>
              <ul>
                <li>Bachelor of Arts</li>
                <li>Master of Arts</li>
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
              {/* Marquee content remains here */}
              <marquee
                direction="up"
                scrollAmount="2"
                onMouseOver={(e) => e.currentTarget.stop()}
                onMouseOut={(e) => e.currentTarget.start()}
              >
                {send.map((item, i) =>
                  item.Type === "News" ? (
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
                  ) : null
                )}
              </marquee>
            </div>
            <div className="read-more-link">
              <a href="/viewallnews">Read More</a>
            {/* Note: If ViewFaculty also has a Read More/View All link, consider styling consistency */}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Full-Width Faculty List */}
      {/* Add a wrapper div for spacing */}
      <div className="faculty-list-section">
         {/* Render FacultyList directly here */}
        <FacultyList factultyType="Faculty of Arts" />
      </div>
    </>
  );
};

export default FacultyOfArts;