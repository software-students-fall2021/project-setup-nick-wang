import * as React from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { CardActionArea } from '@mui/material';
import { Typography } from '@mui/material';

export default function DiaryStack() {
    
    let diaries = []
    for (var i = 0; i < 30; i++) {
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
                    <Typography
                    sx={{
                        font:'inherit',
                        fontSize:'larger',
                        textAlign: 'center',
                        padding: '16px',
                    }}>
                        Content
                    </Typography>
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