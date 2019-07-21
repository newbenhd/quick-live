const request = require("supertest");
const { expect } = require("chai");
const db = require("../../../database/db");
const app = require("../../../server");

describe("Test user controllers", () => {
  let server = undefined;
  let headerAuth = undefined;
  before(done => {
    db.open()
      .then(() => {
        server = app.listen(5000, () => {
          console.log("server up and listening on port 5000");
          done();
        });
      })
      .catch(e => done(e));
  });
  after(done => {
    server.close();
    db.drop()
      .then(() => done())
      .catch(e => done(e));
  });
  after(done => {
    db.close()
      .then(() => done())
      .catch(e => done(e));
  });
  describe("POST /api/user/signup", () => {
    it("expect res w/ properties of a user, token, and message", async () => {
      try {
        const res = await request(app)
          .post("/api/user/signup")
          .send({
            name: "Benjamin L. Morrison",
            email: "newben.hd@gmail.com",
            password: "random123!"
          })
          .expect(201);
        expect(res.body.user).to.be.an("object");
        headerAuth = `Bearer ${res.body.token}`;
        expect(res.body.token).to.be.a("string");
      } catch (error) {
        throw new Error(error.message);
      }
    });
    it("expect res w/ properties of a user and the user has no password and tokens properties for security", async () => {
      try {
        const res = await request(app)
          .post("/api/user/signup")
          .send({
            name: "Joseph Lee",
            email: "joelee@usc.edu",
            password: "joelee123!"
          })
          .expect(201);
        expect(res.body.user.name).to.equal("Joseph Lee");
        expect(res.body.user.password).to.be.undefined;
        expect(res.body.user.tokens).to.be.undefined;
      } catch (error) {
        throw new Error(error.message);
      }
    });
    it("expect error when same email was used", done => {
      request(app)
        .post("/api/user/signup")
        .send({
          name: "Other Joe",
          email: "joelee@usc.edu",
          password: "otherjoe123!"
        })
        .expect(500)
        .end((err, res) => {
          expect(res.body.message).to.equal(
            "Fail to sign up. Please try again."
          );
          expect(res.body.error).to.exist;
          expect(res.body.error.message).to.equal(
            "There was a duplicate key error"
          );
          done();
        });
    });
    it("expect error when password length is less than 7", done => {
      request(app)
        .post("/api/user/signup")
        .send({
          name: "Anonymous",
          email: "validemail@email.com",
          password: "zz"
        })
        .expect(500)
        .end((err, res) => {
          expect(res.body.message).to.equal(
            "Fail to sign up. Please try again."
          );
          expect(res.body.error).to.exist;
          expect(res.body.error.message).to.equal("User validation failed");
          done();
        });
    });
    it("expect error when one of required field wasn't fulfilled", done => {
      request(app)
        .post("/api/user/signup")
        .send({
          name: "Anonymous"
        })
        .expect(500)
        .end((err, res) => {
          expect(res.body.message).to.equal(
            "Fail to sign up. Please try again."
          );
          expect(res.body.error).to.exist;
          expect(res.body.error.message).to.equal("User validation failed");
          done();
        });
    });
  });
  describe("POST /api/user/logout", () => {
    it("expect res w/ message saying success. Expect 202", done => {
      request(app)
        .post("/api/user/logout")
        .set("Authorization", headerAuth)
        .expect(202)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body.message).to.equal("Successfully logged out.");
          done();
        });
    });
    it("[401] expect to fail to logout again", done => {
      request(app)
        .post("/api/user/logout")
        .set("Authorization", headerAuth)
        .expect(401)
        .end((err, res) => {
          console.log(res.body);
          expect(res.body).to.be.an("object");
          done();
        });
    });
  });
  describe("POST /api/user/signIn", () => {});
  describe("GET /api/user", () => {});
  describe("PUT /api/user", () => {});
  describe("DELETE /api/user", () => {});
});
