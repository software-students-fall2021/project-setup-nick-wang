import React, { useState, useEffect } from "react";
import "./Account_page2.css";
import { render } from 'react-dom';
import { useParams } from "react-router";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Footer = () => (
  <div className="footer">
    <p>LifeNote2021</p>
  </div>
);

function App() {
  const [data, setData] = useState([]);
  const history = useNavigate();

  const { type } = useParams();
  const url = "http://localhost:9000/Transaction_data/" + type;
  const apiUrl = "http://localhost:9000/save_transaction_data";

  useEffect(() => {
    // a nested function that fetches the data
    async function fetchData() {
      // axios is a 3rd-party module for fetching data from servers
      const result = await axios(
        // retrieving some mock data about animals for sale
        url
      );
      
      // set the state variable
      // this will cause a re-render of this component
      setData(result.data);
    }

    // fetch the data!
    fetchData();
    
    // the blank array below causes this callback to be executed only once on component load
  }, []);


  const handleDone = (e) =>{
    console.log(data)
    axios.put(apiUrl, data)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

	return (
    
    <div>
      {/* Change the href to home link */}
      <a href="homepage/">
        {/* Change the image src to logo */}
        <img src="logo01.png" className = "center"/>
      </a>
      <div>
      <h></h>
      <h1>  Transaction of {type}</h1>
       <button onClick={() => history(-1)}>Go Back</button>
      </div>
      <div>
        <button onClick={(handleDone)}>Save</button>
      </div>
        <div style={{ width: '100%', height: '70%' }}>
          <div className="container">
            <div id="left"></div>
            <div id="center">
              <div
                id="myGrid"
                style={{
                  height: '100%',
                  width: '100%',
                }}
                className="ag-theme-material"
              >
                
                <AgGridReact
                  rowData={data} rowSelection={"single"}>
                  <AgGridColumn field="name" sortable={ true } filter = {true} editable = {true} ></AgGridColumn>
                  <AgGridColumn field="amount"  sortable={ true } filter = {true} editable = {true} ></AgGridColumn>
                  <AgGridColumn field="date" sortable={ true } filter = {true} editable = {true} ></AgGridColumn>
              </AgGridReact>
              </div>
            </div>
            <div id="right"></div>
          </div>
        </div>
        <Footer/>
      </div>
      
);
}

export default App;