const request = require('supertest');
const {expect} = require('chai');
const app = require("../../../server");

describe('Test registry router', function () {
  let server = undefined;
  before(done => {
    server = app.listen(5000, ()=>{
      console.log('running server on port 5000');
      done();
    });
  });
  after(done=>{
    server.close();
    done();
  });
  describe('GET /api/registry', function () {
    it("expect data with package name", async () => {
      const res = await request(app).get('/api/registry?name=express').expect(200);
      const data = res.body;
      expect(data.name).to.equal('express');
      expect(data.versions).to.be.an('object');
      expect(data.latestVersion).to.be.a('string');
      expect(data.payload).to.be.a('object');
      expect(data.error).to.be.null;
      expect(data.message).to.be.a('string');
    });
    it('expect data with error when wrong package name', async () => {
      const res = await request(app).get('/api/registry?name=asdkjflasdf').expect(200);
      const data = res.body;
      expect(data.name).to.equal('asdkjflasdf');
      expect(data.versions).to.be.null;
      expect(data.latestVersion).to.be.null;
      expect(data.payload).to.be.null;
      expect(data.error).to.be.an('object');
      expect(data.message).to.be.a('string');
    });
    it('expect data with name and version', async () => {
      const res = await request(app).get('/api/registry?name=express&version=4.17.1').expect(200);
      const data = res.body;
      expect(data.name).to.equal('express');
      expect(data.version).to.equal('4.17.1');
      expect(data.dependencies).to.be.an("object");
      expect(data.payload).to.be.an('object');
      expect(data.error).to.be.null;
      expect(data.message).to.be.a('string');
    });
    it('expect data with error when wrong version', async () => {
      const res = await request(app).get('/api/registry?name=express&version=1i01').expect(200);
      const data = res.body;
      expect(data.name).to.equal('express');
      expect(data.version).to.equal('1i01');
      expect(data.dependencies).to.be.null;
      expect(data.payload).to.be.null;
      expect(data.error).to.be.an('object');
      expect(data.message).to.be.a('string');
    });
  });
  describe('GET /api/registry/full', function () {
    it("expect data with name and version", async () => {
      const res = await request(app).get('/api/registry/full?name=express&version=4.17.1').expect(200);
      const data= res.body;
      expect(data.name).to.equal('express');
      expect(data.version).to.equal('4.17.1');
      expect(data.depn).to.be.an('array');
      expect(data.depn).to.not.be.empty;
      expect(data.payload).to.be.an("object");
      expect(data.error).to.be.null;
      expect(data.message).to.be.a("string");
    });
    it("expect data with error when wrong name", async () => {
      const res = await request(app).get('/api/registry/full?name=asdfkjlasdf&version=4.17.1').expect(200);
      const data= res.body;
      expect(data.name).to.equal('asdfkjlasdf');
      expect(data.version).to.equal('4.17.1');
      expect(data.depn).to.be.null;
      expect(data.payload).to.be.null;
      expect(data.error).to.be.an('object');
      expect(data.message).to.be.a("string");
    });
    it("expect data with error when wrong version", async () => {
      const res = await request(app).get('/api/registry/full?name=express&version=1asd').expect(200);
      const data= res.body;
      expect(data.name).to.equal('express');
      expect(data.version).to.equal('1asd');
      expect(data.depn).to.be.null;
      expect(data.payload).to.be.null;
      expect(data.error).to.be.an('object');
      expect(data.message).to.be.a("string");
    });
  });
});
