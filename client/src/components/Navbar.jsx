import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Info, Layers, GraduationCap, Users, Calendar, BookOpen, Phone, ChevronDown } from 'lucide-react';
import './styles/Navbar.css';
import logo2 from './images/logo2.webp';
import logo3 from './images/logo3.webp';
import logo4 from './images/logo4.webp';
import gifIcon from './images/33.gif';

const Navbar = ({ user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [marqueeData, setMarqueeData] = useState([]); // State to store fetched marquee data
  const navbarRef = useRef(null);
  const location = useLocation();

  // Function to close all menus
  const closeAll = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setActiveSubmenu(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
    if (isMobileMenuOpen) closeAll();
  };

  // Enhanced handleNavClick to ensure all menus close
  const handleNavClick = () => {
    closeAll();
  };

  const handleDropdownClick = (dropdown, e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setActiveDropdown(prev => (prev === dropdown ? null : dropdown));
    setActiveSubmenu(null);
  };

  const handleSubmenuClick = (submenu, e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setActiveSubmenu(prev => (prev === submenu ? null : submenu));
  };

  // Handle clicks outside the navbar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        closeAll();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    closeAll();
  }, [location.pathname]);

  // Fetch marquee data periodically
  useEffect(() => {
    const fetchMarqueeData = async () => {
      try {
        const response = await fetch('http://localhost:8000/news');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Filter for items where 'Type' is 'Marquee'
        const filteredMarqueeData = data.header_marquee_data.filter(item => item.Type === 'Marquee');
        setMarqueeData(filteredMarqueeData);
      } catch (error) {
        console.error("Failed to fetch marquee data:", error);
      }
    };

    // Fetch immediately on mount
    fetchMarqueeData();

    // Set up interval to fetch data every 5 seconds (5000 milliseconds)
    const intervalId = setInterval(fetchMarqueeData, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

return (
  <div className="navbar-container indian-bg" ref={navbarRef}>
    <div className="ticker">
      <marquee
        className="news-content"
        onMouseOver={e => e.currentTarget.stop()}
        onMouseOut={e => e.currentTarget.start()}
      >
        {marqueeData.length > 0 ? (
          marqueeData.map((item) => (
            <Link
              key={item.Id}
              to={item.Link.startsWith('http') ? item.Link : `/${item.Link}`}
              target={item.Link.startsWith('http') || item.Link.endsWith('.pdf') || item.Link.includes('.png') ? "_blank" : "_self"}
              rel={item.Link.startsWith('http') || item.Link.endsWith('.pdf') || item.Link.includes('.png') ? "noopener noreferrer" : ""}
              onClick={handleNavClick}
            >
              <img src={gifIcon} alt="New" /> {item.Title}
            </Link>
          ))
        ) : (
          // Fallback content if no marquee data is fetched or filtered
          <>
            <Link to="/important-notice" target="_blank" onClick={handleNavClick}>
              <img src={gifIcon} alt="New" /> Important Notice Regarding Admissions
            </Link>
            <Link to="/exam-schedule" target="_blank" onClick={handleNavClick}>
              <img src={gifIcon} alt="New" /> Examination Schedule Released
            </Link>
          </>
        )}
      </marquee>
    </div>

    <nav className="navbar indian-nav">
      <div className="navbar-logo">
        <img src={logo2} alt="College Logo" className="college-logo" />
      </div>

      {!user && !isMobileMenuOpen && (
        <button
          className="navbar-toggler"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
          style={{ color: isMobileMenuOpen ? '#000' : '#000' }}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      )}

      <div className="navbar-affiliations desktop-affiliations">
        <img src={logo3} alt="Affiliation 1" className="affiliation-logo" />
        <img src={logo4} alt="Affiliation 2" className="affiliation-logo" />
      </div>
    </nav>
    {!user && isMobileMenuOpen && (
      <button
        className="navbar-toggler"
        onClick={toggleMobileMenu}
        aria-expanded={isMobileMenuOpen}
        aria-label="Toggle navigation"
        style={{ color: isMobileMenuOpen ? '#000' : '#000' }}
      >
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    )}
    {!user && (
      <div className={`navbar-links-row ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={handleNavClick}>
              <Home size={22} className="nav-icon" /> <span>Home</span>
            </Link>
          </li>

          {/* About Dropdown */}
          <li
            className={`nav-item dropdown ${activeDropdown === 'about' ? 'open' : ''}`}
            onClick={(e) => handleDropdownClick('about', e)}
          >
            <span className="nav-link dropdown-toggle">
              <Info size={22} className="nav-icon" /> <span>About</span> <ChevronDown size={20} className="dropdown-icon" />
            </span>
            <div className={`dropdown-menu ${activeDropdown === 'about' ? 'open' : ''}`}>
              <Link to="/history" className="dropdown-item" onClick={handleNavClick}>History</Link>
              <Link to="/vision" className="dropdown-item" onClick={handleNavClick}>Vision & Mission</Link>
              <Link to="/code-of-conduct" className="dropdown-item" onClick={handleNavClick}>Code of Conduct</Link>
            </div>
          </li>

          {/* Administration Dropdown */}
          <li
            className={`nav-item dropdown ${activeDropdown === 'administration' ? 'open' : ''}`}
            onClick={(e) => handleDropdownClick('administration', e)}
          >
            <span className="nav-link dropdown-toggle">
              <Layers size={22} className="nav-icon" /> <span>Administration</span> <ChevronDown size={20} className="dropdown-icon" />
            </span>
            <div className={`dropdown-menu ${activeDropdown === 'administration' ? 'open' : ''}`}>
              <Link to="/governing-body" className="dropdown-item" onClick={handleNavClick}>Governing Body</Link>
              <Link to="/managers-message" className="dropdown-item" onClick={handleNavClick}>Manager's Message</Link>
              <Link to="/principals-message" className="dropdown-item" onClick={handleNavClick}>Principal's Message</Link>
              <Link to="/public-relation-officer" className="dropdown-item" onClick={handleNavClick}>Public Relation Officer</Link>
              <Link to="/non-teaching-staff" className="dropdown-item" onClick={handleNavClick}>Non Teaching Staff</Link>
              <a href="http://ddugu.ac.in/OrdinanceRules.aspx" className="dropdown-item" target="_blank" rel="noopener noreferrer" onClick={handleNavClick}>DDU Act & Statute</a>
              <a href="https://uphed.gov.in/HigherEduDirectorate/DefaultDir.aspx" className="dropdown-item" target="_blank" rel="noopener noreferrer" onClick={handleNavClick}>Directorate, UP Higher Education</a>
              {/* Committees Submenu */}
              <div
                className={`dropdown submenu ${activeSubmenu === 'committees' ? 'open' : ''}`}
                onClick={(e) => handleSubmenuClick('committees', e)}
              >
                <span className="dropdown-item dropdown-toggle submenu-item">
                  <span>Committees</span>
                </span>
                <div className={`dropdown-menu submenu-content ${activeSubmenu === 'committees' ? 'open' : ''}`}>
                  <Link to="/proctorial-board" className="dropdown-item" onClick={handleNavClick}>Proctorial Board</Link>
                  <Link to="/grievance-cell" className="dropdown-item" onClick={handleNavClick}>Grievance Cell</Link>
                  <Link to="/research-innovation" className="dropdown-item" onClick={handleNavClick}>Research & Innovation</Link>
                  <Link to="/literary-club" className="dropdown-item" onClick={handleNavClick}>Literary Club</Link>
                  <Link to="/career-counselling" className="dropdown-item" onClick={handleNavClick}>Career Counselling & Placement</Link>
                  <Link to="/sexual-harassment-committee" className="dropdown-item" onClick={handleNavClick}>Committee Against Sexual Harassment</Link>
                  <Link to="/iqac-committee" className="dropdown-item" onClick={handleNavClick}>IQAC</Link>
                </div>
              </div>
            </div>
          </li>

          {/* Academics Dropdown */}
          <li
            className={`nav-item dropdown ${activeDropdown === 'academics' ? 'open' : ''}`}
            onClick={(e) => handleDropdownClick('academics', e)}
          >
            <span className="nav-link dropdown-toggle">
              <GraduationCap size={22} className="nav-icon" /> <span>Academics</span> <ChevronDown size={20} className="dropdown-icon" />
            </span>
            <div className={`dropdown-menu ${activeDropdown === 'academics' ? 'open' : ''}`}>
              {/* Programmes Offered Submenu */}
              <div
                className={`dropdown submenu ${activeSubmenu === 'programmes' ? 'open' : ''}`}
                onClick={(e) => handleSubmenuClick('programmes', e)}
              >
                <span className="dropdown-item dropdown-toggle submenu-item">
                  <span>Programmes Offered</span> 
                </span>
                <div className={`dropdown-menu submenu-content ${activeSubmenu === 'programmes' ? 'open' : ''}`}>
                  <Link to="/ba" className="dropdown-item" onClick={handleNavClick}>Bachelor of Arts</Link>
                  <Link to="/bsc" className="dropdown-item" onClick={handleNavClick}>Bachelor of Science</Link>
                  <Link to="/ma" className="dropdown-item" onClick={handleNavClick}>Master of Arts</Link>
                  <Link to="/bcom" className="dropdown-item" onClick={handleNavClick}>Bachelor of Commerce</Link>
                  <Link to="/bca" className="dropdown-item" onClick={handleNavClick}>Bachelor of Computer Application</Link>
                </div>
              </div>
              {/* Faculty Submenu */}
              <div
                className={`dropdown submenu ${activeSubmenu === 'faculty' ? 'open' : ''}`}
                onClick={(e) => handleSubmenuClick('faculty', e)}
              >
                <span className="dropdown-item dropdown-toggle submenu-item">
                  <span>Faculty</span>
                </span>
                <div className={`dropdown-menu submenu-content ${activeSubmenu === 'faculty' ? 'open' : ''}`}>
                  <Link to="/faculty/arts" className="dropdown-item" onClick={handleNavClick}>Faculty of Arts</Link>
                  <Link to="/faculty/science" className="dropdown-item" onClick={handleNavClick}>Faculty of Science</Link>
                </div>
              </div>
              <Link to="/library" className="dropdown-item" onClick={handleNavClick}>
                Library
              </Link>
            </div>
          </li>

          {/* Admissions Dropdown */}
          <li
            className={`nav-item dropdown ${activeDropdown === 'admissions' ? 'open' : ''}`}
            onClick={(e) => handleDropdownClick('admissions', e)}
          >
            <span className="nav-link dropdown-toggle">
              <Users size={22} className="nav-icon" /> <span>Admissions</span> <ChevronDown size={20} className="dropdown-icon" />
            </span>
            <div className={`dropdown-menu ${activeDropdown === 'admissions' ? 'open' : ''}`}>
              <Link to="/admission-procedure" className="dropdown-item" onClick={handleNavClick}>Admission Procedure</Link>
              <a href="./prospectus.pdf" className="dropdown-item" target="_blank" rel="noopener noreferrer" onClick={handleNavClick}>
                Prospectus
              </a>
            </div>
          </li>

          {/* Alumni Dropdown */}
          <li
            className={`nav-item dropdown ${activeDropdown === 'alumni' ? 'open' : ''}`}
            onClick={(e) => handleDropdownClick('alumni', e)}
          >
            <span className="nav-link dropdown-toggle">
              <GraduationCap size={22} className="nav-icon" /> <span>Alumni</span> <ChevronDown size={20} className="dropdown-icon" />
            </span>
            <div className={`dropdown-menu ${activeDropdown === 'alumni' ? 'open' : ''}`}>
              <Link to="/alumni-registration" className="dropdown-item" onClick={handleNavClick}>Registration</Link>
              <Link to="/alumni-association" className="dropdown-item" onClick={handleNavClick}>Alumni Association Members</Link>
              <a href="/AlumniRules.pdf" className="dropdown-item" target="_blank" rel="noopener noreferrer" onClick={handleNavClick}>
                Alumni Association Rules & Regulations
              </a>
              <Link to="/alumni-gallery" className="dropdown-item" onClick={handleNavClick}>Event Gallery</Link>
            </div>
          </li>

          {/* Events Dropdown */}
          <li
            className={`nav-item dropdown ${activeDropdown === 'events' ? 'open' : ''}`}
            onClick={(e) => handleDropdownClick('events', e)}
          >
            <span className="nav-link dropdown-toggle">
              <Calendar size={22} className="nav-icon" /> <span>Events</span> <ChevronDown size={20} className="dropdown-icon" />
            </span>
            <div className={`dropdown-menu ${activeDropdown === 'events' ? 'open' : ''}`}>
              <Link to="/events/cultural" className="dropdown-item" onClick={handleNavClick}>Cultural</Link>
              <Link to="/events/sports" className="dropdown-item" onClick={handleNavClick}>Sports</Link>
              <Link to="/events/nss" className="dropdown-item" onClick={handleNavClick}>NSS</Link>
              <Link to="/events/ncc" className="dropdown-item" onClick={handleNavClick}>NCC</Link>
              <Link to="/events/rovers-rangers" className="dropdown-item" onClick={handleNavClick}>Rovers & Rangers</Link>
              <Link to="/events/quiz-seminar" className="dropdown-item" onClick={handleNavClick}>Quiz & Seminar</Link>
              <Link to="/events/workshops" className="dropdown-item" onClick={handleNavClick}>Workshops</Link>
            </div>
          </li>

          {/* IQAC & Contact */}
          <li className="nav-item">
            <Link to="/iqac" className="nav-link" onClick={handleNavClick}>
              <BookOpen size={22} className="nav-icon" /> <span>IQAC</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={handleNavClick}>
              <Phone size={22} className="nav-icon" /> <span>Contact Us</span>
            </Link>
          </li>
        </ul>
      </div>
    )}
  </div>
);
};

export default Navbar;