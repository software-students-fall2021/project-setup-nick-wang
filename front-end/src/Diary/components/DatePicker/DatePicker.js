import * as React from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';


export default function BasicDatePicker({pickedDate, setPickedDate}) {

  const handleOnChange = (newDate) =>{
    const date = new Date(newDate)
    setPickedDate(date)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        variant="inline"
        views={['year','month']}
        label="Choose Month"
        value={pickedDate}
        onChange={handleOnChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}