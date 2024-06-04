import { Link } from "react-router-dom";
import "../styles/card.scss";
import currencyConverter from "../data/images/currency-converter.png";
import passwordGenerator from "../data/images/password-generator.png";

export function Home() {
  return (
    <div className="homepage-card body-section">
      <div className="card-section">
        <img className="card-section-image" src={currencyConverter} alt="" />
        <div className="card-section-body">
          <div className="card-section-body-header">Currency Converter</div>
          <div>
            Currency Converter is used to convert any currency from one country
            value into another country value
          </div>
          <div>
            <b className="p-0">Concepts: </b>
            React hooks, Axios, Material UI, Text to speech conversion
          </div>
        </div>
        <div className="card-section-footer">
          <Link to="/currency-converter" className="primary-button">
            Visit Application
          </Link>
        </div>
      </div>
      <div className="card-section">
        <img className="card-section-image" src={passwordGenerator} alt="" />
        <div className="card-section-body">
          <div className="card-section-body-header">
            Random Password Generator
          </div>
          <div>
            Random Password Generator is used to generate random password based
            on parameters like length, numbers, uppercase, lowercase and
            numbers.
          </div>
          <div>
            <b className="p-0">Concepts:</b>React hooks, Javascript, SASS
          </div>
        </div>
        <div className="card-section-footer">
          <Link to="/random-password-generator" className="primary-button">
            Visit Application
          </Link>
        </div>
      </div>
    </div>
  );
}
