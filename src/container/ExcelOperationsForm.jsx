import { useState, useEffect } from "react";
import { useNavigate, useParams} from "react-router-dom";
import "../styles/login.scss";
export default function ExcelOperationsForm({handleSubmitData,handleEditData,handleInputData,loginData}){  
  
  const[updateName,setupdateName]=useState("");
  const[updateDesignation,setupdateDesignation]=useState("");
  const[updateRole,setupdateRole]=useState("");
  const[updateTechstacks,setupdateTechstacks]=useState("");
  const[updateNameValidatiion,setupdateNameValidation]=useState(true);
  const[updateDesignationValidatiion,setupdateDesignationValidation]=useState(true);
  const[updateRoleValidatiion,setupdateRoleValidation]=useState(true);
  const[updateTechstacksValidatiion,setupdateTechstacksValidation]=useState(true);  
  const[updateButtonEnable,setupdateButtonEnable]=useState(true);

  const navigate=useNavigate();
  const{userId}=useParams();
  
  useEffect(()=>{
    if(userId){
      setupdateName(handleInputData[userId].name);
      setupdateDesignation(handleInputData[userId].designation);
      setupdateRole(handleInputData[userId].role);
      setupdateTechstacks(handleInputData[userId].favouriteTechstacks);
    }
  },[userId,handleInputData])

  const validateRecords=()=>{
    if(updateName.length>0 && updateDesignation.length>0 && updateRole.length>0 &&updateTechstacks.length>0){
      const updatedData={
        name:updateName,
        designation:updateDesignation,
        role:updateRole,
        favouriteTechstacks:updateTechstacks
      }
      if(userId){
        handleEditData(userId,updatedData);
      }
      else{
        handleSubmitData(updatedData);
      }
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

  const enableEditButton = () => {
    if(userId){
      if(updateName.length>0 && updateDesignation.length>0 && updateRole.length>0 &&updateTechstacks.length>0){
        if(updateName!==handleInputData[userId].name || updateDesignation!==handleInputData[userId].designation || updateRole!==handleInputData[userId].role || updateTechstacks!==handleInputData[userId].favouriteTechstacks){
        setupdateButtonEnable(false);
        }
      }
      else{
        setupdateButtonEnable(true);
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
              <input type="text" placeholder="Enter Name" value={updateName} onChange={(e)=>{setupdateName(e.target.value);setupdateNameValidation(true);enableEditButton()}}/>
              {updateNameValidatiion?"": <span className="message">Enter valid name</span>}
            </div>
            <div className="input-group">
              <label htmlFor="Desgination">Designation</label>
              <input type="text" placeholder="Enter Designation" value={updateDesignation} onChange={(e)=>{setupdateDesignation(e.target.value);setupdateDesignationValidation(true);enableEditButton()}}/>
              {updateDesignationValidatiion?"": <span className="message">Enter valid designation</span>}
            </div>
            <div className="input-group">
              <label htmlFor="Role">Role</label>
              <input type="text" placeholder="Enter role" value={updateRole} onChange={(e)=>{setupdateRole(e.target.value);setupdateRoleValidation(true);enableEditButton()}}/>
              {updateRoleValidatiion?"": <span className="message">Enter valid role</span>}
            </div>
            <div className="input-group">
              <label htmlFor="Techstacks">Favourite Techstacks</label>
              <input type="text" placeholder="Enter techstacks" value={updateTechstacks} onChange={(e)=>{setupdateTechstacks(e.target.value);setupdateTechstacksValidation(true);enableEditButton()}}/>
              {updateTechstacksValidatiion?"": <span className="message">Enter valid techstacks</span>}
            </div>
            {loginData.firstName 
            ?
              <div className="submit-button">
                {userId
                ?
                <input type="submit" value="Update" className="login" onClick={()=>{validateRecords()}} disabled={updateButtonEnable}/>
                :
                <input type="submit" value="Add" className="login" onClick={()=>{validateRecords()}}/>
                }
                <span>or</span>
                <input type="submit" value="Cancel" className="signup" onClick={(e)=>{navigate(-1)}}/>
              </div>
              :
              <div className="submit-button">
                <input type="submit" value="Back to Dashboard" className="login" onClick={(e)=>{navigate(-1)}}/>
              </div>
            }
          </form>
        </div>
      </div>
    </div>
  )
}