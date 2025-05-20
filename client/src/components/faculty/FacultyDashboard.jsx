import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Briefcase, Award, GraduationCap, BookOpen, Menu, X } from "lucide-react";
import FacultyProfile from "./FacultyProfile";
import FacultyTable from "./FacultyTable"; // This component will be created later
import "./styles/FacultyDashboard.css";
import FacultyPublications from "./FacultyPublications";
import FacultyExperience from "./FacultyExperiences";
import FacultyAwards from "./FacultAwards";
import FacultyCardList from "../admin/Facultylist";
import FacultyQualifications from "./FacultyQualifications";

const FacultyDashboard = ({ data, setUser }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("profile");
  const [facultyData, setFacultyData] = useState(data || null);
  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await fetch("http://localhost:8000/auth/checkAuth", {
          headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
        if (!res.ok) {
          navigate("/login");
        } else {
          setUser(true);
        }
      } catch (err) {
        console.error("Session check failed:", err);
        navigate("/login");
      }
    };
    verifySession();

  }, [navigate, setUser]);
  
  const fetchFacultyData = async () => {
    const response = await fetch('http://localhost:8000/faculty/faculty_dashboard', {
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const json = await response.json();

    return {
      results: json.result || [],
      experiences: json.experiences || [],
      awards: json.awards || [],
      qualifications: json.qualifications || [],
      publications: json.publications || []
    };
  };
  
  useEffect(() => {
    setLoading(true);
    fetchFacultyData()
      .then(data => {
        setFacultyData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load faculty data');
        setLoading(false);
      });
  }, [data]); // run once on mount

  const handleLogout = async () => {
    try {

  localStorage.removeItem("token");
  setUser(null);
  navigate("/login");

    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemClick = (key) => {
    setSelected(key);
    if (window.innerWidth <= 768) {
      setMenuOpen(false);
    }
  };

  const menuItems = [
    { key: "profile", label: "Profile", icon: <User size={16} /> },
    { key: "experiences", label: "Experiences", icon: <Briefcase size={16} /> },
    { key: "awards", label: "Awards & Honors", icon: <Award size={16} /> },
    { key: "qualifications", label: "Qualifications", icon: <GraduationCap size={16} /> },
    { key: "publications", label: "Publications", icon: <BookOpen size={16} /> },
  ];

  if (loading) return <div className="fd_loading-state">Loading...</div>;
  if (error) return <div className="fd_error-state">{error}</div>;

  return (
    <div className="fd_dashboard-container">
      <div className="fd_dashboard-header">
        <div className="fd_header-content">
          <div className="fd_header-left">
            <button className="fd_menu-toggle" onClick={toggleMenu}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        <h2 className="fd_dashboard-title">Faculty Dashboard</h2>
        <button className="fd_logout-btn" onClick={handleLogout}>
          <LogOut size={16} style={{ marginRight: 8 }} />
          <span className="fd_logout-text">Logout</span>
        </button>
      </div>

      <div className="fd_dashboard-body">
        <aside className={`fd_sidebar ${menuOpen ? 'fd_sidebar--open' : ''}`}>
          <ul className="fd_menu-list">
            {menuItems.map(item => (
              <li 
                key={item.key} 
                className={`fd_menu-item ${selected === item.key ? 'fd_menu-item--active' : ''}`}
                onClick={() => handleMenuItemClick(item.key)}
              >
                <button className="fd_menu-button">
                  {item.icon} 
                  <span style={{ marginLeft: 10 }}>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="fd_main-content">
          <div className="fd_content-wrapper">
            {selected === "profile" && facultyData && (
              <FacultyProfile data={facultyData} fetchFacultyData={fetchFacultyData}/>
            )}
            {selected === "experiences" && facultyData && (
              <FacultyExperience/>
            )}
            {selected === "awards" && facultyData && (
              <FacultyAwards/>
            )}
            {selected === "qualifications" && facultyData && (
              <FacultyQualifications/>
            )}
            {selected === "publications" && facultyData && (
              <FacultyPublications/>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default FacultyDashboard;