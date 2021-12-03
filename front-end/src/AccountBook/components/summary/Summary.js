import { Header, Form, Segment, Grid, Divider, Button, FormGroup } from "semantic-ui-react"
import { PieChart } from "react-minimal-pie-chart"
import React, { useEffect, useState } from "react";
import axios from "axios";

function Summary(props){
    const [limit, setLimit] = useState([])
    const [data, setData] = useState([])
    
    useEffect(() => {
        async function fetchData() {
            const result = await axios("http://localhost:9000/recent-trsc")
            setData(result.data)
            
            const budget = await axios('http://localhost:9000/get-monthly-budget')
            setLimit(budget.data)
        }
        fetchData()
    }, [])

    return (
        <Segment>
            <Header textAlign='center'>Your Spending Summary</Header>
            
            <Grid stackable verticalAlign='middle'>
                <Grid.Row centered columns={2}>
                    <Grid.Column>
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
                    </Grid.Column>

                    <Grid.Column>
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
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row centered columns={1}>
                    <Grid.Column>
                        <Form action="http://localhost:9000/set-monthly-budget" method="put">
                            <Form.Input type="number" name="amount" step="1" placeholder="Monthly Budget"></Form.Input>
                            <Button type="submit" content="Submit"/>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
}

export default Summary;