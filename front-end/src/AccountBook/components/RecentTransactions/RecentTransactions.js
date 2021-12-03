import React, { useEffect, useState } from "react";
import axios from "axios";
import Transaction from "../transactions/Transaction";
import { Link } from "react-router-dom";
import { Segment } from "semantic-ui-react";


function RecentTransactions(props){
    const [data, setData] = useState([])
    
    useEffect(() => {
        async function fetchData() {
            const result = await axios("http://localhost:9000/recent-trsc")
            setData(result.data)
        }
        fetchData()
    }, [])

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