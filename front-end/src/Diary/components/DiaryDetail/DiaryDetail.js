import { Container, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router";
import React, { useEffect } from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import "./DiaryDetail.css"

export default function DiaryDetail(props) {

    const { date } = useParams();
    const [isEditing, setIsEditing] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [unSaveValue, setUnSaveValue] = React.useState("");

    const apiUrl = "http://localhost:9000/Details/" + date;

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
        <Button className="button1" href="/Diary">
            BACK
        </Button>
        <Container sx={{ 
            backgroundColor: '#FFFAF0',
            padding:'10px',
            marginTop:'20px',
            height:'450px'
        }}>
            <TextField
                label="HOW IS YOUR DAY?"
                variant="outlined"
                multiline={true}
                maxRows={10}
                defaultValue={value}
                value={unSaveValue}
                fullWidth={true}
                style={{
                    marginTop:'auto'
                }}
                onChange={handleEditing}
            />
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
            <Button variant='contained' href="/Diary"
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