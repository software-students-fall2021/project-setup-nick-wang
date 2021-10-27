import React from "react";
import { Link } from "react-router-dom";
import "./StickyNav.css";
import { Container, Menu, Button } from "semantic-ui-react";

const StickyNav = (props) => {
  return (
    <Menu fixed="top">
      <Container>
        <Menu.Item as={Link} to="/" classname="AppName" header>
          LifeNote
        </Menu.Item>
        <Menu.Item position="right">
          <Button as={Link} to="/login" className="Login" primary>
            Log in
          </Button>
          <Button as={Link} to="/login" className="Signup" secondary>
            Sign Up
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default StickyNav;
