import { useState } from "react";
// import axios from 'axios';
import { useNavigate} from "react-router-dom";
import "../styles/login.scss";
export default function ExcelOperationsForm({handleSubmitData}){  
  
  const[updateName,setupdateName]=useState("");
  const[updateDesignation,setupdateDesignation]=useState("");
  const[updateRole,setupdateRole]=useState("");
  const[updateTechstacks,setupdateTechstacks]=useState("");
  const[updateNameValidatiion,setupdateNameValidation]=useState(true);
  const[updateDesignationValidatiion,setupdateDesignationValidation]=useState(true);
  const[updateRoleValidatiion,setupdateRoleValidation]=useState(true);
  const[updateTechstacksValidatiion,setupdateTechstacksValidation]=useState(true);  

  const navigate=useNavigate();

  const validateRecords=()=>{
    if(updateName.length>0 && updateDesignation.length>0 && updateRole.length>0 &&updateTechstacks.length>0){
      const updatedData={
        name:updateName,
        designation:updateDesignation,
        role:updateRole,
        favouriteTechstacks:updateTechstacks
      }
      handleSubmitData(updatedData);
      navigate(-1);
    }
    else{
      if(updateName.length===0){
        setupdateNameValidation(false)
      }
      if(updateDesignation.length===0){
        setupdateDesignationValidation(false)
      }
      if(updateRole.length===0){
        setupdateRoleValidation(false)
      }
      if(updateTechstacks.length===0){
        setupdateTechstacksValidation(false)
      }
    }
  }   

  return(
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-container-title">Welcome</h2>
        
        <div className="signup-section">
          <form className="login-container-form" onSubmit={(e)=>{e.preventDefault()}}>
            <div className="input-group">
              <label htmlFor="Name">Name</label>
              <input type="text" placeholder="Enter Name" value={updateName} onChange={(e)=>{setupdateName(e.target.value);setupdateNameValidation(true)}}/>
              {updateNameValidatiion?"": <span className="message">Enter valid name</span>}
            </div>
            <div className="input-group">
              <label htmlFor="Desgination">Designation</label>
              <input type="text" placeholder="Enter Designation" value={updateDesignation} onChange={(e)=>{setupdateDesignation(e.target.value);setupdateDesignationValidation(true)}}/>
              {updateDesignationValidatiion?"": <span className="message">Enter valid designation</span>}
            </div>
            <div className="input-group">
              <label htmlFor="Role">Role</label>
              <input type="text" placeholder="Enter role" value={updateRole} onChange={(e)=>{setupdateRole(e.target.value);setupdateRoleValidation(true)}}/>
              {updateRoleValidatiion?"": <span className="message">Enter valid role</span>}
            </div>
            <div className="input-group">
              <label htmlFor="Techstacks">Favourite Techstacks</label>
              <input type="text" placeholder="Enter techstacks" value={updateTechstacks} onChange={(e)=>{setupdateTechstacks(e.target.value);setupdateTechstacksValidation(true)}}/>
              {updateTechstacksValidatiion?"": <span className="message">Enter valid techstacks</span>}
            </div>
            <div className="submit-button">
              <input type="submit" value="Add" className="login" onClick={()=>{validateRecords()}}/>
              <span>or</span>
              <input type="submit" value="Cancel" className="signup" onClick={(e)=>{navigate(-1)}}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}