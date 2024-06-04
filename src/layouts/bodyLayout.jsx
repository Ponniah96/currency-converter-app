import { Route, Routes } from "react-router-dom";
import { Home } from "../container/Home";
import { CurrencyConverter } from "../container/CurrencyConverter";
import { RandomPasswordGenerator } from "../container/RandomPasswordGenerator";
import "../styles/body.scss";
export function BodyLayout() {
  return (
    <div className="body">
      <Routes>
        <Route exact path="/currency-converter-app" element={<Home />}></Route>
        <Route
          path="/currency-converter"
          element={<CurrencyConverter />}
        ></Route>
        <Route
          path="/random-password-generator"
          element={<RandomPasswordGenerator />}
        ></Route>
      </Routes>
    </div>
  );
}
