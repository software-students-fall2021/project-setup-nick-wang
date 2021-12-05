import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { TokenContext } from "./TokenContext";
// import PrimaryNav from './PrimaryNav'
// import Home from './Home'

import StickyNav from "./StickyNav";
import Home from "./Home";
import Login from "./Login";
import AccountBookMain from "./AccountBook/AccountBookMain";
import Account_page2 from "./AccountBook/Account_page2";
import Account_page3 from "./AccountBook/Account_page3";
import DiaryOverview from "./Diary/DiaryWordcloud";
import Logout from "./Logout";
import Diary from "./Diary/Diary";
import DiaryDetail from "./Diary/components/DiaryDetail/DiaryDetail";
import Signup from "./Signup";
import "./App.css";

function App() {
  const [tokenState, setTokenState] = useState(false);
  // const tokenContext = useContext(TokenContext);
  return (
    <>
      <Router>
        <StickyNav tokenState={tokenState}/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account_book" element={<AccountBookMain />} />
          <Route path="/account_book/:type" element={<Account_page3 />} />
          <Route path="/account_book/overview" element={<Account_page2 />} />
          <Route path="/Diary/:month/:year" element={<Diary tokenState={tokenState} setTokenState={setTokenState}/>} />
          <Route path="/Detail/:username/:date" element={<DiaryDetail />} />
          <Route path="/diary_overview" element={<DiaryOverview />} />
          <Route path="/login" element={<Login tokenState={tokenState} setTokenState={setTokenState}/>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup tokenState={tokenState} setTokenState={setTokenState}/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
