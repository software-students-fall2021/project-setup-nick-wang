import { Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router";
import React, { useEffect } from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import "./DiaryDetail.css"
import Footer from "../Footer/Footer";

export default function DiaryDetail(props) {

    const { username } = useParams();
    const { date } = useParams();
    const [isEditing, setIsEditing] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [unSaveValue, setUnSaveValue] = React.useState("");
    

    const apiUrl = "/Details/" + username + "/" + date;
    const month = date.substring(0, date.indexOf("-"));
    const year = date.substring(date.length, date.length - 4);
    const lastDairies = "/Diary/" + month + "/" + year;
    //console.log(lastDairies);

    useEffect(() => {
        axios.get(apiUrl)
        .then((response) => {setValue(response.data[0].content); setUnSaveValue(response.data[0].content)})
    },[]);

    const allowEdit = () => {
        setIsEditing((b) => !b)
    }

    const handleEditing = (event) => {
        setUnSaveValue(event.target.value);
    }

    const handleDone = (e) =>{
        setValue(unSaveValue);
        const newDiary = {
            username: username,
            date: date,
            content: unSaveValue,
        }
        axios.put(apiUrl, newDiary)
        .then(res => console.log(res))
        .catch(err => console.log(err));
        setIsEditing((b) => !b)
    }

    const handleBack = () =>{
        window.location = lastDairies;
    }

    if(isEditing){
    return (
        <div class="DiaryDetail">
        <Button className="BackButton" variant="contained" onClick={handleBack}>
            BACK
        </Button>
        <Container className="Content" fixed={true}>
            <Box component="form">
                <TextField
                    className="textField"
                    label="HOW IS YOUR DAY?"
                    variant="outlined"
                    multiline={true}
                    maxRows={10}
                    defaultValue={value}
                    value={unSaveValue}
                    fullWidth={true}
                    onChange={handleEditing}
                />
            </Box>
        </Container>
        <Button 
         className="DoneButton"
         onClick={handleDone} 
         variant='contained' >
            Done
        </Button>
        <Footer />
        </div>
    );
    }
    return (
        <div className="DiaryDetail">
            <Button variant='contained' onClick={handleBack}>
                BACK
            </Button>
            <Container className="Content">
                <Typography className="Paragraph" paragraph={true}>
                    {value}
                </Typography>
            </Container>
            <Button 
             className="EditButton"
             onClick={allowEdit} 
             variant='contained'>
                Edit
            </Button>
            <Footer />
        </div>
    )
  }