import React, { useEffect, useState } from "react";
import Logo from "../../../assests/images/Logo.jpg";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { Link } from "react-router-dom";
import { RxEnter } from "react-icons/rx";
import { FaCaretDown } from "react-icons/fa";
import { useLocation } from "react-router";
import LanguageSwitcher from "../../LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { languageChange } from "../../../reduxToolkit/languageSlice";
import Language from "../../Language/language";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const location = useLocation();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const { t } = useTranslation("header");

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
    <header
      className={`header ${menuOpen ? "menu-opened" : ""} ${
        isScrolled ? "scrolled" : ""
      } ${isInitial ? "" : "hidden"}`}
    >
      <div className="container">
        <a href="/" className="logo">
          <img className="logo_picture" src={Logo} alt="logo" />
        </a>
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <ul>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                {t("home")}
              </Link>
            </li>
            <CDropdown className="nav-item">
              <CDropdownToggle className="nav-link">
                {t("pages")}
                <FaCaretDown />
              </CDropdownToggle>
              <CDropdownMenu className="dropdown-menu">
                <CDropdownItem href="/about">{t("about_us")}</CDropdownItem>
                <CDropdownItem href="/our-team">{t("our_team")}</CDropdownItem>
                <CDropdownItem href="/team-details">
                  {t("team_details")}
                </CDropdownItem>
                <CDropdownItem href="/privacy-policy">
                  {t("privacy_policy")}
                </CDropdownItem>
                <CDropdownItem href="/terms-conditions">
                  {t("terms_conditions")}
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="nav-item">
              <CDropdownToggle className="nav-link">
                {t("courses")}
                <FaCaretDown />
              </CDropdownToggle>
              <CDropdownMenu className="dropdown-menu">
                <CDropdownItem href="/courses-list/item">
                  {t("courses_list")}
                </CDropdownItem>
                <CDropdownItem href="/courses-list/grid">{t("courses_grid")}</CDropdownItem>
                <CDropdownItem href="/courses-details">{t("courses_details")}</CDropdownItem>
                <CDropdownItem href="#">{t("courses_sidebar")}</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="nav-item">
              <CDropdownToggle className="nav-link">
                {t("blog")}
                <FaCaretDown />
              </CDropdownToggle>
              <CDropdownMenu className="dropdown-menu">
                <CDropdownItem href="blog-standart">
                  {t("blog_standard")}
                </CDropdownItem>
                <CDropdownItem href="blog-details">
                  {t("blog_details")}
                </CDropdownItem>
                <CDropdownItem href="blog-with-sidebar">
                  {t("blog_with_sidebar")}
                </CDropdownItem>
                <CDropdownItem href="blog-without-sidebar">
                  {t("blog_without_sidebar")}
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <Language/>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                {t("contact")}
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/sign-in">
                {" "}
                <RxEnter />
                {t("sign_in")}
              </a>
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
