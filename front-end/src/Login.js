import React from "react";
import { Link } from "react-router-dom";
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

const Login = () => (
  <>
    <Menu fixed="top">
      <Container>
        <Menu.Item as={Link} to="/" classname="AppName" header>
          LifeNote
        </Menu.Item>
      </Container>
    </Menu>

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
        <Form size="large" action="http://localhost:9000/login" method="post">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
            />
            <Form.Input
              fluid
              icon="lock"
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
          New to us? <a href="#">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  </>
);

export default Login;
