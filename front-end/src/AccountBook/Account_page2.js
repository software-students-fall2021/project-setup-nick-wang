import React, { useState, useEffect } from "react";
import "./Account_page2.css";
import { render } from 'react-dom';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Footer from "./components/footer/footer"
import { Header, Form, Segment, Grid, Divider, Button, FormGroup } from "semantic-ui-react"


function App() {
  const [data, setData] = useState([]);
  const history = useNavigate();

  const jwtToken = localStorage.getItem("token");

  useEffect(() => {
    axios
         .get(`/users/secret`, {
             headers: { authorization: jwtToken }, // pass the token, if any, to the server
         })
         .then((res) => {
          const url = '/Transaction_data_overview/' +res.data.username;
          //console.log(res.data.username)
             async function fetchData() {
                 const result = await axios(url)
                 setData(result.data)
             }
             fetchData()
         })
         .catch((err) => {
             console.log(
             "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
             )
         })

    /*
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
    */
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
       <Segment>
          <Button onClick={() => history(-1)}>Go Back</Button>
        </Segment>
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