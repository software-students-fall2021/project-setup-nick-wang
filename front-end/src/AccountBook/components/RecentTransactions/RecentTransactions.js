import React, { useEffect, useState } from "react";
import axios from "axios";
import Transaction from "../transactions/Transaction";
import { Link } from "react-router-dom";
import { Segment } from "semantic-ui-react";


function RecentTransactions(props){
    //const tokenState = props.tokenState;
    //console.log(`Token State: ${tokenState}`);
    // const { tokenState, setTokenState } = useContext(TokenContext);
    const jwtToken = localStorage.getItem("token");
    console.log(`JWT token for recent transactions: ${jwtToken}`); // debugging

    // use to store user info
    const [data, setData] = useState([])
    
    useEffect(() => {
        // get user name
    axios
      .get(`/users/secret`, {
        headers: { authorization: jwtToken }, // pass the token, if any, to the server
      })
      .then((res) => {
        console.log(res.data);
        async function fetchData() {
            const result = await axios.post("/recent-trsc", res.data)
            setData(result.data)
        }
        fetchData()
        //console.log("recent transaction username: " +response.username)
      })
      .catch((err) => {
        console.log(
          "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
        )
      })
      

        // async function fetchData() {
        //     console.log("user: "+user);
        //     const result = await axios("http://localhost:9000/recent-trsc", user)
        //     setData(result.data)
        // }
        // fetchData()
    }, [props.status])

    return(
        <Segment textAlign='center'>
        <>
        <h2>Recent Transactions</h2>
        
        <section className="">
            {data.map(item => (
                <Transaction key={item.id} details={item} />
            ))}

        </section>
        </>
        
        <Link className="moreTranscations" to="/account_book/overview">
            More Transactions
        </Link>
        </Segment>
    )
}

export default RecentTransactions;