import React, { useState, useEffect } from "react";
import ReactWordcloud from "react-wordcloud";
import { Link } from "react-router-dom";
import axios from "axios";
import "./DiaryOverview.css";
import { Container, Dropdown, Button } from "semantic-ui-react";


const testYear = [
  { key: 2010, text: 2010, value: 2010 },
  { key: 2011, text: 2011, value: 2011 },
  { key: 2012, text: 2012, value: 2012 },
  { key: 2013, text: 2013, value: 2013 },
  { key: 2014, text: 2014, value: 2014 },
  { key: 2015, text: 2015, value: 2015 },
  { key: 2016, text: 2016, value: 2016 },
  { key: 2017, text: 2017, value: 2017 },
  { key: 2018, text: 2018, value: 2018 },
  { key: 2019, text: 2019, value: 2019 },
  { key: 2020, text: 2020, value: 2020 },
  { key: 2021, text: 2021, value: 2021 },
];

const testMonth = [
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
  const [wordCloud, setWordCloud] = useState([]);

  const [year, setYear] = useState({ year: [] });

  const [month, setMonth] = useState({ month: [] });

  const handleYear = (e, { value }) => setYear(value);

  const handleMonth = (e, { value }) => setMonth(value);

  useEffect(() => {
    async function getWordCloud(url) {
      const response = await axios(url);
      setWordCloud(response.data);
    }

    getWordCloud("http://localhost:9000/diary/word-cloud");
    // console.log(wordCloud)
  }, []);

  // const size = [640, 360];
  const options = {
    fontSizes: [12, 60],
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
          multiple
          search
          selection
          options={testYear}
        />
        <Dropdown
          onChange={handleMonth}
          placeholder="Month"
          multiple
          search
          selection
          options={testMonth}
        />
      </Container>
    </>
  );
};

export default DiaryOverview;
