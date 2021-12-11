import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import { Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import axios from "axios";
import './DiaryCard.css';

export default function DiaryCards(props){

    const [content, setContent] = useState("");
    const [username, setUsername] = useState(props.username);

    const completeDate = props.username + "/" +  props.month + "-" + props.date + "-" + props.year;
    const apiUrl = "/Details/" + completeDate;

    useEffect(() => {
        setUsername(props.username);
        axios.get(apiUrl)
        .then((response) => {setContent(response.data[0].content)})
    },[props.username, props.month]);
    
    return(
        <Card className="DiaryCard" fullWidth={true}>
            <CardActionArea className="CardAction" href={"/Detail/" + completeDate}>
                <CardContent>
                    <Typography gutterBottom color="black" variant="h5" component="div">
                        {props.month}/{props.date}
                    </Typography>
                    <Typography className="Paragraph" variant="body2" paragraph={true}>
                        {content}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}