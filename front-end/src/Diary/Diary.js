import React, {useState} from 'react'
import { useParams } from "react-router";
import DiaryStack from './components/DiaryStack/DiaryStack'
import { Link } from "react-router-dom";
import BottomNav from './components/BottomNav/BottomNav'
import "./Diary.css"
import axios from 'axios'
import { Button, Container, Icon } from 'semantic-ui-react'
import Login from '../Login';
import { Menu } from '@mui/material';
import Footer from './components/Footer/Footer';

const Diary = (props) => {

    const { month } = useParams();
    const { year } = useParams();
    const tokenState = props.tokenState;
    const jwtToken = localStorage.getItem("token");
    const [response, setResponse] = useState({}); // we expect the server to send us a simple object in this case
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //console.log(date);


    React.useEffect(() => {
        // setToken(localStorage.getItem("token")); // the JWT token, if we have already received one and stored it in localStorage
        
        axios
          .get(`/users/secret`, {
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

    const tempMonth = parseInt(month) - 1;
    const [pickedDate, setPickedDate] = useState(new Date(year , tempMonth));
    //console.log(pickedDate);
    const [username, setUsername] = useState("");
    const diaryAPI = "/Diary/" + month + "/" + year;

    const handleLogout = (e) => {
        setIsLoggedIn(false);
    };

    return (
      <div className="Diary">
        {isLoggedIn ? (
          <>
          <Menu fixed="top">
            <Container>
              <Menu.Item as={Link} to={diaryAPI} header>
                LifeNote
              </Menu.Item>
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
            </Container>
          </Menu>
          <DiaryStack pickedMonth={parseInt(pickedDate.getMonth()) + 1} pickedYear={pickedDate.getFullYear()} username={username}></DiaryStack>
          <BottomNav pickedDate={pickedDate} setPickedDate={setPickedDate}></BottomNav>
          </>
        ) : (
            <Menu fixed="top">
            <Container>
              <Menu.Item as={Link} to={diaryAPI} header>
                LifeNote
              </Menu.Item>
                <Login></Login>
            </Container>
        </Menu>
        )}        
      <Footer />
      </div>
    )
}

export default Diary