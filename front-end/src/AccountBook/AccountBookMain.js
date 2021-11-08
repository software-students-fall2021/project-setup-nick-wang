import React, { useEffect, useState } from "react";
import { PieChart } from 'react-minimal-pie-chart';
import { Link } from "react-router-dom";
import "./AccountBookMain.css";
import axios from "axios";
import {useHistory} from "react-router-dom";
import Transaction from './components/transactions/Transaction'
import Footer from "./components/footer/footer"


function AccountBookMain(){
    const [data, setData] = useState([]);
    const history = useHistory();

    useEffect(() => {
        async function fetchData(){
            const result = await axios(
                "https://my.api.mockaroo.com/test2.json?key=9c8bd880"
                // "https://my.api.mockaroo.com/users.json?key=157fcab0"
            );

            setData(result.data)
        }
        fetchData();
    }, [])

    return (
        <body className="body">
            <h1></h1><h1></h1>
            <header className="header">
                <h1>Account Book</h1>
            </header>
            
            <form action="http://localhost:9000/post-search" method="post">
                <div className="search" >
                    <input className="searchBar" type="text" id="search" name="search" placeholder="Search an transaction"></input>   
                </div>
            </form>

            <form action="http://localhost:9000/post-add" method="post">
                <div className="add">
                    <h2>Add a transaction</h2>
                    <input className="addBar" type="text" id="trscName" name="trscName" placeholder="Description"></input>
                    <input className="addBar" type="number" id="trscAmount" name="trscAmount" step=".01" placeholder="$ Amount"></input>
                    <input className="addBar" type="text" id="trscType" name="trscType" placeholder="Type"></input>
                    <input type="submit" name="submit" value="Add"></input>
                </div>
            </form>

            <div className="transactions">
                <>
                <h2>Recent Transactions</h2>
                <section className="">
                    {data.map(item => (
                    <Transaction key={item.id} details={item} />
                    ))}
                </section>
                </>

                <Link className="moreTranscations" to="/account_book/overview">More Transactions</Link>
            </div>
            
            <div className="summary">
                <h2 className="spendingSumHead">Your Spending Summary</h2>
                <div className="pieChart">

                    <PieChart radius="20"
                        data={data.map(item => (
                            {title: item.type, value: item.amount, color: item.color}
                        ))}
                            
                        label={({ dataEntry }) => dataEntry.title}
                        labelStyle={{
                            fontSize: '6px',
                            fontFamily: 'Impact',
                            fill: 'grey'
                        }}
                        labelPosition={112}
                    />
    
                    <PieChart radius="35"
                        data={[{ value: 100, key: 1, color: 'green' }]}
                        startAngle={270}
                        reveal={50}
                        lineWidth={30}
                        background="grey"
                        lengthAngle={360}
                        rounded
                        animate
                        label={({ dataEntry }) => dataEntry.value}
                        labelStyle={{
                        fontSize: '10px',
                        fontFamily: 'Impact',
                        fill: 'grey',
                        }}
                        labelPosition={0}
                    />
                </div>
            </div>

            <div className="allTypes">
                <h2>Categories</h2>
                <div className="typeRow">
                    <Link className="type" to="/account_book/category">Type 1</Link>
                    <Link className="type" to="/account_book/category">Type 2</Link>
                </div>

                <div className="typeRow">
                    <Link className="type" to="/account_book/category">Type 3</Link>
                    <Link className="type" to="/account_book/category">Type 4</Link>
                </div>

                <div className="typeRow">
                    <Link className="type" to="/account_book/category">Type 5</Link>
                    <Link className="type" to="/account_book/category">Type 6</Link>
                </div>
            </div>
            
            <Footer/>     
        </body>
    )
}

export default AccountBookMain;