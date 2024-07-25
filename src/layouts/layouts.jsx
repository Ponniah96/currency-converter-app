import { useState } from "react";
import { BrowserRouter} from "react-router-dom";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import { HeaderLayout } from "./headerLayout";
import { BodyLayout } from "./bodyLayout";
import { FooterLayout } from "./footerLayout";
// import { googleCredentials } from "../data/content/authData";

export default function Layout() {
  const [loginData,setLoginData] = useState([]);
  const[logOutFlag,setLogoutFlag]=useState(false);
  const getLoginData =(value)=>{
    setLoginData(value);
    setLogoutFlag(false);
  }
  const getLogoutDetails=(value)=>{
    if(value){
      setLogoutFlag(true);
    }
  }
  return (
    // <GoogleOAuthProvider clientId={googleCredentials.clientId}>
      <BrowserRouter>
        <div className="react-projects">
          <HeaderLayout onLogout={(value)=>{getLogoutDetails(value)}} loginData={loginData}/>
          <BodyLayout logout={logOutFlag} loginData={(value)=>getLoginData(value)}/>
          <FooterLayout />
        </div>
      </BrowserRouter>
    // </GoogleOAuthProvider>
  );
}
