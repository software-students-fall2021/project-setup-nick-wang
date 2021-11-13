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
          .get("/Account_transaction_data")
          .end((err, response) => {
            if (err) throw err;
            response.should.have.status(200);
            response.body[0].should.have.property("Name");
            response.body[0].should.have.property("Date");
            response.body[0].should.have.property("Amount");
            done();
          });
      });
    });
  });