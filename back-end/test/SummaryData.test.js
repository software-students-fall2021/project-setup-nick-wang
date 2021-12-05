// Import the dependencies for testing
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Account Summary", () => {
    describe("GET /get-monthly-limit/admin", () => {
        it("should get a monthly limit", (done) => {
             chai.request(app)
                 .get('/get-monthly-limit/admin')
                 .end((err, res) => {
                     if (err) throw err;
                     res.should.have.status(200);
                     res.body.should.have.property("monthlyLimit");
                     done();
                  });
         });
    });

    describe("GET /get-monthly-spending/admin", () => {
      it("should get a monthly total spending", (done) => {
           chai.request(app)
               .get('/get-monthly-spending/admin')
               .end((err, res) => {
                   if (err) throw err;
                   res.should.have.status(200);
                   res.body.should.have.property("monthlySpending");
                   done();
                });
      });
    });

    describe("GET /get-transac-data/admin", () => {
      it("should get transactions data", (done) => {
           chai.request(app)
               .get('/get-transac-data/admin')
               .end((err, res) => {
                   if (err) throw err;
                   res.should.have.status(200);
                   res.body[0].should.have.property("_id");
                   res.body[0].should.have.property("totalAmount");
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