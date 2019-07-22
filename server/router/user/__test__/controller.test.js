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
          expect(res.body).to.be.an("object");
          expect(res.body.message).to.equal("Unauthorized");
          done();
        });
    });
  });
  describe("POST /api/user/signIn", () => {
    // beforeEach(done => {
    //   request(app)
    //     .post("/api/user/logout")
    //     .set("Authorization", headerAuth)
    //     .expect(202, done);
    // });
    it("expect res w/ properties of a user, token, and message", done => {
      request(app)
        .post("/api/user/signIn")
        .send({
          email: "newben.hd@gmail.com",
          password: "random123!"
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.user).to.be.an("object");
          expect(res.body.message).to.equal("Sign in success.");
          headerAuth = res.body.token;
          done();
        });
    });
    it("should log out before next sign in request", done => {
      request(app)
        .post("/api/user/logout")
        .set("Authorization", headerAuth)
        .expect(202, done);
    });
    it("expect 500 error when sign in with wrong password", done => {
      request(app)
        .post("/api/user/signIn")
        .send({
          email: "newben.hd@gmail.com",
          password: "rnn123!0"
        })
        .expect(500, done);
    });
    it("expect 500 error when sign in with wrong email", done => {
      request(app)
        .post("/api/user/signIn")
        .send({
          email: "newben.hd@gmil.com",
          password: "random123!"
        })
        .expect(500, done);
    });
    it("expect 500 error when sign in with invalid field", done => {
      request(app)
        .post("/api/user/signIn")
        .send({
          token: "newben.hd@gmail.com",
          password: "random123!"
        })
        .expect(
          res => res.body.message === "Fail to sign in. Please try again."
        )
        .expect(500, done);
    });
  });
  describe("GET /api/user", () => {
    it("should log in first before testing GET /api/user", done => {
      request(app)
        .post("/api/user/signIn")
        .send({
          email: "joelee@usc.edu",
          password: "joelee123!"
        })
        .expect(200)
        .end((err, res) => {
          headerAuth = res.body.token;
          done();
        });
    });
    it("expect res with user object, but no password or tokens", done => {
      request(app)
        .get("/api/user")
        .set("Authorization", headerAuth)
        .expect(200)
        .end((err, res) => {
          expect(res.body.email).to.equal("joelee@usc.edu");
          expect(res.body.password).to.be.undefined;
          expect(res.body.tokens).to.be.undefined;
          done();
        });
    });
    it("expect err when wrong token used for a get request", done => {
      request(app)
        .get("/api/user")
        .set("Authorization", "asjdkflj123123salj")
        .expect(401, done);
    });

    it("expect [401] err when request w/o token", done => {
      request(app)
        .get("/api/user")
        .expect(401, done);
    });
  });
  describe("PUT /api/user", () => {
    it("expect res with user and message info", done => {
      request(app)
        .put("/api/user")
        .set("Authorization", headerAuth)
        .send({
          name: "Joe Lee"
        })
        .expect(201)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body.message).to.equal("Update your account success.");
          expect(res.body.user.name).to.equal("Joe Lee");
          done();
        });
    });
    it("expect [400] when update request w/ no valid field", done => {
      request(app)
        .put("/api/user")
        .set("Authorization", headerAuth)
        .send({
          nonValid: "field value"
        })
        .expect(res =>
          expect(res.body.message).to.equal(
            "At least one of update keys has to match to user keys."
          )
        )
        .expect(400, done);
    });
    it("expect [401] when no token is set", done => {
      request(app)
        .put("/api/user")
        .send({
          name: "Ben Morrison"
        })
        .expect(401, done);
    });
  });
  describe("DELETE /api/user", () => {
    it("expect res w/ success message", done => {
      request(app)
        .delete("/api/user")
        .set("Authorization", headerAuth)
        .expect(202)
        .end((err, res) => {
          expect(res.body.message).to.equal("Delete your account success.");
          done();
        });
    });
    it("making sure if it's not in database after delete the user", done => {
      request(app)
        .get("/api/user")
        .set("Authorization", headerAuth)
        .expect(401, done);
    });
    it("expect [401] when delete request w/o token", done => {
      request(app)
        .delete("/api/user")
        .expect(401, done);
    });
  });
});
