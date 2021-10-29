import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import PrimaryNav from './PrimaryNav'
// import Home from './Home'

import StickyNav from "./StickyNav";
import Home from "./Home";
import Login from "./Login";
import AccountBookMain from "./AccountBook/AccountBookMain";
import Account_page2 from "./AccountBook/Account_page2";
import Account_page3 from "./AccountBook/Account_page3";
import DiaryOverview from "./DiaryOverview";

import Diary from "./Diary/Diary";
import DiaryDetail from "./Diary/components/DiaryDetail/DiaryDetail";
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

        <Route path="/Diary">
          <StickyNav />
          <Diary />
        </Route>

        <Route path="/Detail">
          <StickyNav />
          <DiaryDetail />
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
          <StickyNav />
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
