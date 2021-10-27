import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import PrimaryNav from './PrimaryNav'
// import Home from './Home'

import StickyNav from "./StickyNav";
import Home from "./Home";
import Login from "./Login";
import AccountBookMain from "./AccountBookMain";
import Account_page2 from "./Account_page2";
import Account_page3 from "./Account_page3";
import DiaryOverview from "./DiaryOverview";

import "./App.css";

function App() {
  return (
      <Router>
        <Switch>

          <Route path="/account_book/category">
            <StickyNav />
            <Account_page3 />
          </Route>

          <Route path="/account_book/overview">
            <StickyNav />
            <Account_page2 />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/diary_overview">
            <StickyNav />
            <DiaryOverview />
          </Route>

          <Route path="/account_book">
            <StickyNav />
            <AccountBookMain />
          </Route>

          <Route path="/">
            <Home />
          </Route>

        </Switch>
      </Router>
  );
}

export default App;
