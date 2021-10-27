//import React, { useState, useEffect } from "react";
import "./Transaction.css"
function Transaction(props){
    return (
        <article className="transaction">
            <div className="name">{props.details.name}</div>
            <div className="date">{props.details.date}</div>
            <div className="amount">{"$"+props.details.amount}</div>
            <div className="trscType">{props.details.type}</div>
        </article>
    )
}

export default Transaction;