import { Header, Form } from "semantic-ui-react"
import React, { useState } from "react";
import axios from "axios";
import Transaction from '../transactions/Transaction'


function Search(props){
    const [statusSubmit, setStatusSubmit] = useState(false)
    const [statusSearch, setStatusSearch] = useState({})

    const handleSubmitSearch = async e => {
        // prevent html form from submiting and reloading
        e.preventDefault()
    
        try {

          // send a post request to the server
          const requestData = {
              search : e.target.search.value,
          }
          const response = await axios.post(
            "/post-search",
            requestData
          ) 
    
          console.log(response.data)
          console.log("new search made")
          
    
          setStatusSearch(response.data)
          setStatusSubmit(true)
    
        } catch (err) {
          // throw an error
          throw new Error(err)
        }
      }

    return(
        <>
            <Header>Search a transaction</Header>
            
            <Form onSubmit={handleSubmitSearch}>

            <Form.Input
                type="text"
                id="search"
                name="search"
                placeholder="Search a transaction"
            ></Form.Input>
            <Form.Button type="submit" name="submit" content="Search"></Form.Button>

            {statusSubmit &&
                <p>There is your result:</p>}
            {statusSubmit &&
                <section className="">
                    {statusSearch.map(item => (
                        <Transaction key={item.id} details={item} />
                    ))}
                </section>}
            </Form>
            
            <div className="output"></div>
        </>
    )
}

export default Search;