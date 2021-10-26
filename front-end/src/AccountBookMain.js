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
                "https://my.api.mockaroo.com/users.json?key=157fcab0"
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
                <input className="searchBar" type="text" id="search" name="search" placeholder="Search"></input>   
                </div>
            </form>

            <form action="#">
                <div className="add">
                <input className="addBar" type="text" id="search" name="search" placeholder="Add a transaction"></input>
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
            
            <div className="pieChart">
                <svg width="100%" height="100%">
                    <PieChart
                        data={[
                            { title: 'One', value: 10, color: '#E38627' },
                            { title: 'Two', value: 15, color: '#C13C37' },
                            { title: 'Three', value: 20, color: '#6A2135' },
                        ]}
                    />
                </svg>
            </div>

            <div className="progressBar">
                <svg width="100%" height="50">
                    <rect width="100%" height="100%" stroke="black" stroke-width="2" ry="10" rx="10" fill="grey"  />
                    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="black"> Monthly Budget</text>
                </svg>                    
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