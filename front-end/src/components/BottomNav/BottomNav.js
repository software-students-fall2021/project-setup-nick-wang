import React from "react";
//import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box/Box';
import BottomNavigation from '@material-ui/core/BottomNavigation/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction/BottomNavigationAction';
import SearchIcon from '@material-ui/icons/Search';
import CreateIcon from '@material-ui/icons/Create';
import CloudIcon from '@material-ui/icons/Cloud';
import SettingsIcon from '@material-ui/icons/Settings';
import BasicDatePicker from '../DatePicker/DatePicker'
import './BottomNav.css';

const BottomNav = () => {
    const [value, setValue] = React.useState(0);
    return(
        //<StylesProvider injectFirst>
        <div className="navBox">
        <Box>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BasicDatePicker></BasicDatePicker>
                <BottomNavigationAction label="Create" icon={<CreateIcon />} />
                <BottomNavigationAction label="Search" icon={<SearchIcon />} />
                <BottomNavigationAction label="WordsCloud" icon={<CloudIcon />} />
                <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
            </BottomNavigation>
        </Box>
        </div>
        //</StylesProvider>
    )
}

export default BottomNav