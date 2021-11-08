import React, { useEffect, useState } from "react"
import { PieChart } from "react-minimal-pie-chart"
import { Link } from "react-router-dom"
import Transaction from './components/transactions/Transaction'
import "./AccountBookMain.css"
import axios from "axios"
import { useHistory } from "react-router-dom"
import Footer from "./components/footer/footer"

function AccountBookMain() {
  const [data, setData] = useState([])
  const history = useHistory()

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        //"https://my.api.mockaroo.com/test2.json?key=9c8bd880"
        // "https://my.api.mockaroo.com/users.json?key=157fcab0"
        "http://localhost:9000/static-file"
      )

      setData(result.data)
    }
    fetchData()
  }, [])

  // constant to represent the status of submitting the form
  const [statusSubmit, setStatusSubmit] = useState(false)
  const [statusSubmit2, setStatusSubmit2] = useState(false)

  const [statusAdd, setStatusAdd] = useState({})

  const handleSubmitSearch = async e => {
    // prevent html form from submiting and reloading
    e.preventDefault()

    setStatusSubmit(true)
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
      setStatusAdd(response.data)

      //setStatusSubmit(false)
    } catch (err) {
      // throw an error
      throw new Error(err)
    }
  }

  const [statusSearch, setStatusSearch] = useState({})

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
      setStatusSearch(response.data)
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
            placeholder="Search an transaction"
          ></input>
          {statusSubmit && 
            <p>There is your result:</p>
          }
        </div>
      </form>
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
            radius="20"
            data={data.map(item => ({
              title: item.type,
              value: item.amount,
              color: item.color,
            }))}
            label={({ dataEntry }) => dataEntry.title}
            labelStyle={{
              fontSize: "6px",
              fontFamily: "Impact",
              fill: "grey",
            }}
            labelPosition={112}
          />

          <PieChart
            radius="35"
            data={[{ value: 100, key: 1, color: "green" }]}
            startAngle={270}
            reveal={50}
            lineWidth={30}
            background="grey"
            lengthAngle={360}
            rounded
            animate
            label={({ dataEntry }) => dataEntry.value}
            labelStyle={{
              fontSize: "10px",
              fontFamily: "Impact",
              fill: "grey",
            }}
            labelPosition={0}
          />
        </div>
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
