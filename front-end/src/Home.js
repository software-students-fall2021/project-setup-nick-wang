import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.svg";
import "./Home.css";
import {
  Icon,
  Container,
  Divider,
  Header,
  Image,
  Segment,
  Grid,
} from "semantic-ui-react";

const Home = (props) => {

  const date = new Date();
  const month = parseInt(date.getMonth()) + 1;
  const diaryAPI = "/Diary" + "/" + month + "/" + date.getFullYear();
  return (
    <>
      <Container as={Link} to="/" className="AppLogo" text>
        <Image src={logo} size="medium" rounded centered />
      </Container>
      <Container text textAlign="center">
        <Header as="h1" content="Welcome to LifeNote!" className="Header_1" />
        <Header as="h2" content="Record Your Life" className="Header_2" />
      </Container>

      <Segment placeholder>
        <Grid columns={2} stackable textAlign="center">
          <Divider vertical>Or</Divider>
          <Grid.Row verticalAlign="middle">
            <Grid.Column>
              <Header icon as={Link} to={diaryAPI}>
                <Icon name="pencil alternate" />
                Diary
              </Header>
            </Grid.Column>

            <Grid.Column>
              <Header icon as={Link} to="/account_book">
                <Icon name="dollar sign" />
                Account Book
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </>

    /* <h1>Welcome to LifeNote!</h1>
      <section className="main-content">
        <img alt="welcome!" src="https://picsum.photos/200?page=home" />
        <p>Introduction for LifeNote.</p>
      </section> */
  );
};

export default Home;
