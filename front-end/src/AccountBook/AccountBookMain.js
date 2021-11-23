import React, { useEffect, useState } from "react"
import { PieChart } from "react-minimal-pie-chart"
import { Link } from "react-router-dom"
import Transaction from './components/transactions/Transaction'
import "./AccountBookMain.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Footer from "./components/footer/footer"

function AccountBookMain() {
  const [data, setData] = useState([])
  const [limit, setLimit] = useState([])
  const history = useNavigate()

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        //"https://my.api.mockaroo.com/test2.json?key=9c8bd880"
        // "https://my.api.mockaroo.com/users.json?key=157fcab0"
        "http://localhost:9000/recent-trsc"
      )

      setData(result.data)

      const budget = await axios('http://localhost:9000/get-monthly-budget')

      setLimit(budget.data)
    }
    fetchData()
  }, [])

  // constant to represent the status of submitting the form
  const [statusSubmit, setStatusSubmit] = useState(false)
  const [statusSubmit2, setStatusSubmit2] = useState(false)

  const [statusSearch, setStatusSearch] = useState({})

  const handleSubmitSearch = async e => {
    // prevent html form from submiting and reloading
    e.preventDefault()

    try {
      // send a post request to the server
      const requestData = {
          search : e.target.search.value,
      }
      const response = await axios.post(
        "http://localhost:9000/post-search",
        requestData
      )

      console.log(response.data)
      console.log("new search made")
      

      setStatusSearch(response.data)
      setStatusSubmit(true)

    } catch (err) {
      // throw an error
      throw new Error(err)
    }
  }

  const [statusAdd, setStatusAdd] = useState({})

  const handleSubmitAdd = async e => {
    // prevent html form from submiting and reloading
    e.preventDefault()
    setStatusSubmit2(true)
    try {
      // send a post request to the server
      const requestData = {
        trscName: e.target.trscName.value,
        trscAmount: e.target.trscAmount.value,
        trscType: e.target.trscType.value,
      }
      const response = await axios.post(
        "http://localhost:9000/post-add",
        requestData
      )

      console.log(response.data)
      setStatusAdd(response.data)
    } catch (err) {
      // throw an error
      throw new Error(err)
    }
  }

  return (
    <body className="body">
      <h1></h1>
      <h1></h1>
      <header className="header">
        <h1>Account Book</h1>
      </header>

      <form onSubmit={handleSubmitSearch}>
        <div className="search">
          <input
            className="searchBar"
            type="text"
            id="search"
            name="search"
            placeholder="Search a transaction"
          ></input>
          <p></p>
          <input type="submit" name="submit" value="Search"></input>
          
          {statusSubmit && 
            <p>There is your result:</p>
          }
          {statusSubmit &&
            <section className="">
            {statusSearch.map(item => (
              <Transaction key={item.id} details={item} />
            ))}
            </section>
          }
        </div>
      </form>
      
      <div className="output"></div>

      <form onSubmit={handleSubmitAdd}>
        <div className="add">
          <h2>Add a transaction</h2>
          <input
            className="addBar"
            type="text"
            id="trscName"
            name="trscName"
            placeholder="Description"
          ></input>
          <input
            className="addBar"
            type="number"
            id="trscAmount"
            name="trscAmount"
            step=".01"
            placeholder="$ Amount"
          ></input>
          <input
            className="addBar"
            type="text"
            id="trscType"
            name="trscType"
            placeholder="Type"
          ></input>
          <input type="submit" name="submit" value="Add"></input>
          {statusSubmit2 && 
            <p>Your transaction is successfully added</p>
          }
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

        <Link className="moreTranscations" to="/account_book/overview">
          More Transactions
        </Link>
      </div>

      <div className="summary">
        <h2 className="spendingSumHead">Your Spending Summary</h2>
        
        <div className="pieChart">
          <PieChart
            radius="30"
            data={data.map(item => ({
              title: item.type,
              value: item.amount,
              color: '#' + Math.floor(Math.random()*16777215).toString(16),
            }))}
            label={({ dataEntry }) => dataEntry.title}
            labelStyle={{
              fontSize: "5px",
              fontFamily: "Arial",
              fill: "black",
            }}
            labelPosition={50}
          />

          <PieChart
            radius="35"
            data={[{ value: limit.monthlySpending, key: 1, color: "blue" }]}
            startAngle={270}
            reveal={ limit.monthlySpending/limit.monthlyLimit * 100}
            lineWidth={30}
            background="grey"
            lengthAngle={360}
            rounded
            animate
            label={({ dataEntry }) => '$' + dataEntry.value}
            labelStyle={{
              fontSize: "10px",
              fontFamily: "Impact",
              fill: "grey",
            }}
            labelPosition={0}
          />
        </div>

          <form text-align="center" action="http://localhost:9000/set-monthly-budget" method="post">
            <input type="number" name="amount" step="1" placeholder="Monthly Budget"></input>
            <input type="submit" value="Submit"/>
          </form>
      </div>

      <div className="allTypes">
        <h2>Categories</h2>
        <div className="typeRow">
          <Link className="type" to="/account_book/category">
            Type 1
          </Link>
          <Link className="type" to="/account_book/category">
            Type 2
          </Link>
        </div>

        <div className="typeRow">
          <Link className="type" to="/account_book/category">
            Type 3
          </Link>
          <Link className="type" to="/account_book/category">
            Type 4
          </Link>
        </div>

        <div className="typeRow">
          <Link className="type" to="/account_book/category">
            Type 5
          </Link>
          <Link className="type" to="/account_book/category">
            Type 6
          </Link>
        </div>
      </div>

      <footer className="footerABM">
        <p>&copy;2021 LifeNote Team</p>
      </footer>
    </body>
  )
}

export default AccountBookMain
