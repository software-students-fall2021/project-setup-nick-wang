import { Header, Form, Segment, Grid, Button } from "semantic-ui-react"
import { PieChart } from "react-minimal-pie-chart"
import React, { useEffect, useState } from "react";
import axios from "axios";

function color(type) {
    if(type == 'food') return '#E38627';
    if(type == 'housing') return '#C13C37';
    if(type == 'transportation') return '#6A2135';
};

function Summary(props){
    const [data, setData] = useState([])
    const [limit, setLimit] = useState(0)
    const [Spending, setSpending] = useState(0)

    useEffect(() => {
        async function fetchData() {
            const result = await axios("http://localhost:9000/get-transac-data")
            setData(result.data)
              
            const result1 = await axios('http://localhost:9000/get-monthly-limit')
            setLimit(result1.data.monthlyLimit)

            const result2 = await axios('http://localhost:9000/get-monthly-spending')
            setSpending(result2.data.monthlySpending)
        }
        fetchData()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault();
        
        try {
            const requestData = {
                monthlyLimit: e.target.amount.value
            }
            
            const response = await axios.put(
                "http://localhost:9000/set-monthly-budget",
                requestData
            )
                
            setLimit(response.data)
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
                        radius="30"
                        data={data.map(item => ({
                        title: item._id,
                        value: item.totalAmount,
                        color: color(item._id),
                        }))}
                        label={({ dataEntry }) => dataEntry.title}
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
                        radius="35"
                        data={[{ value: Spending, key: 1, color: "blue" }]}
                        startAngle={270}
                        reveal={ Spending/limit * 100}
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
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        </Segment>
    )
}

export default Summary;