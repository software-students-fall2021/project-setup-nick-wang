import { Header, Form, Segment, Grid, Button } from "semantic-ui-react"
import { PieChart } from "react-minimal-pie-chart"
import React, { useEffect, useState } from "react";
import axios from "axios";

function color(type) {
    if(type == 'housing') return 'orange';
    else if(type == 'transportation') return 'green';
    else if(type == 'food') return 'blue';
    else if(type == 'health') return 'violet';
    else if(type == 'utilities') return 'pink';
    else if(type == 'miscellaneous') return 'brown';
    else return 'yellow';
};

function Summary(props){
    const jwtToken = localStorage.getItem("token");

    const [data, setData] = useState([])
    const [limit, setLimit] = useState(0)
    const [Spending, setSpending] = useState(0)

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_BACKEND}/users/secret`, {
            headers: { authorization: jwtToken }, // pass the token, if any, to the server
        })
        .then((res) => {
            
            async function fetchData() {
                const result = await axios("http://localhost:9000/get-transac-data/" + res.data.username)
                setData(result.data)
              
                const result1 = await axios('http://localhost:9000/get-monthly-limit/' + res.data.username)
                setLimit(result1.data.monthlyLimit)

                const result2 = await axios('http://localhost:9000/get-monthly-spending/' + res.data.username)
                setSpending(result2.data.monthlySpending)
            }
            fetchData()
        })
        .catch((err) => {
            console.log(
            "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
            )
        })

    }, [])

    const handleSubmit = async e => {
        e.preventDefault();
        
        try {
            axios
            .get(`${process.env.REACT_APP_BACKEND}/users/secret`, {
              headers: { authorization: jwtToken }, // pass the token, if any, to the server
            })
            .then((res) => {
                const requestData = {
                    username: res.data.username,
                    monthlyLimit: e.target.amount.value
                }
                
                const response = axios.put(
                    "http://localhost:9000/set-monthly-budget",
                    requestData
                )
                
                    
                response.then((newVal) => {setLimit(newVal.data)})
            })
            .catch((err) => {
                console.log(
                  "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
                )
            })

        } catch (err) {
          // throw an error
          throw new Error(err)
        }
    }

    return (
        <Segment>
            <Header as='h1'>Your Spending Summary</Header>
            
            <Grid stackable verticalAlign='middle'>
                <Grid.Row centered columns={1}>
                    <Grid.Column>
                    <Form onSubmit={handleSubmit}>
                            <Form.Input type="number" name="amount" step="1" placeholder="Set Monthly Budget"></Form.Input>
                            <Button type="submit" content="Submit"/>
                        </Form>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row centered columns={2}>
                    <Grid.Column>
                        <PieChart
                        radius="40"
                        data={data.map(item => ({
                        title: item._id,
                        value: item.totalAmount,
                        color: color(item._id),
                        }))}
                        //label={({ dataEntry }) => dataEntry.title}
                        labelStyle={{
                        fontSize: "5px",
                        fontFamily: "Arial",
                        fill: "black",
                        }}
                        labelPosition={112}
                        />
                    </Grid.Column>

                    <Grid.Column>
                        <PieChart
                        radius="40"
                        data={[{ value: Spending, key: 1, color: "blue" }]}
                        startAngle={270}
                        reveal={ Spending/limit * 100}
                        lineWidth={30}
                        background="#c5d3eb"
                        lengthAngle={360}
                        rounded
                        animate
                        label={({ dataEntry }) => '$' + dataEntry.value }
                        labelStyle={{
                            fontSize: "10px",
                            fontFamily: "Impact",
                            fill: "black",
                        }}
                        labelPosition={0}
                        />
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        </Segment>
    )
}

export default Summary;