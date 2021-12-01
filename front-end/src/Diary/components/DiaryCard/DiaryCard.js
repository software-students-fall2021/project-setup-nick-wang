import React, { useEffect } from "react";
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import { Typography } from '@mui/material';
import axios from "axios";

export default function DiaryCards(props){

    const [content, setContent] = React.useState("");
    const completeDate = "" + props.month + "-" + props.date + "-" + props.year;

    const apiUrl = "http://localhost:9000/Details/" + completeDate;

    useEffect(() => {
        axios.get(apiUrl)
        .then((response) => {setContent(response.data[0].content)})
    },[]);

    return(
        <Card
         fullWidth={true}
         sx={{
             backgroundColor:'#FFFAF0',
             width:'250px',
             height: '250px',
             boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
             transition: '0.3s',
             marginRight: '20px',
             marginLeft: '20px',
             marginTop: '20px',
         }}
        >
            <CardActionArea href={"/Detail/" + completeDate}>
                <Typography
                 sx={{
                  fontSize:'larger',
                  textAlign: 'center',
                  paddingTop:'10px',
                  width:'250px',
                  height: '30px',
                  fontWeight:'bold',
                  color:'black'
                 }}>
                    {props.month}/{props.date}
                </Typography>
                <Typography sx={{margin:'20px', fontWeight:'bold', fontSize:'larger', height:'220px'}} paragraph={true}>
                    {content}
                </Typography>
            </CardActionArea>
        </Card>
    )
}