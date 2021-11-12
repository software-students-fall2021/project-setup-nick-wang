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
                     res.should.have.status(200);
                     res.body.should.have.property("monthlyLimit")
                                .and.have.property("monthlySpending");
                     done();
                  });
         });
    });

    describe("POST /set-monthly-budget", () => {
        it("It should update the monthly budget", (done) => {
          const newAmount = 10000;
          chai
            .request(app)
            .post("/set-monthly-budget")
            .send(newAmount)
            .end((err, response) => {
              if (err) throw err;
              response.should.have.status(200);
              done();
            });
        });
      });
});