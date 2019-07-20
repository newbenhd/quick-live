const { expect } = require("chai");
const model = require("../user.model");
const db = require("../../../database/db");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
// const request = require('supertest')
// const app = require('../../../server')

describe("Test user model", () => {
  before(done => {
    db.open()
      .then(() => done())
      .catch(e => done(e));
  });
  after(done => {
    db.drop()
      .then(() => done())
      .catch(e => done(e));
  });
  after(done => {
    db.close()
      .then(() => done())
      .catch(e => done(e));
  });
  describe("Create", () => {
    it("should have doc with all properties", async () => {
      try {
        const doc = await model.create({
          name: "Benjamin L. Morrison",
          email: "newben.hd@gmail.com",
          password: "random123!"
        });
        expect(doc).to.have.property("name");
        expect(doc).to.have.property("password");
        expect(doc).to.have.property("email");
        expect(doc).to.have.property("createdAt");
        expect(doc).to.have.property("tokens");
        expect(doc).to.have.property("updatedAt");
      } catch (error) {
        throw error;
      }
    });
    it("should save encrypted password after creation", async () => {
      try {
        const password = "joelee123!";
        const doc = await model.create({
          name: "Joseph Lee",
          email: "joelee@usc.edu",
          password
        });
        const isPassword = await bcrypt.compare(password, doc.password);
        expect(doc.password).to.not.equal(password);
        expect(isPassword).to.equal(true);
      } catch (error) {
        throw error;
      }
    });
    it("should fail when same email was used", async () => {
      try {
        await model.create({
          name: "Hyeondong Lee",
          email: "newben.hd@gmail.com",
          password: "djskajsdlf123"
        });
      } catch (error) {
        expect(error.message).to.equal("There was a duplicate key error");
      }
    });
    it("should fail when password length is less 7", async () => {
      try {
        await model.create({
          name: "Joseph Lee",
          email: "joseph@gmail.com",
          password: "zz"
        });
      } catch (error) {
        expect(error.message).to.equal("User validation failed");
      }
    });
    it("should fail when at least one of required field wasn't filled", async () => {
      try {
        await model.create({
          name: "Joseph Lee",
          password: "ajsklfjasld123!"
        });
      } catch (error) {
        expect(error.message).to.equal("User validation failed");
        // expect(error)
      }
    });
  });
  describe("Read", () => {
    it("should read a user with email and password", async () => {
      try {
        const user = await model.findByCredentials(
          "joelee@usc.edu",
          "joelee123!"
        );
        expect(user.name).to.equal("Joseph Lee");
      } catch (error) {
        throw error;
      }
    });
    it("should fail to read a user with wrong email or password", async () => {
      try {
        const user = await model.findByCredentials(
          "joelee@usc.edu",
          "leejoe123"
        );
      } catch (error) {
        expect(error.message).to.throw("Login failed");
      }
    });
  });
  describe("Update", () => {
    let _id = undefined;
    before(async () => {
      try {
        const user = await model.findByCredentials(
          "newben.hd@gmail.com",
          "random123!"
        );
        _id = user._id;
      } catch (error) {
        throw new Error(error.message);
      }
    });
    it("should update a user and return new user", async () => {
      try {
        const user = await model.findOneAndUpdate(
          {
            email: "newben.hd@gmail.com",
            _id
          },
          {
            name: "Ben Lee"
          },
          { new: true }
        );
        expect(user.name).to.equal("Ben Lee");
      } catch (error) {
        throw new Error(error.message);
      }
    });
    it("should return error when update a user with wrong _id", async () => {
      try {
        const user = await model.findOneAndUpdate(
          {
            email: "newben.hd@gmail.com",
            _id: "asdjfkljq"
          },
          {
            name: "Hyeon Dong Lee"
          },
          { new: true }
        );
      } catch (error) {
        expect(error.message).to.be.a("string");
      }
    });
    it("should return a null when update a user with wrong email", async () => {
      try {
        const user = await model.findOneAndUpdate(
          {
            email: "fjkalskdfj@gmail.com",
            _id
          },
          {
            name: "Jamin Lee"
          },
          { new: true }
        );
        expect(user).to.be.null;
      } catch (error) {
        throw new Error(user.message);
      }
    });
  });
  describe("Delete", () => {
    let _id = undefined;
    let _id2 = undefined;
    before(async () => {
      try {
        const user = await model.findByCredentials(
          "newben.hd@gmail.com",
          "random123!"
        );
        _id = user._id;
        const user2 = await model.findByCredentials(
          "joelee@usc.edu",
          "joelee123!"
        );
        _id2 = user2._id;
      } catch (error) {
        throw new Error(error.message);
      }
    });
    it("should fail to login after delete its user", async () => {
      try {
        const deletedUser = await model.findOneAndDelete({
          email: "newben.hd@gmail.com",
          _id
        });
        await model.findByCredentials("newben.hd@gmail.com", "random123!");
      } catch (error) {
        expect(error.message).to.equal("Login failed");
      }
    });
    it("fail to delete w/ wrong email -> return null and be able to login", async () => {
      try {
        const deletedUser = await model.findOneAndDelete({
          email: "oelee@usc.edu",
          _id: _id2
        });
        expect(deletedUser).to.be.null;
        const user = await model.findByCredentials(
          "joelee@usc.edu",
          "joelee123!"
        );
        expect(user.name).to.equal("Joseph Lee");
      } catch (error) {
        throw new Error(error.message);
      }
    });
    it("should return error after fail to delete a user with wrong _id", async () => {
      try {
        await model.findOneAndDelete({
          email: "joelee@usc.edu",
          _id: "asdkfjlsa"
        });
      } catch (error) {
        expect(error.message).to.be.a("string");
      }
    });
  });
});
