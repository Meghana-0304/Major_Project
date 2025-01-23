import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

const SideNavBar = () => {
    const [isExpanded, setExpendState] = useState(false);
    const [isAccountMenuOpen, setAccountMenuOpen] = useState(false);
    const dropdownRef = useRef(null); // Reference for the dropdown container

    const menuItems = [
        { text: "Home", icon: "icons/home.svg", path: "/" },
        { text: "Trending", icon: "icons/trending.svg", path: "/trending" },
        { text: "Workshops", icon: "icons/workshop.svg", path: "/workshops" },
        { text: "Internships", icon: "icons/internship.svg", path: "/internship" },
        { text: "Jobs", icon: "icons/job.svg", path: "/jobs" },
        { text: "Notifications", icon: "icons/notification.svg", path: "/notifications" },
        { text: "Account", icon: "images/profle.jpg", path: "/profile" },
        { text: "About us", icon: "icons/about.svg", path: "/aboutus" },
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setAccountMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div className="sidebar">
            <div
                className={
                    isExpanded
                        ? "side-nav-container"
                        : "side-nav-container side-nav-container-NX"
                }
            >
                <div className="nav-upper">
                    <div className="nav-heading">
                        {isExpanded && (
                            <div className="nav-brand">
                                <img src="images/logo.png" alt="LOGO" />
                            </div>
                        )}
                        <button
                            className={
                                isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
                            }
                            onClick={() => setExpendState(!isExpanded)}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    <div className="nav-menu">
                        {menuItems.map(({ text, icon }) =>
                            text === "Account" ? (
                                <div
                                    ref={dropdownRef} // Attach the ref to the dropdown container
                                    key={text}
                                    className={
                                        isExpanded ? "menu-item" : "menu-item menu-item-NX"
                                    }
                                    onClick={() => setAccountMenuOpen(!isAccountMenuOpen)} // Toggle dropdown menu
                                >
                                    <img
                                        className="profile-circle"
                                        src={"images/profile.jpg"}
                                        alt="icon/profile.svg"
                                    />
                                    {isExpanded && <p>{text}</p>}
                                    {isAccountMenuOpen && (
                                        <div className="dropdown-menu">
                                            <a href="#">Settings</a>
                                            <a href="#">Logout</a>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <a
                                    key={text}
                                    className={
                                        isExpanded ? "menu-item" : "menu-item menu-item-NX"
                                    }
                                    href="#"
                                >
                                    <img className="menu-item-icon" src={icon} alt="" />
                                    {isExpanded && <p>{text}</p>}
                                </a>
                            )
                        )}
                    </div>
                </div>
            </div>
            <nav className="navbar">
                <ul className="nav-links">
                    {menuItems.map((item, index) => (
                        <li key={index} className="nav-item">
                            <NavLink to={item.path} className="nav-link" activeClassName="active">
                                <img src={item.icon} alt={`${item.text} icon`} className="nav-icon" />
                                <span>{item.text}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default SideNavBar;
