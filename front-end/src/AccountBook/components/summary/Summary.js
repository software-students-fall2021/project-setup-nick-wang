import { Header, Form, Segment, Grid, Button } from "semantic-ui-react"
import { PieChart } from "react-minimal-pie-chart"
import Categories from "../categories/Categories";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Summary(props){
    const jwtToken = localStorage.getItem("token");

    const [data, setData] = useState([{
        _id: "It's currently empty",
        totalAmount: 0.01,
      }])
    const [limit, setLimit] = useState(0)
    const [Spending, setSpending] = useState(0)

    useEffect(() => {
        axios
        .get(`/users/secret`, {
            headers: { authorization: jwtToken }, // pass the token, if any, to the server
        })
        .then((res) => {
            
            async function fetchData() {
                const result = await axios("/get-transac-data/" + res.data.username)
                setData(result.data)
              
                const result1 = await axios('/get-monthly-limit/' + res.data.username)
                setLimit(result1.data.monthlyLimit)

                const result2 = await axios('/get-monthly-spending/' + res.data.username)
                setSpending(result2.data.monthlySpending)
            }
            fetchData()
        })
        .catch((err) => {
            console.log(
            "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
            )
        })

    }, [props.status])

    const TypeColor = (type) => {
        if(type == 'housing') return 'orange';
        else if(type == 'transportation') return 'green';
        else if(type == 'food') return 'blue';
        else if(type == 'health') return 'purple';
        else if(type == 'utilities') return 'red';
        else if(type == 'miscellaneous') return 'brown';
        else return 'grey';
    };
    

    const Reveal = () => {
        if(Spending > limit) return 100;
        else return Spending/limit*100;
    }

    const RevealColor = () => {
        if(Spending > limit) return "red";
        else return "blue";
    };



    const handleSubmit = async e => {
        e.preventDefault();
        
        try {
            axios
            .get(`/users/secret`, {
              headers: { authorization: jwtToken }, // pass the token, if any, to the server
            })
            .then((res) => {
                const requestData = {
                    username: res.data.username,
                    monthlyLimit: e.target.amount.value
                }
                
                const response = axios.put(
                    '/set-monthly-budget',
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

                <Grid.Row centered columns={2}>
                    <Grid.Column>
                        <PieChart
                        radius="30"
                        data={[{ value: Spending, key: 1, color: RevealColor() }]}
                        startAngle={270}
                        reveal={ Reveal()}
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
                        
                    <Grid.Column>
                        <PieChart
                        radius="30"
                        data={data.map(item => ({
                            title: item._id,
                            value: item.totalAmount,
                            color: TypeColor(item._id)
                        }))}
                        />
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row centered columns={2}>
                    <Grid.Column verticalAlign='middle'>
                        <Form onSubmit={handleSubmit}>
                            <Header>Total Spending in current month: ${Spending} <br/> Your monthly budget: ${limit}</Header>
                            
                                <Form.Input 
                                    required
                                    type="number" 
                                    name="amount" 
                                    step="1" 
                                    placeholder="Set Monthly Budget">
                                </Form.Input>

                                <Button type="submit" content="Submit"/>

                        </Form>
                    </Grid.Column>

                    <Grid.Column verticalAlign='middle'>
                        <Header>Categories of your transactions:</Header>

                        {data.map(item =>(
                            <Categories type={item._id} color={TypeColor(item._id)}/>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
}

export default Summary;