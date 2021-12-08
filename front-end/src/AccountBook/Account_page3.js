import React, { useState, useEffect } from "react";
import "./Account_page2.css";
import { render } from 'react-dom';
import { useParams } from "react-router";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { Header, Form, Segment, Grid, Divider, Button, FormGroup } from "semantic-ui-react"

const Footer = () => (
  <div className="footer">
    <p>LifeNote2021</p>
  </div>
);

function App() {
  const [data, setData] = useState([]);
  const history = useNavigate();

  const { type } = useParams();
  var url2;
  const url = "/Transaction_data/" + type + "?username=";
  const apiUrl = "/save_transaction_data";
  const jwtToken = localStorage.getItem("token");

  var username_id;
  useEffect(() => {
    axios
         .get(`/users/secret`, {
             headers: { authorization: jwtToken }, // pass the token, if any, to the server
         })
         .then((res) => {
            username_id = res.data.username;
            //url2 = "http://localhost:9000/delete_transaction/"+username_id;
            const url = "/Transaction_data/" + type + "?username=" + username_id; 
            console.log(1);
             async function fetchData() {
                 const result = await axios(url)
                 console.log(url);
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


  const handleDelete = async e => {
    // prevent html form from submiting and reloading
    e.preventDefault()

    try {
      // send a post request to the server
      const requestData = {
          name : e.target.name.value,
      }
      const response = await axios.post(
        "/delete_transaction",
        requestData
      )
      const jwtToken = localStorage.getItem("token");
      axios
         .get(`/users/secret`, {
           headers: { authorization: jwtToken }, // pass the token, if any, to the server
         })
      console.log(jwtToken)
      //console.log(response.data)
      //console.log("new search made")
    
    } catch (err) {
      // throw an error
      throw new Error(err)
    }
  }

  const handleDone = (e) =>{
    console.log(data)
    axios.put(apiUrl, data)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  const getSelectedRowData = (e) => {
    let selectedNodes = this.gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map(node => node.data);
    alert(`Selected Nodes:\n${JSON.stringify(selectedData)}`);
    return selectedData;
  };

  //const [statusSubmit, setStatusSubmit] = useState(false)
    //const [statusAdd, setStatusAdd] = useState({})

    const handleSubmitDelete = async e => {
      // prevent html form from submiting and reloading
      e.preventDefault()
      axios
         .get(`/users/secret`, {
             headers: { authorization: jwtToken }, // pass the token, if any, to the server
         })
         .then((res) => {
            username_id = res.data.username;
            const data = {
              username: username_id,
              name: e.target.name.value,
            }
            const response = axios.post('/delete_transaction',
              {data}
            )
            var url3 =  "/Transaction_data/" + type + "?username=" +username_id;
            async function fetchData() {
              const result = await axios(url3)
              setData(result.data)
          }
          fetchData()
          console.log(data);
            /*
            .then(function (response) {
              if (response.data.redirect == 'http://localhost:3000/account_book') {
                  window.location = "http://localhost:3000/account_book"
              } else if (response.data.redirect == 'http://localhost:3000/account_book'){
                  window.location = "http://localhost:3000/account_book"
              }
          })
            */
         })
         
  

        // // send a post request to the server
        // const requestData = {
        //   trscName: e.target.trscName.value,
        //   trscAmount: e.target.trscAmount.value,
        //   trscType: e.target.trscType.value,
        // }
        // const response = await axios.post(
        //   "http://localhost:9000/post-add",
        //   requestData
        //   )
          
          // console.log(response.data)
          // setStatusAdd(response.data)
          // setStatusSubmit(true)

       
      
    }

	return (
    
    <div >
      {/* Change the href to home link */}
      <a href="homepage/">
        {/* Change the image src to logo */}
        <img src="logo01.png" className = "center"/>
      </a>
      <div>
        <h></h>
        <h1>  Transaction of {type}</h1>
        <Segment>
          <Button onClick={() => history(-1)}>Go Back</Button>
          <Button style ={{float: 'right'}}onClick={(handleDone)}>Save</Button>
        </Segment>
      </div>
      
      <div>
        <Segment textAlign='center'>
          <Grid.Column>
            <Form text-align="center" onSubmit={handleSubmitDelete}>
              <Form.Input type="text" 
                id = "name" 
                name="name"
                placeholder="Name of transation">
              </Form.Input>
            <Button type="submit" content="Delete"/>
            </Form>
          </Grid.Column>
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
                  rowSelection="single" rowData={data} >
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