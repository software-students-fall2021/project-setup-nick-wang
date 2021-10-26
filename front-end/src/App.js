import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import PrimaryNav from './PrimaryNav'
// import Home from './Home'
import Diary from './Diary/Diary'
import "./App.css";

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/">
            <Diary />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
