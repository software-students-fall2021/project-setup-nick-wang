import React, { useState, useEffect } from "react";
import { Navigate, useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Menu,
  Container,
} from "semantic-ui-react";
// import { TokenContext } from "./TokenContext";

const Login = (props) => {
  const tokenState = props.tokenState;
  const setTokenState = props.setTokenState;
  let [urlSearchParams] = useSearchParams(); // get access to the URL query string parameters

  // create state variables to hold username and password
  const [response, setResponse] = useState({}); // the API will return an object with a JWT token, if the user logs in successfully
  const [errorMessage, setErrorMessage] = useState("");

  // if the user got here by trying to access our Protected page, there will be a query string parameter called 'error' with the value 'protected'
  useEffect(() => {
    const qsError = urlSearchParams.get("error"); // get any 'error' field in the URL query string
    if (qsError === "protected")
      setErrorMessage("Please log in to view our fabulous protected content.");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // if the user's logged-in status changes, save the token we receive from the server
  useEffect(() => {
    // if the user is logged-in, save the token to local storage
    if (response.token) {
      // console.log(`User successfully logged in: ${response.username}`)
      localStorage.setItem("token", response.token); // store the token into localStorage
      setTokenState(!tokenState);
      // setErrorMessage("Welcome!");
    }
  }, [response]);

  // what to do when the user clicks the submit buton on the form
  const handleSubmit = async (e) => {
    // prevent the HTML form from actually submitting... we use React's javascript code instead
    e.preventDefault();

    try {
      // create an object with the data we want to send to the server
      const requestData = {
        username: e.target.username.value, // gets the value of the field in the submitted form with name='username'
        password: e.target.password.value, // gets the value of the field in the submitted form with name='password',
      };
      // send a POST request with the data to the server api to authenticate
      const response = await axios.post(
        `/users/signin`,
        requestData
      );
      // store the response data into the data state variable
      console.log(`Server response: ${JSON.stringify(response.data, null, 0)}`);
      setResponse(response.data);
      // window.location.reload();
    } catch (err) {
      // request failed... user entered invalid credentials
      setErrorMessage("Login Failed! Check you username or password!");
    }
  };

  // if the user is not logged in, show the login form
  if (!response.token)
    return (
      <>
        {/* <Menu fixed="top">
          <Container>
            <Menu.Item as={Link} to="/" classname="AppName" header>
              LifeNote
            </Menu.Item>
          </Container>
        </Menu> */}
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
          className="LoginForm"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Log-in to your account
            </Header>
            {errorMessage ? <Message negative>{errorMessage}</Message> : ""}
            <Form size="large" onSubmit={handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  name="username"
                  iconPosition="left"
                  placeholder="Username"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  name="password"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />

                <Button color="teal" fluid size="large" type="submit">
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to="/signup"> Sign Up </Link>
            </Message>
          </Grid.Column>
        </Grid>
      </>
    );
  // otherwise, if the user has successfully logged-in, redirect them to a different page
  // in this example, we simply redirect to the home page, but a real app would redirect to a page that shows content only available to logged-in users
  else
    return (
      <>
        <Navigate to="/" />
      </>
    );
};

export default Login;
