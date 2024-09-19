import React, {useState,useEffect} from 'react';
import { Link, Routes, Route } from "react-router-dom";
import axios from 'axios';
import ExcelOperationsForm from './ExcelOperationsForm';
import "../styles/excel.scss";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Snackbar,Alert } from '@mui/material';
const ExcelOperations = () => {

  const [fullData, setFullData] = useState([]);
  const [headerData, setHeaderData] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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

  async function createData(data) {
    await axios.post('https://script.google.com/macros/s/AKfycbx8nyehmPE31ZRFVEM2ve7Y2M2uq5BTd8w1St0LehMkbzmDRH0kJZ6mbPYv9Z55_a8jVA/exec', data, {
      headers: {
        'Content-Type': 'text/plain;charset=utf-8' 
      }
    }).then(response => {
        if(response.status === 200){
          setSnackbarMessage(response.data.message);
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
          fetchData();
        } 
      }).catch(error => {
        console.error('There was an error!', error);
        setSnackbarMessage('There was an error: ' + error.message);
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      });
  }

  async function handleDeleta(data) { 
      setLoadData(false);
      await axios.post('https://script.google.com/macros/s/AKfycbwiT0LdxbTB8EM8nWulFbQ7sfZLQAXT2V7a3oLjJL4j--8I7e25S2U_cHSLukWd1ifV-g/exec',data,{
        headers: {
          'Content-Type': 'text/plain;charset=utf-8' 
        },
        params: {
          _method: 'DELETE'
        }
      }).then(response => {
          setSnackbarMessage(response.data.message);
          setSnackbarSeverity('success');
          setOpenSnackbar(true);
          fetchData();
        }).catch(error => {
          console.error('There was an error!', error);
          setSnackbarMessage('There was an error: ' + error.message);
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
          setLoadData(true);
        });
  }

  async function handleUpdate(data) {
    setLoadData(false);
    await axios.post('https://script.google.com/macros/s/AKfycbzo3iaL8VquqQ2BuSRbblA5FmqKeivgukVyeq0Move6wMwbi4zw5IVM3o1cPs4EsggRGg/exec',data,{
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      params: {
        _method: 'PUT'
      }
    }).then(response => {
        setSnackbarMessage(response.data.message);
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        fetchData();
      }).catch(error => {
        console.error('There was an error!', error);
        setSnackbarMessage('There was an error: ' + error.message);
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        setLoadData(true);
      });
  }

  const handleEditData = (index,value) => {
    console.log(index,value);
    const data={
      "id": index,
      "name": value.name,
      "designation": value.designation,
      "role": value.role,
      "favouriteTechstacks": value.favouriteTechstacks
    }
    handleUpdate(data);
  }

  const handleData = (data) => {
    setLoadData(false);
    createData(data);
  }

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedRow(null);
  };

  const handleDialogConfirm = () => {
    setOpenDialog(false);
    setSelectedRow(null);
    const data={
      "id": selectedRow
    }
    handleDeleta(data);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div className='p-16'>
      {!loadData
      ?
      <div><b>Loading Data...</b></div>
      :
      <>
        <h4 style={{textAlign:"center", paddingBottom:'16px'}}>Welcome to Data Operations in React without DB, Server</h4>
        <div style={{paddingBottom:'16px'}}>
          <Link to="/data-operations-without-database/new" className="primary-button">Add New Record</Link>
        </div>
        <div style={{overflowX:'auto'}}>
          <table className='table'>
            <thead>
              <tr>
                {headerData.map((header, index) => (
                  index === headerData.length-1
                  ?
                    <>                      
                      <th key={index}>{header}</th>
                      <th key={index+1}>Action</th>
                    </>
                  :
                    <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fullData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {headerData.map((header, index) => (
                    index === 0
                    ?
                      <td key={index}><Link to={`/data-operations-without-database/edit/${rowIndex}`} style={{textDecoration:'underline'}}>{row[header]}</Link></td>
                    :
                    index === Object.keys(row).length-1
                    ?
                      <>                      
                        <td key={index}>{row[header]}</td>
                        <td key={index+1}><button className="delete-button" onClick={(e)=>{handleDeleteClick(rowIndex)}}>Delete</button></td>
                      </>
                    :
                      <td key={index}>{row[header]}</td>
                      
              
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Routes>
          <Route path="/new" element={<ExcelOperationsForm handleSubmitData={(value)=>handleData(value)}/>}></Route>
          <Route path="/edit/:userId" element={<ExcelOperationsForm handleEditData={(index,value)=>handleEditData(index,value)} handleInputData={fullData}/>}></Route>
        </Routes>
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this row?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary" variant='outlined'>
              Cancel
            </Button>
            <Button onClick={handleDialogConfirm} color="error" variant='contained' autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </>
      }
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ExcelOperations;