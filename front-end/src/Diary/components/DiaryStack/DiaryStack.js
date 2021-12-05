import React from "react";
import { Grid } from '@mui/material';
import DiaryCards from "../DiaryCard/DiaryCard";
import "./DiaryStack.css";

export default function DiaryStack(props) {
    
    let diaries = []
    const year = props.pickedYear;
    const month = props.pickedMonth;
    const numOfDates = monthToNumOfDates(parseInt(year), parseInt(month) - 1);
    const username = props.username;

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
             username={username}
             ></DiaryCards>
        );
    }
    return (
      <div>
        <Grid className="Grid" container justifyContent="center">
            {diaries}
        </Grid>
      </div>
    );
}

function monthToNumOfDates(selectedYear, selectedMonth){ 
    const numOfDates = [31, 28, 31, 30,31,30,31,31,30,31,30,31];
    let result = 0;
    if(selectedYear % 4 != 0 ){
        result = numOfDates[selectedMonth]
    }
    else{
        if(selectedMonth != 1) result = numOfDates[selectedMonth]
        else
            result = 29
    }
    return result
}