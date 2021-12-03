import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Header, Segment, Grid, Divider } from "semantic-ui-react"
import Transaction from './components/transactions/Transaction'
import Summary from "./components/summary/Summary"
import Search from "./components/search/Search"
import Add from "./components/add/Add"
import Categories from "./components/categories/Categories"
import RecentTransactions from "./components/RecentTransactions/RecentTransactions"
import Footer from "./components/footer/footer"
import "./AccountBookMain.css"

function AccountBookMain() {
  return (
    <body>
      <h1></h1>
      <h1></h1>
      <Header as='h1'>Account Book</Header>

      <Segment>
        <Grid columns={2} stackable textAlign='center'>
          <Divider vertical>OR</Divider>
          
          <Grid.Row verticalAlign='middle'>
            <Grid.Column><Search/></Grid.Column>
            
            <Grid.Column><Add/></Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <div className="transactions">
        <RecentTransactions/>
      </div>

      <Summary/>

      <div className="allTypes">
        <Categories/>
      </div>

      <footer className="footerABM">
        <p>&copy;2021 LifeNote Team</p>
      </footer>
    </body>
  )
}

export default AccountBookMain
