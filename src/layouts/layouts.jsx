import { BrowserRouter } from "react-router-dom";
import { HeaderLayout } from "./headerLayout";
import { BodyLayout } from "./bodyLayout";
import { FooterLayout } from "./footerLayout";

export default function Layout() {
  return (
    <div className="react-projects">
      <BrowserRouter>
        <HeaderLayout />
        <BodyLayout />
        <FooterLayout />
      </BrowserRouter>
    </div>
  );
}
