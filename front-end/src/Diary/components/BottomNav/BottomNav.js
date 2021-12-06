import React from "react";
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box/Box';
import BottomNavigation from '@material-ui/core/BottomNavigation/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction/BottomNavigationAction';
import CloudIcon from '@material-ui/icons/Cloud';
import BasicDatePicker from '../DatePicker/DatePicker'
import './BottomNav.css';

const BottomNav = (props) => {
    const [value, setValue] = React.useState(0);
    return(
        <Box className="BottomNav">
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <Box>
                    <BasicDatePicker pickedDate={props.pickedDate} setPickedDate={props.setPickedDate}></BasicDatePicker>
                </Box>
                <BottomNavigationAction label="Overview" icon={<CloudIcon />} component={Link} to="/diary_overview" />
            </BottomNavigation>
        </Box>
    )
}

export default BottomNav