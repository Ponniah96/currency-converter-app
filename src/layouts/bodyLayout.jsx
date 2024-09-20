import { createContext, useContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';
import { RequiredAuth } from "../auth/RequiredAuth";
import { Login } from "../auth/Login"
import { Home } from "../container/Home";
import { CurrencyConverter } from "../container/CurrencyConverter";
import { RandomPasswordGenerator } from "../container/RandomPasswordGenerator";
import { OpenAIChatGeneration } from "../container/OpenAIChatGeneration";
import ExcelOperations from "../container/ExcelOpertions";
import ExcelOperationsForm from "../container/ExcelOperationsForm";
import "../styles/body.scss";

const Context =createContext()

export function BodyLayout({logout, loginData}) {
  const[loginCredentials,setLoginCredentials]=useState([]);

  useEffect(()=>{
    if(logout){
      setLoginCredentials([]);
      loginData([]);
      googleLogout();
    }
  },[logout])

  const getLoginCredentials=(value)=>{
    setLoginCredentials(value);
    loginData(value);
  }

  return (
    <Context.Provider value={loginCredentials}> 
      <div className="body">
        <Routes>
          <Route path="/currency-converter-app" element={<Home />}></Route>

          <Route
            path="/currency-converter"
            element={
            <RequiredAuth>            
              <CurrencyConverter />
            </RequiredAuth>
          }
          ></Route>
          <Route
            path="/random-password-generator"
            element={            
              <RequiredAuth>            
                <RandomPasswordGenerator />
              </RequiredAuth>
            }
          ></Route>
          {/* <Route
            path="/open-ai-chat-generation"
            element={
              <RequiredAuth>            
                <OpenAIChatGeneration />
              </RequiredAuth>
            }
          ></Route> */}
          <Route
            path="/data-operations-without-database"
            element={          
                <ExcelOperations />
            }
          >
            <Route path="new" element={<ExcelOperations />}></Route>
            <Route path="edit/:userId" element={<ExcelOperationsForm />}></Route>
            <Route path="AI" element={<OpenAIChatGeneration />}></Route>
          </Route>
        <Route path="/login"
            element={<Login onSuccess={(value)=>getLoginCredentials(value)}/>}></Route>
        </Routes>
      </div>
    </Context.Provider>
  );
}

export const useLoginCredentials=()=>{
  return useContext(Context);
}