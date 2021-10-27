import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import PrimaryNav from './PrimaryNav'
import AccountBookMain from './AccountBookMain'
import "./AccountBookMain.css"
// import Home from './Home'

import StickyNav from "./StickyNav";
import Home from "./Home";
import Login from "./Login";
import DiaryOverview from "./DiaryOverview";

import "./App.css";

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/diary_overview">
            <StickyNav />
            <DiaryOverview />
          </Route>

          <Route path="/">

            <AccountBookMain />

            <StickyNav />
            <Home />
          </Route>

          <Route path="/moreTransaction">
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
