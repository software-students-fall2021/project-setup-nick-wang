import React, { useState } from "react"
import { Header, Segment, Grid, Divider } from "semantic-ui-react"
import Summary from "./components/summary/Summary"
import Search from "./components/search/Search"
import Add from "./components/add/Add"
import RecentTransactions from "./components/RecentTransactions/RecentTransactions"
import "./AccountBookMain.css"

function AccountBookMain() {
  const [statusAdd, setStatusAdd] = useState(false)

  return (
    <body>
      <h1/>
      <h1/>
      <Header as='h1'>Account Book</Header>

      <Segment>
        <Grid columns={2} stackable textAlign='center'>
          <Divider vertical>OR</Divider>
          
          <Grid.Row verticalAlign='middle'>
            <Grid.Column><Search/></Grid.Column>
            
            <Grid.Column><Add setStatus={setStatusAdd} status={statusAdd}/></Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <RecentTransactions status={statusAdd}/>

      <Summary status={statusAdd}/>

      <footer className="footerABM">
        <p>&copy;2021 LifeNote Team</p>
      </footer>
    </body>
  )
}

export default AccountBookMain
