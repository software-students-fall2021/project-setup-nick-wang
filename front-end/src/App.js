import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrimaryNav from './PrimaryNav'
import AccountBookMain from './AccountBookMain'
import Home from './Home'
import "./App.css";

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/">
            {/* <PrimaryNav /> */}
            <AccountBookMain />
            {/* <Home /> */}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
