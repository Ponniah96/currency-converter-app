import React, {useState,useEffect} from 'react';
import axios from 'axios';
import "../styles/excel.scss";

const ExcelOperations = () => {

  const [fullData, setFullData] = useState([]);
  const [headerData, setHeaderData] = useState([]);
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {   
    fetchData()
  }, []);

  async function fetchData() {       
    await axios.get('https://script.google.com/macros/s/AKfycbyHiPYbyfAg-TTdq-mwWIeai1WDeJhS0yFGnuQvwO3q1ED7DtySAjD-AZvPeJvRvL2_bQ/exec')
      .then(response => {
        if(response.status === 200){
          setFullData(response.data);
          const keys = Object.keys(response.data[0]);
          setHeaderData(keys);
          setLoadData(true);
        } 
      })
  }
  return (
    <div className='p-16'>
      {!loadData
      ?
      <div><b>Loading Data...</b></div>
      :
      <>
        <h4 style={{textAlign:"center", paddingBottom:'16px'}}>Welcome to Data Operations in React without DB, Server</h4>
        <div style={{overflowX:'auto'}}>

        <table className='table'>
          <thead>
            <tr>
              {headerData.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fullData.map((row, index) => (
              <tr key={index}>
                {headerData.map((header, index) => (
                  <td key={index}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </>
      }
    </div>
  );
};

export default ExcelOperations;