import React from "react"
import { Link } from "react-router-dom";
//import Button from "@mui/material/Button";
import "./AccountBookMain.css"

function AccountBookMain(){
    return (
        <body className="body">
            <header className="header">
                <h1>LifeNote</h1>
            </header>
            
            <button className="backButton">Back</button>

            <form action="#">
                <div className="search" >
                <input className="searchBar" type="text" id="search" name="search" placeholder="Search"></input>   
                </div>
            </form>

            <form action="#">
                <div className="add">
                <input className="addBar" type="text" id="search" name="search" placeholder="Add transaction"></input>
                </div>
            </form>

            <div className="transactions">
                <p className="">Transaction 1</p>
                <p>Transaction 2</p>
                <p>Transaction 3</p>
                <p>Transaction 4</p>
                <p>Transaction 5</p>
                <Link className="moreTranscations" to="">More Transactions</Link>
            </div>
            
            <div className="allTypes">
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