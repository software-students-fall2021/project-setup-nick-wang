import React, { useState, useEffect } from "react";
import ReactWordcloud from "react-wordcloud";
import { Link } from "react-router-dom";
import axios from "axios";
import "./DiaryWordcloud.css";
import { Container, Dropdown, Button } from "semantic-ui-react";
import wordList from "./stopword.json";

const testYear = [
  { key: 2016, text: 2016, value: 2016 },
  { key: 2017, text: 2017, value: 2017 },
  { key: 2018, text: 2018, value: 2018 },
  { key: 2019, text: 2019, value: 2019 },
  { key: 2020, text: 2020, value: 2020 },
  { key: 2021, text: 2021, value: 2021 },
];

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

  const [wordCloud, setWordCloud] = useState([]);

  const [year, setYear] = useState(0);

  const [month, setMonth] = useState(0);

  const handleYear = (e, { value }) => setYear(value);

  const handleMonth = (e, { value }) => setMonth(value);

  useEffect(() => {
    console.log("Select Year: " + year);
    console.log("Select Month: " + month);
    if (!year) {
      axios
        .get("http://localhost:9000/diary/word-cloud")
        .then((res) => {
          setWordCloud(res.data);
        })
        .catch((e) => {
          setWordCloud([]);
        });
    } else if (!month) {
      axios
        .get("http://localhost:9000/overview/" + year)
        .then((res) => {
          const word_count = res.data;
          let word_clean = removeST(word_count)
          sortByCount(word_clean);
          setWordCloud(word_clean.slice(0, 50));
        })
        .catch((e) => {
          setWordCloud([]);
        });
    } else {
      axios
        .get("http://localhost:9000/overview/" + month + "/" + year)
        .then((res) => {
          const word_count = res.data;
          let word_clean = removeST(word_count)
          sortByCount(word_clean);
          setWordCloud(word_clean.slice(0, 50));
        })
        .catch((e) => {
          setWordCloud([]);
        });
    }
    // console.log(wordCloud)
  }, [year, month]);

  // const size = [640, 360];
  const options = {
    fontSizes: [12, 50],
    rotations: 3,
    rotationAngles: [0, 90],
  };

  return (
    <>
      <div id="Back">
        <Container>
          <Button
            as={Link}
            to="/Diary"
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
          options={testYear}
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
};

export default DiaryOverview;
