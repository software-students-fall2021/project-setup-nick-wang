import React, { useEffect, useState } from "react";
import { PieChart } from 'react-minimal-pie-chart';
import { Link } from "react-router-dom";
import Transaction from "./Transaction";
import "./AccountBookMain.css";
import axios from "axios";


function AccountBookMain(){
    const [data, setData] = useState([]);

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
            <header className="header">
                <h1>Account Book</h1>
            </header>
            
            <button className="backButton">Back</button>

            <form action="#">
                <div className="search" >
                    <input className="searchBar" type="text" id="search" name="search" placeholder="Search an transaction"></input>   
                </div>
            </form>

            <form action="#">
                <div className="add">
                    <h2>Add a transaction</h2>
                    <input className="addBar" type="text" id="trscName" name="trscName" placeholder="Transaction's name"></input>
                    <input className="addBar" type="number" id="trscAmount" name="trscAmount" step=".01" placeholder="$ amount"></input>
                    <input className="addBar" type="text" id="trscType" name="trscType" placeholder="type"></input>
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

                <Link className="moreTranscations" to="">More Transactions</Link>
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
                    <Link className="type" to="">Type 1</Link>
                    <Link className="type" to="">Type 2</Link>
                </div>

                <div className="typeRow">
                    <Link className="type" to="">Type 3</Link>
                    <Link className="type" to="">Type 4</Link>
                </div>

                <div className="typeRow">
                    <Link className="type" to="">Type 5</Link>
                    <Link className="type" to="">Type 6</Link>
                </div>
            </div>
            <footer className="footer">
                <p>&copy;2021 LifeNote Team</p>  
            </footer>     
        </body>
    )
}

export default AccountBookMain;