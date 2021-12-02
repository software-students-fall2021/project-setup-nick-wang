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

    describe("PUT /save_transaction_data", () => {
      it("It should update transaction data", (done) => {
        const transac = [{
          name: "steak",
          type: "food",
          amount: "11",
          date:"11/23/2021",
      }]
        chai
          .request(server)
          .put("/save_transaction_data")
          .send(transac)
          .end((err, response) => {
            if (err) throw err;
            response.should.have.status(200);
            done();
          });
      });
    });
  });