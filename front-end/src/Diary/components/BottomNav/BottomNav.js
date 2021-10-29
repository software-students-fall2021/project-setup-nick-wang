import React from "react";
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box/Box';
import BottomNavigation from '@material-ui/core/BottomNavigation/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction/BottomNavigationAction';
import SearchIcon from '@material-ui/icons/Search';
import CloudIcon from '@material-ui/icons/Cloud';
import SettingsIcon from '@material-ui/icons/Settings';
import BasicDatePicker from '../DatePicker/DatePicker'
import './BottomNav.css';

const BottomNav = (props) => {
    const [value, setValue] = React.useState(0);
    return(
        <div className="navBox">
        <Box sx={{ position:'fixed', bottom: 0, left: 0, right: 0}}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                sx={{height:'70px'}}
            >
                <Box sx={{marginTop:'10px'}}>
                    <BasicDatePicker pickedDate={props.pickedDate} setPickedDate={props.setPickedDate}></BasicDatePicker>
                </Box>
                <BottomNavigationAction label="Search" icon={<SearchIcon />} />
                <BottomNavigationAction label="WordsCloud" icon={<CloudIcon />} component={Link} to="/diary_overview" />
                <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
            </BottomNavigation>
        </Box>
        </div>
    )
}

export default BottomNav