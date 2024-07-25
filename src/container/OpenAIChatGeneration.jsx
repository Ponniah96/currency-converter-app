import { useState } from "react";
import axios from "axios";
export function OpenAIChatGeneration(){
  const [inputValue,setInputValue] = useState("");
  const [outputValue,getOutputValue] = useState("");
  
  return(
  <>
    <p>Welcome to Open AI Generation</p>
    <p>Enter some text</p>
    <input type="text" name="input" id="input" value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
    <h3>AI Result</h3>
    <h6>{outputValue}</h6>
  </>)
}