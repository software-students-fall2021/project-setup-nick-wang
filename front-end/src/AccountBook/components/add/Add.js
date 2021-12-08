import { Header, Form } from "semantic-ui-react"
import React, { useState } from "react";
import axios from "axios";

const options = [
  { key: 'h', text: 'Housing', value: 'housing' },
  { key: 't', text: 'Transportation', value: 'transportation' },
  { key: 'f', text: 'Food', value: 'food' },
  { key: 'h', text: 'Health', value: 'health' },
  { key: 'u', text: 'Utilities', value: 'utilities' },
  { key: 'm', text: 'Miscellaneous', value: 'miscellaneous' }
]

function Add(props){
    const [statusSubmit, setStatusSubmit] = useState(false)
    //const [statusAdd, setStatusAdd] = useState({})
    const [state, setState] = useState({trscType: ""})

    const handleOnChange = (e, value) => {
      setState({trscType : value});
     };

    const handleSubmitAdd = async e => {
      // prevent html form from submiting and reloading
      e.preventDefault()
      
      try {
        // add trsc to the certian user
        // by his username
        const jwtToken = localStorage.getItem("token");

        axios
        .get(`/users/secret`, {
          headers: { authorization: jwtToken }, // pass the token, if any, to the server
        })
        .then((res) => {
          console.log(res.data);
          // send a post request to the server

          const requestData = {
            username: res.data.username,

            trscName: e.target.trscName.value,
            trscAmount: e.target.trscAmount.value,
            trscType: state.trscType.value
          }
          const response = axios.post(
            "/post-add",
            requestData
            )
            
            console.log(response.data)
            //setStatusAdd(response.data)
            setStatusSubmit(true)

            props.setStatus(!props.status)
            
        })
        .catch((err) => {
          console.log(
            "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
          )
        })
      }

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

       catch (err) {
        // throw an error
        throw new Error(err)
      }
    }

    return(
    <Form onSubmit={handleSubmitAdd}>
        <Header>Add a transaction</Header>
        
        <Form.Input
          type="text"
          id="trscName"
          name="trscName"
          placeholder="Description"
          required
          ></Form.Input>
        
        <Form.Input
          type="number"
          id="trscAmount"
          name="trscAmount"
          step=".01"
          placeholder="$ Amount"
          required
          ></Form.Input>
        
        <Form.Select
          fluid
          id="trscType"
          name="trscType"
          options={options}
          placeholder="Type"
          onChange={handleOnChange}
          required
        ></Form.Select>
        
        <Form.Button type="submit" name="submit" content="Add"></Form.Button>
        
        {statusSubmit && 
          <p>Your transaction is successfully added</p>
        }
    </Form>
    )
}

export default Add;