import React, {useState} from 'react'
import DiaryStack from './components/DiaryStack/DiaryStack'
import { Link } from "react-router-dom";
import BottomNav from './components/BottomNav/BottomNav'
import "./Diary.css"
import axios from 'axios'
import { Button, Container, Icon } from 'semantic-ui-react'
import Login from '../Login';
import { Menu } from '@mui/material';

const Diary = (props) => {

    const tokenState = props.tokenState;
    const jwtToken = localStorage.getItem("token");
    const [response, setResponse] = useState({}); // we expect the server to send us a simple object in this case
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    React.useEffect(() => {
        // setToken(localStorage.getItem("token")); // the JWT token, if we have already received one and stored it in localStorage
        
        axios
          .get(`${process.env.REACT_APP_BACKEND}/users/secret`, {
            headers: { authorization: jwtToken }, // pass the token, if any, to the server
          })
          .then((res) => {
            console.log(res.data);
            setResponse(res.data); // store the response data
            setIsLoggedIn(true);
            setUsername(res.data.username);
          })
          .catch((err) => {
            console.log(
              "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
            );
            setIsLoggedIn(false); // update this state variable, so the component re-renders
          });
      }, [tokenState]); // eslint-disable-line react-hooks/exhaustive-deps

    const [pickedDate, setPickedDate] = useState(new Date());
    const [username, setUsername] = useState("");

    const handleLogout = (e) => {
        setIsLoggedIn(false);
    };

    return (
      <>
      <Menu fixed="top">
        <Container>
          <Menu.Item as={Link} to="/Diary" header>
            LifeNote
          </Menu.Item>
            {isLoggedIn ? (
                <>
                  <Menu.Item position="right">
                    <Icon name="user circle" size="large" />
                    <span>{response.username}</span>
                    <Button
                    as={Link}
                    to="/logout"
                    className="Logout"
                    onClick={handleLogout}
                    Secondary
                    >
                      Log out
                    </Button>
                  </Menu.Item>
                </>
            ) : (
                <Login></Login>
            )}
        </Container>
      </Menu>
      <DiaryStack pickedDate={pickedDate} username={username}></DiaryStack>    
      <BottomNav pickedDate={pickedDate} setPickedDate={setPickedDate}></BottomNav>
    </>
    )
}

export default Diary