import React, { useState, useEffect, useRef } from "react";
import ViewAlumni from "./Viewalumni";
import ViewNews from "./ViewNews";
import AddFaculty from "./Addfaculty";
import FacultyList from "./Facultylist";
import { useNavigate } from "react-router-dom";
import {
    LogOut,
    Newspaper,
    GraduationCap,
    UserPlus,
    Users,
    Menu,
    X
} from "lucide-react";
import "./styles/AdminDashboard.css"; // Import the new CSS file

const AdminDashboard = ({ setUser }) => {
    const [activeComponent, setActiveComponent] = useState("welcome");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const navigate = useNavigate();
    const mobileMenuRef = useRef(null);
    const mobileMenuButtonRef = useRef(null);

    const token = localStorage.getItem("token");

    // Check mobile view on resize and load
    useEffect(() => {
        const checkMobileView = () => {
            setIsMobileView(window.innerWidth <= 768);
        };

        checkMobileView();
        window.addEventListener('resize', checkMobileView);
        return () => window.removeEventListener('resize', checkMobileView);
    }, []);

    // Close mobile menu on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isMobileMenuOpen &&
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target) &&
                mobileMenuButtonRef.current &&
                !mobileMenuButtonRef.current.contains(event.target)
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    // Verify admin session
    useEffect(() => {
        const verifySession = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const res = await fetch("http://localhost:8000/auth/checkAuth", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                if (!res.ok || data.type !== "admin") {
                    navigate("/login");
                } else {
                    setUser(data.user);  // Optional: store full user if needed
                }
            } catch (err) {
                console.error("Session check failed:", err);
                navigate("/login");
            }
        };
        verifySession();
    }, [navigate, setUser]);


    const renderComponent = () => {
        switch (activeComponent) {
            case "viewNews":
                return <ViewNews />;
            case "viewAlumni":
                return <ViewAlumni />;
            case "addFaculty":
                return <AddFaculty />;
            case "facultyList":
                return <FacultyList />;
            default:
                return (
                    <div className="ad_welcome-message">
                        <h2>Welcome to Admin Dashboard</h2>
                        <p>Select an option from the menu to get started</p>
                    </div>
                );
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleMenuItemClick = (id) => {
        setActiveComponent(id);
        if (isMobileView) {
            setIsMobileMenuOpen(false);
        }
    };

    const menuItems = [
        { id: "viewNews", label: "View News", icon: <Newspaper size={16} /> },
        { id: "viewAlumni", label: "View Alumni", icon: <GraduationCap size={16} /> },
        { id: "addFaculty", label: "Add Faculty", icon: <UserPlus size={16} /> },
        { id: "facultyList", label: "View Faculty", icon: <Users size={16} /> }
    ];

    return (
        <div className="ad_dashboard-container">
            <div className="ad_dashboard-header">
                <div className="ad_header-content">
                    <div className="ad_header-left">
                        <button className="ad_menu-toggle" onClick={toggleMobileMenu} ref={mobileMenuButtonRef}>
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
                <h2 className="ad_dashboard-title">Admin Dashboard</h2>
                <button className="ad_logout-btn" onClick={handleLogout}>
                    <LogOut size={16} style={{ marginRight: 8 }} />
                    <span className="ad_logout-text">Logout</span>
                </button>
            </div>

            <div className="ad_dashboard-body">
                <aside className={`ad_sidebar ${isMobileMenuOpen && isMobileView ? 'ad_sidebar--open' : ''}`} ref={mobileMenuRef}>
                    <ul className="ad_menu-list">
                        {menuItems.map(item => (
                            <li
                                key={item.id}
                                className={`ad_menu-item ${activeComponent === item.id ? 'ad_menu-item--active' : ''}`}
                                onClick={() => handleMenuItemClick(item.id)}
                            >
                                <button className="ad_menu-button">
                                    {item.icon}
                                    <span style={{ marginLeft: 10 }}>{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                <main className="ad_main-content">
                    <div className="ad_content-wrapper">
                        {renderComponent()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;