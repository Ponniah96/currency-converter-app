import { useState } from "react";
import { Link } from "react-router-dom";
import reactLogo from "../data/images/react-logo.png";
import "../styles/header.scss";
import MenuIcon from "@mui/icons-material/Menu";
export function HeaderLayout({onLogout,loginData}) {
  // const name = useLoginCredentials();
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
      {/* <div
        className={mobileMenu ? `header-menu active` : `header-menu`}
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        <Link to="/open-ai-chat-generation">Open AI Generation </Link>
      </div> */}
      <div
        className={mobileMenu ? `header-menu active` : `header-menu`}
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        <Link to="/data-operations-without-database">Data Operations w/o DB</Link>
      </div>
      <div className="login-section">
        {loginData?.firstName
          ?
          <button onClick={()=>{onLogout(true)}} className="login-button logout">Logout</button>
          :
          <Link to="/login" className="login-button">
            Login
          </Link>
        }
      </div>
    </div>
  );
}
