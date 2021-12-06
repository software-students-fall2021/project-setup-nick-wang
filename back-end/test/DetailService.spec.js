const chai = require("chai");
const chaiHTTP = require("chai-http");
const server = require("../app");

chai.should();
chai.use(chaiHTTP);

describe("API Test", () => {
  describe("GET /Details/:date", () => {
    it("It should GET the diary content by date and username", (done) => {
      const date = "admin/12-1-2021";
      chai
        .request(server)
        .get("/Details/" + date)
        .end((err, response) => {
          if (err) throw err;
          response.should.have.status(200);
          response.body[0].should.have.property("username");
          response.body[0].should.have.property("date");
          response.body[0].should.have.property("content");
          response.body[0].should.have.property("username").eq("admin");
          response.body[0].should.have.property("date").eq("12-1-2021");
          response.body[0].should.have
            .property("content")
            .eq("12345");
          done();
        });
    });
  });

  describe("PUT /Details/:date", () => {
    it("It should update the diary content with given username, date and content", (done) => {
      const username = "admin";
      const date = "11-1-2021";
      const newDiary = {
        username: username,
        date: date,
        content: "today is 11-1-2021",
    }
      chai
        .request(server)
        .put("/Details/" + username + "/" + date)
        .send(newDiary)
        .end((err, response) => {
          if (err) throw err;
          response.should.have.status(200);
          done();
        });
    });
  });
});
