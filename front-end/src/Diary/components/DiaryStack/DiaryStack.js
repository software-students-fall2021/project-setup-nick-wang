import React from "react";
import { Grid } from '@mui/material';
import DiaryCards from "../DiaryCard/DiaryCard";

export default function DiaryStack(props) {
    
    let diaries = []
    const numOfDates = monthToNumOfDates(props.pickedDate);
    const year = props.pickedDate.getYear() + 1900;
    const month = props.pickedDate.getMonth() + 1;

    let diariesContent = []
    for(var i = 0; i < numOfDates; i++){
        diariesContent.push('');
    }

    const [value, setValue] = React.useState(diariesContent);

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

        diaries.push(
            <DiaryCards
             year={year}
             month={month}
             date={i + 1}
             ></DiaryCards>
        );
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