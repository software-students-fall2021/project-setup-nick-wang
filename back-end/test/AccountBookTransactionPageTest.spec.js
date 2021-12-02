const chai = require("chai");
const chaiHTTP = require("chai-http");
const server = require("../app");

chai.should();
chai.use(chaiHTTP);

describe("Account Book Transaction Page Test", () => {
    describe("GET get transactions data", () => {
      it("It should GET transaction data for the transaction pages", (done) => {
        chai
          .request(server)
          .get("/Transaction_data")
          .end((err, response) => {
            if (err) throw err;
            response.should.have.status(200);
            response.body[0].should.have.property("name");
            response.body[0].should.have.property("date");
            response.body[0].should.have.property("amount");
            response.body[0].should.have.property("type");
            done();
          });
      });
    });
    describe("GET get transactions data", () => {
      it("It should GET transaction data for the transaction pages", (done) => {
        const type = "meat"
        chai
          .request(server)
          .get("/Transaction_data/" + type)
          .end((err, response) => {
            if (err) throw err;
            response.should.have.status(200);
            response.body[0].should.have.property("name");
            response.body[0].should.have.property("date");
            response.body[0].should.have.property("amount");
            response.body[0].should.have.property("type");
            done();
          });
      });
    });

    
  });