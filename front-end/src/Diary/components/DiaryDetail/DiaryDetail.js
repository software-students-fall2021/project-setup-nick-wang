import { Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router";
import React, { useEffect } from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import "./DiaryDetail.css"

export default function DiaryDetail(props) {

    const { username } = useParams();
    const { date } = useParams();
    const [isEditing, setIsEditing] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [unSaveValue, setUnSaveValue] = React.useState("");
    

    const apiUrl = "http://localhost:9000/Details/" + username + "/" + date;
    const month = date.substring(0, date.indexOf("-"));
    const year = date.substring(date.length, date.length - 4);
    const lastDairies = "/Diary/" + month + "/" + year;
    console.log(lastDairies);

    useEffect(() => {
        axios.get(apiUrl)
        .then((response) => {setValue(response.data[0].content)})
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

    if(isEditing){
    return (
        <div className="DiaryDetail">
        <Button className="button1" href={lastDairies}>
            BACK
        </Button>
        <Container sx={{ 
            backgroundColor: '#FFFAF0',
            padding:'10px',
            marginTop:'20px',
            height:'450px'
        }}>
            <Box component="form">
                <TextField
                    label="HOW IS YOUR DAY?"
                    variant="outlined"
                    multiline={true}
                    maxRows={10}
                    defaultValue={value}
                    value={unSaveValue}
                    fullWidth={true}
                    sx={{
                        marginTop:'auto'
                    }}
                    onChange={handleEditing}
                />
            </Box>
        </Container>
        <Button 
         size="larger"
         onClick={handleDone} 
         variant='contained' 
         sx={{
            backgroundColor: 'lightskyblue',
            fontWeight: 'bold',
            marginTop: '20px',
            marginLeft: '91.5%',
            marginRight: '20px',
            size:'larger'
        }}>
            Done
        </Button>
        </div>
    );
    }
    return (
        <div className="DiaryDetail">
            <Button variant='contained' href={lastDairies}
                    sx={{
                        backgroundColor:'lightskyblue',
                        marginTop:'20px',
                        marginLeft:'40px',
                    }}
            >
                BACK
            </Button>
            <Container 
            fixed={true}
            sx={{ 
                backgroundColor: '#FFFAF0',
                height:'450px',
                marginTop:'20px',
                padding:'10px',
            }}>
                <Typography 
                 paragraph={true}
                >
                    {value}
                </Typography>
            </Container>
            <Button 
             onClick={allowEdit} 
             variant='contained' 
             sx={{
                 backgroundColor: 'lightskyblue',
                 fontWeight: 'bold',
                 marginTop: '20px',
                 marginLeft: '91.5%',
                 marginRight: '20px',
                 size:'larger'
            }}>
                Edit
            </Button>
        </div>
    )
  }