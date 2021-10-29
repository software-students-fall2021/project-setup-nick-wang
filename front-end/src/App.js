import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import PrimaryNav from './PrimaryNav'
// import Home from './Home'
import Diary from './Diary/Diary'
import DiaryDetail from './Diary/components/DiaryDetail/DiaryDetail'
import "./App.css";

function App() {

  return (
      <Router>
        <Switch>
          <Route path="/" exact component={Diary} />
          <Route path="/Detail" component={DiaryDetail} />
        </Switch>
      </Router>
  );
}

export default App;
