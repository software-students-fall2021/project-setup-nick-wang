import { Header, Form } from "semantic-ui-react"
import React, { useState } from "react";
import axios from "axios";

function Add(props){
    const [statusSubmit, setStatusSubmit] = useState(false)
    const [statusAdd, setStatusAdd] = useState({})

    const handleSubmitAdd = async e => {
      // prevent html form from submiting and reloading
      e.preventDefault()
      
      try {
        // send a post request to the server
        const requestData = {
          trscName: e.target.trscName.value,
          trscAmount: e.target.trscAmount.value,
          trscType: e.target.trscType.value,
        }
        const response = await axios.post(
          "http://localhost:9000/post-add",
          requestData
          )
          
          console.log(response.data)
          console.log(statusAdd)
          setStatusAdd(response.data)
          console.log(statusAdd)
          setStatusSubmit(true)

      } catch (err) {
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
          ></Form.Input>
        
        <Form.Input
          type="number"
          id="trscAmount"
          name="trscAmount"
          step=".01"
          placeholder="$ Amount"
          ></Form.Input>
        
        <Form.Input
          type="text"
          id="trscType"
          name="trscType"
          placeholder="Type"
        ></Form.Input>
        
        <Form.Button type="submit" name="submit" content="Add"></Form.Button>
        
        {statusSubmit && 
          <p>Your transaction is successfully added</p>
        }
    </Form>
    )
}

export default Add;