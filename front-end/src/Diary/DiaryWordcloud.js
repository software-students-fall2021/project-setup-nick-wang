import React, { useState, useEffect } from "react";
import ReactWordcloud from "react-wordcloud";
import { Link } from "react-router-dom";
import axios from "axios";
import "./DiaryWordcloud.css";
import {
  Container,
  Dropdown,
  Button,
  Dimmer,
  Loader,
  Image,
} from "semantic-ui-react";
import wordList from "./stopword.json";
import { Navigate } from "react-router-dom";

const testYear = [2016, 2017, 2018, 2019, 2020, 2021];

const testMonth = [
  { key: 0, text: 0, value: 0 },
  { key: 1, text: 1, value: 1 },
  { key: 2, text: 2, value: 2 },
  { key: 3, text: 3, value: 3 },
  { key: 4, text: 4, value: 4 },
  { key: 5, text: 5, value: 5 },
  { key: 6, text: 6, value: 6 },
  { key: 7, text: 7, value: 7 },
  { key: 8, text: 8, value: 8 },
  { key: 9, text: 9, value: 9 },
  { key: 10, text: 10, value: 10 },
  { key: 11, text: 11, value: 11 },
  { key: 12, text: 12, value: 12 },
];

const DiaryOverview = (props) => {
  const date = new Date();
  const now_month = parseInt(date.getMonth()) + 1;
  const diaryAPI = "/Diary" + "/" + now_month + "/" + date.getFullYear();

  function removeST(json_array) {
    let clean = [];
    json_array.forEach((element) => {
      if (element.text) {
        let word = element.text.toLowerCase().replace(/[^\w]|_|\\n/g, "");
        if (!wordList.stopwords.includes(word)) {
          clean.push(Object.assign({}, element));
        }
      }
    });
    // console.log(clean)
    return clean;
  }

  function sortByCount(json_array) {
    return json_array.slice().sort((a, b) => b.value - a.value);
  }

  function getYear(yearList) {
    let yearJson = { key: 0, text: 0, value: 0 };
    let yearJsonList = [];
    yearList.forEach(function (year) {
      yearJson.key = year;
      yearJson.text = year;
      yearJson.value = year;
      yearJsonList.push(Object.assign({}, yearJson));
    });
    return yearJsonList;
  }

  const [wordCloud, setWordCloud] = useState([]);

  const [yearList, setYearList] = useState([]);

  const [yearJsonList, setYearJsonList] = useState([]);

  const [year, setYear] = useState(0);

  const [month, setMonth] = useState(0);

  const handleYear = (e, { value }) => setYear(value);

  const handleMonth = (e, { value }) => setMonth(value);

  const jwtToken = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // console.log("Select Year: " + year);
    // console.log("Select Month: " + month)
    axios
      .get(`/users/secret`, {
        headers: { authorization: jwtToken }, // pass the token, if any, to the server
      })
      .then((res) => {
        setIsLoggedIn(true);
        const username = res.data.username;
        // console.log("Username: " + username);
        axios
          .get(`/overview/yearlist/${username}`)
          .then((res) => {
            setYearList(res.data);
          })
          .catch((e) => {
            setYearList([]);
          });
        if (!yearList.length) {
          setYearJsonList(getYear(testYear));
        } else {
          setYearJsonList(getYear(yearList));
        }
        if (!year) {
          axios
            .get(`/diary/word-cloud`)
            .then((res) => {
              setWordCloud(res.data);
            })
            .catch((e) => {
              setWordCloud([]);
            });
        } else if (!month) {
          axios
            .get(`/overview/${username}/${year}`)
            .then((res) => {
              const word_count = res.data;
              let word_clean = removeST(word_count);
              sortByCount(word_clean);
              setWordCloud(word_clean.slice(0, 50));
            })
            .catch((e) => {
              setWordCloud([]);
            });
        } else {
          axios
            .get(`/overview/${username}/${month}/${year}`)
            .then((res) => {
              const word_count = res.data;
              let word_clean = removeST(word_count);
              sortByCount(word_clean);
              setWordCloud(word_clean.slice(0, 50));
            })
            .catch((e) => {
              setWordCloud([]);
            });
        }
      })
      .catch((err) => {
        console.log(
          "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
        );
        setIsLoggedIn(false);
      });
    console.log("isLoggedIn" + isLoggedIn);
    // console.log(wordCloud)
  }, [year, month]);

  // const size = [640, 360];
  const options = {
    fontSizes: [12, 50],
    rotations: 3,
    rotationAngles: [0, 90],
  };
  if (isLoggedIn) {
    return (
      <>
        <div id="Back">
          <Container>
            <Button
              as={Link}
              to={diaryAPI}
              content="Back"
              icon="left arrow"
              labelPosition="left"
            />
          </Container>
        </div>
        <div id="WordCloud">
          <Container fluid text textAlign="center">
            <ReactWordcloud words={wordCloud} options={options} />
          </Container>
        </div>
        <Container text textAlign="center">
          <Dropdown
            onChange={handleYear}
            placeholder="Year"
            search
            selection
            options={yearJsonList}
          />
          <Dropdown
            onChange={handleMonth}
            placeholder="Month"
            search
            selection
            options={testMonth}
          />
          {}
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>

        {/* <Image src="/images/wireframe/paragraph.png" /> */}
      </>
    );
  }
};

export default DiaryOverview;
