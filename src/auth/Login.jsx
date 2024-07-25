import { useEffect, useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
import "../styles/login.scss";
export function Login({onSuccess}){  
  const[loginForm,setLoginForm]=useState(true);
  
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[emailValidatiion,setEmailValidation]=useState(true);
  const[passwordlValidatiion,setPasswordValidation]=useState(true);
  
  const[signupFirstName,setSignupFirstName]=useState("");
  const[signupLastName,setSignupLastName]=useState("");
  const[signupEmail,setSignupEmail]=useState("");
  const[signupPassword,setSignupPassword]=useState("");
  const[signupProfilePic,setSignupProfilePic]=useState([]);
  const[signupFirstNameValidatiion,setSignupFirstNameValidation]=useState(true);
  const[signupLastNameValidatiion,setSignupLastNameValidation]=useState(true);
  const[signupEmailValidatiion,setSignupEmailValidation]=useState(true);
  const[signupPasswordValidatiion,setSignupPasswordValidation]=useState(true);  

  const navigate=useNavigate();
  const location=useLocation();
  const redirectPath=location.state?.path ||'/currency-converter-app'

  const validateLoginForm=()=>{
    if(email.length>0 && password.length>0){
      const loginCredentials=localStorage.getItem("loginCredentials");
      if(loginCredentials !==undefined){
        const loginCredentialData = JSON.parse(loginCredentials);
        if (email===loginCredentialData.emailId && password===loginCredentialData.password){
          onSuccess(loginCredentialData);
          navigate(redirectPath);
        }
        else{
          if(email!==loginCredentialData.emailId){
            setEmailValidation(false)
          }
          if(password!==loginCredentialData.password){
            setPasswordValidation(false)
          }
        }
      }
    }
    else{
      if(email.length===0){
        setEmailValidation(false)
      }
      if(password.length===0){
        setPasswordValidation(false)
      }
    }

  }
  
  const validateSignupForm=()=>{
    if(signupFirstName.length>0 && signupLastName.length>0 && signupEmail.length>0 &&signupPassword.length>0){
      const signupCredentials={
        firstName:signupFirstName,
        lastName:signupLastName,
        emailId:signupEmail,
        password:signupPassword,
        profilePic:JSON.stringify(signupProfilePic)
      }
      localStorage.setItem("loginCredentials",JSON.stringify(signupCredentials));
      alert("Account Created Successfully!!!");
      setLoginForm(true)
    }
    else{
      if(signupFirstName.length===0){
        setSignupFirstNameValidation(false)
      }
      if(signupLastName.length===0){
        setSignupLastNameValidation(false)
      }
      if(signupEmail.length===0){
        setSignupEmailValidation(false)
      }
      if(signupPassword.length===0){
        setSignupPasswordValidation(false)
      }
    }
  }  

  // const setGoogleLogin =(response)=>{
  //   const googleLoginData= jwtDecode(response.credential);
  //   const googleCredentials={
  //     firstName:googleLoginData.given_name,
  //     lastName:googleLoginData.family_name,
  //     emailId:googleLoginData.email,
  //     password:'',
  //     profilePic:googleLoginData.picture
  //   }
  //   localStorage.setItem("loginCredentials",JSON.stringify(googleCredentials));
  //   onSuccess(googleCredentials);
  //   navigate(redirectPath);
  // }

  return(
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-container-title">Welcome</h2>
        {loginForm
        ?
        <div className="login-section">
          <form className="login-container-form" onSubmit={(e)=>{e.preventDefault()}}>
            <div className="input-group">
              <label htmlFor="Email">Email</label>
              <input type="email" placeholder="Enter username" value={email} onChange={(e)=>{setEmail(e.target.value);setEmailValidation(true)}}/>
              {emailValidatiion?"": <span className="message">Enter valid email</span>}
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Enter password" value={password} onChange={(e)=>{setPassword(e.target.value);setPasswordValidation(true)}}/>
              {passwordlValidatiion?"": <span className="message">Enter valid password</span>}
            </div>
            <div className="submit-button">
              <input type="submit" value="Login" className="login" onClick={(e)=>{validateLoginForm()}}/>
              <span>or</span>
              <input type="submit" value="Sign Up" className="signup" onClick={(e)=>{setLoginForm(false)}}/>
            </div>
          </form>
          <div className="external-authentication-methods">
          </div>
        </div>
        :
        <div className="signup-section">
          <form className="login-container-form" onSubmit={(e)=>{e.preventDefault()}}>
            <div className="input-group">
              <label htmlFor="firstname">First Name</label>
              <input type="text" placeholder="Enter First Name" value={signupFirstName} onChange={(e)=>{setSignupFirstName(e.target.value);setSignupFirstNameValidation(true)}}/>
              {signupFirstNameValidatiion?"": <span className="message">Enter valid first name</span>}
            </div>
            <div className="input-group">
              <label htmlFor="firstname">Last Name</label>
              <input type="text" placeholder="Enter Last Name" value={signupLastName} onChange={(e)=>{setSignupLastName(e.target.value);setSignupLastNameValidation(true)}}/>
              {signupLastNameValidatiion?"": <span className="message">Enter valid last name</span>}
            </div>
            <div className="input-group">
              <label htmlFor="Email">Email</label>
              <input type="email" placeholder="Enter username" value={signupEmail} onChange={(e)=>{setSignupEmail(e.target.value);setSignupEmailValidation(true)}}/>
              {signupEmailValidatiion?"": <span className="message">Enter valid email</span>}
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Enter password" value={signupPassword} onChange={(e)=>{setSignupPassword(e.target.value);setSignupPasswordValidation(true)}}/>
              {signupPasswordValidatiion?"": <span className="message">Enter valid password</span>}
            </div>
            <div className="input-group">
              <label htmlFor="profilePhoto">Upload Profile Photo</label>
              <input type="file" onChange={(e)=>{setSignupProfilePic(e.target.files)}}/>
              <span className="message profilePic-disclaimar">**Prefered Passport Size Pic</span>
            </div>
            <div className="submit-button">
              <input type="submit" value="Sign Up" className="login" onClick={()=>{validateSignupForm()}}/>
              <span>or</span>
              <input type="submit" value="Cancel" className="signup" onClick={(e)=>{setLoginForm(true)}}/>
            </div>
          </form>
        </div>
        }
      </div>
    </div>
  )
}