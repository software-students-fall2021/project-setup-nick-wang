// Import the dependencies for testing
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Account Summary", () => {
    describe("GET /get-monthly-budget", () => {
        it("should get a monthly budget and expense", (done) => {
             chai.request(app)
                 .get('/get-monthly-budget')
                 .end((err, res) => {
                     if (err) throw err;
                     res.should.have.status(200);
                     res.body.should.have.property("monthlyLimit");
                     res.body.should.have.property("monthlySpending");
                     done();
                  });
         });
    });

    describe("PUT /set-monthly-budget", () => {
        it("It should update the monthly budget", (done) => {
          const newAmount = {amount: "10000"}
          chai.request(app)
              .put("/set-monthly-budget")
              .send(newAmount)
              .end((err, res) => {
                res.should.have.status(200);
                done();
              });
        });
      });
});