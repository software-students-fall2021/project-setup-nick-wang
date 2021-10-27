import * as React from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@material-ui/core/Button';
import { CardActionArea } from '@mui/material';
import { Typography } from '@mui/material';
//import { today } from '../DatePicker/DatePicker';

export default function DiaryStack() {
    
    //console.log(today)
    let diaries = []
    const [isEditing, setIsEditing] = React.useState(false);
    const [value, setValue] = React.useState("Edit me");

    const toggleIsEditing = () => setIsEditing((b) => !b);
    
    for (var i = 0; i < 10; i++) {
        diaries.push(
        <Card
         fullWidth={true}
         sx={{
             backgroundColor:'#F5F5F5',
             height: '50px',
             boxShadow: 'none',
         }}
        >
            <CardActionArea>
                <Stack direction='row'>
                <Typography
                 sx={{
                  font:'inherit',
                  fontSize:'larger',
                  textAlign: 'center',
                  padding: '16px',
                 }}>
                    11/25/2021 Monday
                </Typography>
                <input
                 className="MuiTypography-root MuiTypography-h4 MuiTypography-displayInline"
                 value={value}
                 onChange={(e) => setValue(e.target.value)}
                />
                <Typography style={{ display: "none" }} >
                </Typography>
                <Button size="small" onClick={toggleIsEditing}>
                 Done
                </Button>
                </Stack>
            </CardActionArea>
        </Card>);
    }
    return (
      <div>
        <Stack spacing={1}>
            {diaries}
        </Stack>
      </div>
    );
}