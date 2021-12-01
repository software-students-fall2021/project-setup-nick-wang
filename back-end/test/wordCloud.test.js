const chai = require("chai");
const request = require("supertest");

const expect = chai.expect;
const app = require("../app");


describe("DiaryOverview", function () {
    describe("GET /diary/word-cloud", function () {
      it("should return 200 OK with sample words set for word cloud", async function () {
        const response = await request(app)
          .get("/diary/word-cloud")
          .expect(200)
          .expect("Content-Type", /json/);
  
        const words = response.body;
        expect(words).to.be.an("array");
        expect(words).length.to.be.greaterThan(0);
      });
  
      it("should have valid format words set", async function () {
        const response = await request(app)
          .get("/diary/word-cloud")
          .expect(200)
          .expect("Content-Type", /json/);
  
        const words = response.body;
        expect(words).to.be.an("array");
  
        words.forEach(words => {
          expect(words).have.a.property("text");
          expect(words).have.a.property("value");
          expect(words.text).to.be.a("string");
          expect(words.value).to.be.a("number");
        });
      });
    });
  });