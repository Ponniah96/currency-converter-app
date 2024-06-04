import { useState } from "react";
import { Link } from "react-router-dom";
import reactLogo from "../data/images/react-logo.png";
import "../styles/header.scss";
import MenuIcon from "@mui/icons-material/Menu";
export function HeaderLayout() {
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <div className="header">
      <div
        className="header-logo"
        onClick={() => (mobileMenu ? setMobileMenu(!mobileMenu) : "")}
      >
        <Link className="top-nav-bar-links" to="/currency-converter-app">
          <img
            className="App-logo"
            src={reactLogo}
            alt="logo icon"
            width="30"
            height="30"
          />
          <span>React Mini Projects</span>
        </Link>
        <div
          className="header-mobile-menu-icon"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          <MenuIcon sx={{ color: "#87ceeb" }} />
        </div>
      </div>
      <div
        className={mobileMenu ? `header-menu active` : `header-menu`}
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        <Link to="/currency-converter">Currency Converter</Link>
      </div>
      <div
        className={mobileMenu ? `header-menu active` : `header-menu`}
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        <Link to="/random-password-generator">Random Password generator</Link>
      </div>
    </div>
  );
}
