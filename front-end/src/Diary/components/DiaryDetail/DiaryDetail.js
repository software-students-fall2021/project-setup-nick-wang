import { Container, Typography } from "@mui/material";
import HomeButton from '../HomeButton/HomeButton'
import React from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";

export default function DiaryDetail(props) {

    const [isEditing, setIsEditing] = React.useState(false);
    const [value, setValue] = React.useState("");

    const allowEdit = () => {
        setIsEditing((b) => !b)
    }

    const handleEdit = (e) =>{
        return (
            setValue(e.target.value)
        )
    }
    if(isEditing){
        return (
            <div className="DiaryDetail">
            <Button variant='contained' href="/"
                    sx={{
                        backgroundColor:'lightskyblue',
                        marginTop:'20px',
                        marginLeft:'40px',
                    }}
            >
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
                    onChange={handleEdit}
                    variant="outlined"
                    multiline={true}
                    maxRows={10}
                    defaultValue={value}
                    fullWidth={true}
                    style={{
                        marginTop:'auto'
                    }}
                />
            </Container>
            <Button 
             size="larger"
             onClick={allowEdit} 
             variant='contained' 
             sx={{
                backgroundColor: 'lightskyblue',
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