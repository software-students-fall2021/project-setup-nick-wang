import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StickyNav from "./StickyNav";
import Home from "./Home";
import Login from "./Login";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/">
            <StickyNav />
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
