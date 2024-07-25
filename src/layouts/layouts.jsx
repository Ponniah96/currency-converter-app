import { useState } from "react";
import { BrowserRouter} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
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
    <GoogleOAuthProvider clientId="485947524336-3gqngf1o0kntbre56phv49bh5facarf7.apps.googleusercontent.com">
      <BrowserRouter>
        <div className="react-projects">
          <HeaderLayout onLogout={(value)=>{getLogoutDetails(value)}} loginData={loginData}/>
          <BodyLayout logout={logOutFlag} loginData={(value)=>getLoginData(value)}/>
          <FooterLayout />
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}
