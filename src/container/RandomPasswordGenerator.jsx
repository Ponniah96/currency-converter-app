import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentCopyTwoToneIcon from "@mui/icons-material/ContentCopyTwoTone";
import "../styles/randomPasswordGenerator.scss";
import { Alert } from "@mui/material";

export function RandomPasswordGenerator() {
  const [randomPasswordGenerator, setRandomPasswordGenerator] = useState("");
  const [length, setLength] = useState(16);
  const [numberState, setNumberState] = useState(false);
  const [upperCaseState, setUpperCaseState] = useState(false);
  const [lowerCaseState, setLowerCaseState] = useState(false);
  const [specialCharacterState, setSpecialCharacterState] = useState(false);
  const [copyIcon, setCopyIcon] = useState(false);

  const createRandomPasswordGenerator = () => {
    const numbers = "0123456789";
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialCharacters = "~!@#$%^&*()_+";
    var finalText = "";
    if (
      numberState ||
      upperCaseState ||
      lowerCaseState ||
      specialCharacterState
    ) {
      if (upperCaseState) {
        finalText = finalText.concat(upperCase);
      }
      if (lowerCaseState) {
        finalText = finalText.concat(lowerCase);
      }
      if (numberState) {
        finalText = finalText.concat(numbers);
      }
      if (specialCharacterState) {
        finalText = finalText.concat(specialCharacters);
      }
      var result = "";
      for (var i = 0, n = finalText.length; i < length; i++) {
        result += finalText[Math.floor(Math.random() * n)];
      }
      setRandomPasswordGenerator(result);
    } else {
      setRandomPasswordGenerator("");
      setCopyIcon(false);
      alert("Please Choose any option");
    }
  };

  return (
    <div className="homepage-card body-section">
      <div className="card-section">
        <div className="card-section-body">
          <div className="card-section-body-header border-bottom">
            Random Password Generator
          </div>
          <form>
            <div className="password-generator-length">
              <label className="pl-0">Generated Password</label>
              <input type="text" value={randomPasswordGenerator} readOnly />
              {randomPasswordGenerator.length > 0 ? (
                <div
                  className="p-0"
                  onClick={() => {
                    setCopyIcon(true);
                  }}
                >
                  {copyIcon ? (
                    <ContentCopyTwoToneIcon
                      sx={{ color: "green" }}
                      className="p-0"
                    />
                  ) : (
                    <ContentCopyIcon
                      className="p-0"
                      onClick={() => {
                        navigator.clipboard.writeText(randomPasswordGenerator);
                        alert("Text Copied!");
                      }}
                    />
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              <span>Select options to create password</span>
            </div>
            <div className="password-generator-length">
              <label className="pl-0">Select Length</label>
              <input
                type="range"
                defaultValue="16"
                min="1"
                max="100"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
              <input
                type="text"
                value={length}
                readOnly
                className="password-generator-length-value"
              />
            </div>
            <div>
              <input
                type="checkbox"
                name="Numbers"
                id="Numbers"
                className="ml-16"
                onChange={(e) => {
                  setNumberState(e.target.checked);
                }}
              />
              <label name="Numbers">Numbers</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="Uppercase"
                id="Uppercase"
                className="ml-16"
                onChange={(e) => {
                  setUpperCaseState(e.target.checked);
                }}
              />
              <label name="Uppercase">Uppercase</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="Uppercase"
                id="Lowercase"
                className="ml-16"
                onChange={(e) => {
                  setLowerCaseState(e.target.checked);
                }}
              />
              <label name="Lowercase">Lowercase</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="Uppercase"
                id="Special Characters"
                className="ml-16"
                onChange={(e) => {
                  setSpecialCharacterState(e.target.checked);
                }}
              />
              <label name="Special Characters">Special Characters</label>
            </div>
            <div className="card-section-footer">
              <input
                type="button"
                value="Get Password"
                className="primary-button"
                onClick={(e) => {
                  e.preventDefault();
                  createRandomPasswordGenerator();
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
