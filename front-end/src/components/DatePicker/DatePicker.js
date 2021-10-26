import * as React from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';

export default function BasicDatePicker() {

  const [date, setDate] = React.useState(null);
  const [month, setMonth] = React.useState(null);

  const handleOnChange = (newDate) =>{
    setDate(newDate)
    const month = new Date(date)
    setMonth(month.getMonth())
  }
  //console.log(month)

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        variant="inline"
        views={['year','month']}
        label="Choose Month"
        value={date}
        onChange={handleOnChange}
        renderInput={(params) => <TextField {...params} />}

      />
    </LocalizationProvider>
  );
}