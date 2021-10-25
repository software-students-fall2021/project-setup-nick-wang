import React, { useState, useEffect } from "react";
import "./Account_page2.css";
import { render } from 'react-dom';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

const Transaction = (props) => {
	return (
    <article>
      <section>
        <h1>{props.T_Date}</h1> <p>{props.T_amount}</p>
      </section>
      <section>
       <p>{props.T_Name}</p>
      </section>
    </article>
  )
}

function App() {
  const rowData = [
    {Name: "Fruits", Date: "10.04.2021", Amount: 35},
    {Name: "Gas", Date: "10.05.2021", Amount: 200},
    {Name: "Meat", Date: "10.03.2021", Amount: 35}
  ];
	return (
    <div>
      <div>
        <h> Header </h>
      </div>
      <div>
        <h> Most Recent Transaction</h>
      </div>
      <div className="ag-theme-material" style={{height: 400, width: 600}}>
          <AgGridReact
              rowData={rowData}>
              <AgGridColumn field="Name" sortable={ true } filter={ true } editable={true}></AgGridColumn>
              <AgGridColumn field="Date" sortable={ true } filter={ true } editable={true}></AgGridColumn>
              <AgGridColumn field="Amount" sortable={ true } filter={ true } editable={true}></AgGridColumn>
          </AgGridReact>
      </div>
    </div>
);
}

export default App;
