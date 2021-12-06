import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Menu, Button, Icon } from "semantic-ui-react";
import axios from "axios";
import "./StickyNav.css";
// import TokenContext from "./TokenContext";

const StickyNav = (props) => {
  const tokenState = props.tokenState;
  console.log(`Token State: ${tokenState}`);
  // const { tokenState, setTokenState } = useContext(TokenContext);
  const jwtToken = localStorage.getItem("token");
  console.log(`JWT token: ${jwtToken}`); // debugging
  // const [jwtToken, setToken] = useState("");
  const [response, setResponse] = useState({}); // we expect the server to send us a simple object in this case
  const [isLoggedIn, setIsLoggedIn] = useState(false); // if we already have a JWT token in local storage, set this to true, otherwise false

  // try to load the protected data from the server when this component first renders
  useEffect(() => {
    // setToken(localStorage.getItem("token")); // the JWT token, if we have already received one and stored it in localStorage

    axios
      .get(`/users/secret`, {
        headers: { authorization: jwtToken }, // pass the token, if any, to the server
      })
      .then((res) => {
        setResponse(res.data); // store the response data
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(
          "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
        );
        setIsLoggedIn(false); // update this state variable, so the component re-renders
      });
  }, [tokenState]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogout = (e) => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <Menu fixed="top">
        <Container>
          <Menu.Item as={Link} to="/" classname="AppName" header>
            LifeNote
          </Menu.Item>
          <Menu.Item position="right">
            {isLoggedIn ? (
              <>
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
              </>
            ) : (
              <Button as={Link} to="/login" className="Login" primary>
                Log in
              </Button>
            )}
          </Menu.Item>
        </Container>
      </Menu>
    </>
  );
};

export default StickyNav;
