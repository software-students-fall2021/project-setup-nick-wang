import React, { useState, useEffect } from "react";
import "./Account_page2.css";
import { render } from 'react-dom';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import {useHistory} from "react-router-dom";
import axios from "axios";
import Footer from "./components/footer/footer"


function App() {
  const [data, setData] = useState([]);
  const history = useHistory();

  const url = 'http://localhost:9000/transaction_data';

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

	return (
    
    <div>
      {/* Change the href to home link */}
      <a href="homepage/">
        {/* Change the image src to logo */}
        <img src="logo01.png" className = "center"/>
      </a>
      <div>
        <h></h>
       <h1> Most Recent Transaction</h1>
       <button onClick={() => history.goBack()}>Go Back</button>
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
                  rowData={data}>
                  <AgGridColumn field="name"  ></AgGridColumn>
                  <AgGridColumn field="amount"   ></AgGridColumn>
                  <AgGridColumn field="date" sortable={ true } ></AgGridColumn>
                  <AgGridColumn field="type"   ></AgGridColumn>
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