import * as React from 'react';
import Card from '@mui/material/Card';
import { CardActionArea, CardContent, Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { typography } from '@mui/system';

export default function DiaryStack(props) {
    
    let diaries = []
    const [isEditing, setIsEditing] = React.useState(false);
    const numOfDates = monthToNumOfDates(props.pickedDate);
    const year = props.pickedDate.getYear() + 1900;
    const month = props.pickedDate.getMonth() + 1;

    let diariesContent = []
    for(var i = 0; i < numOfDates; i++){
        diariesContent.push('');
    }

    const [value, setValue] = React.useState(diariesContent);

    const toggleIsEditing = () => setIsEditing((b) => !b);
    const setIthValue = (idx) => {
        return (e) => {
            const newValue = [];
            for (var i =0;i<numOfDates; ++i) {
                if (i !== idx) {
                    newValue.push(value[i]);
                }else {
                    newValue.push(e.value);
                }
            }
            setValue(newValue);
        };
    };
    for (var i = 0; i < numOfDates; i++) {
        const onChange = setIthValue(i);
        const date = "" + month + "-" + (i+1) + "-" + year;
        diaries.push(
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
            <CardActionArea href={"/Detail/" + date}>
                <Typography
                 sx={{
                  fontSize:'larger',
                  textAlign: 'center',
                  paddingTop:'10px',
                  width:'250px',
                  height: '250px',
                  fontWeight:'bold',
                  color:'black'
                 }}>
                    {month}/{i + 1}
                </Typography>
                <Typography style={{ display: "none" }} >
                </Typography>
            </CardActionArea>
        </Card>);
    }
    return (
      <div>
        <Grid 
         container justifyContent="center"
        >
            {diaries}
        </Grid>
      </div>
    );
}

const monthToNumOfDates = (date) => { 
    const year = date.getYear()
    const month = date.getMonth()
    const numOfDates = [31, 28, 31, 30,31,30,31,31,30,31,30,31];
    let result = 0;
    if(year % 4 != 0 ){
        result = numOfDates[month]
    }
    else{
        if(month != 1) result = numOfDates[month]
        else
            result = 29
    }
    return result
}