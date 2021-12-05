const chai = require("chai");
const chaiHTTP = require("chai-http");
const server = require("../app");

chai.should();
chai.use(chaiHTTP);

describe("Account API Test", () => {
  describe("POST /post-search", () => {
    it("It should POST search input", (done) => {
      chai
        .request(server)
        .post("/post-search")
        .end((err, response) => {
          if (err) throw err;
          response.should.have.status(200);
          //response.body[0].should.have.property("search");
          done();
        });
    });
  });

  describe("POST /post-add", () => {
    it("It should POST added transaction by the user", (done) => {
      chai
        .request(server)
        .post("/post-add")
        .end((err, response) => {
          if (err) throw err;
          response.should.have.status(200);
          // response.body[0].should.have.property("trscName");
          // response.body[0].should.have.property("trscAmount");
          // response.body[0].should.have.property("trscType");
          done();
        });
    });
  });

  describe("GET get static transactions", () => {
    it("It should GET mocked static transactions for the main pages", (done) => {
      chai
        .request(server)
        .post("/recent-trsc")
        .end((err, response) => {
          if (err) throw err;
          response.should.have.status(200);
          // response.body[0].should.have.property("name");
          // response.body[0].should.have.property("date");
          // response.body[0].should.have.property("amount");
          // response.body[0].should.have.property("type");
          done();
        });
    });
  });
});