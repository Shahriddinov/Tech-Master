import React, {useEffect, useState} from "react";
import Logo from "../../../assests/images/Logo.jpg";
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import {Link} from "react-router-dom";
import { RxEnter } from "react-icons/rx";
import { FaCaretDown } from "react-icons/fa";
import {useLocation} from "react-router";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isInitial, setIsInitial] = useState(true);
    const location = useLocation();
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleDropdown = (index) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
    };
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
                setIsInitial(false);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const isHomePage = location.pathname === "/"; // Faqat Home sahifasi uchun tekshiruv

    return (
        <header  className={`header ${menuOpen ? "menu-opened" : ""} ${isScrolled ? "scrolled" : ""} ${isInitial ? "" : "hidden"}`}
        >
            <div className="container">
                <a href="/" className="logo">
                    <img className="logo_picture"  src={Logo} alt="logo"/>
                </a>
                <nav className={`nav ${menuOpen ? "open" : ""}`}>
                    <ul>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home </Link>

                        </li>
                        <CDropdown className="nav-item">
                            <CDropdownToggle className="nav-link" >Pages <FaCaretDown /></CDropdownToggle>
                            <CDropdownMenu className="dropdown-menu">
                                <CDropdownItem href="/about">About Us</CDropdownItem>
                                <CDropdownItem href="/our-team">Our Team</CDropdownItem>
                                <CDropdownItem href="/team-details">Our Team Details</CDropdownItem>
                                <CDropdownItem href="/privacy-policy">Privacy Police</CDropdownItem>
                                <CDropdownItem href="/terms-conditions">Terms & Conditions</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                        <CDropdown className="nav-item">
                            <CDropdownToggle className="nav-link" >Courses <FaCaretDown /></CDropdownToggle>
                            <CDropdownMenu className="dropdown-menu">
                                <CDropdownItem href="/courses-list/grid">Courses List</CDropdownItem>
                                <CDropdownItem href="#">Courses Grid</CDropdownItem>
                                <CDropdownItem href="#">Courses Details</CDropdownItem>
                                <CDropdownItem href="#">Courses Sidebar</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                        <CDropdown className="nav-item">
                            <CDropdownToggle className="nav-link" >Blog <FaCaretDown /></CDropdownToggle>
                            <CDropdownMenu className="dropdown-menu">
                                <CDropdownItem href="blog-standart">Blog Standart</CDropdownItem>
                                <CDropdownItem href="blog-details">Blog Details</CDropdownItem>
                                <CDropdownItem href="blog-with-sidebar">Blog With Sidebar</CDropdownItem>
                                <CDropdownItem href="blog-without-sidebar">Blog Without Sidebar</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>

                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/sign-in"> <RxEnter />
                                Sign In</a>
                        </li>

                    </ul>
                </nav>
                <div className="burger-menu" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </header>
    );
};

export default Header;
