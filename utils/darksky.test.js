const darksky = require("./darksky");
const { assert } = require("chai");

describe("--> darksky module test <--", () => {
  describe("forecastRequest() test", () => {
    it("should return response with default", () => {
      darksky.forecastRequest(undefined, undefined, (error, response) => {
        assert.isObject(response, "is response not an object?");
        assert.equal(response.statusCode, 200, "is not status code 200?");
      });
    });
    it("should return response with latitude and longitude", () => {
      const latitude = "34";
      const longitude = "-118";
      darksky.forecastRequest(latitude, longitude, (error, response) => {
        assert.equal(response.statusCode, 200, "is not status code 200?");
        assert.property(
          response.body,
          "currently",
          "is response not have currently property?"
        );
        assert.nestedProperty(
          response.body,
          "currently.temperature",
          "is response not have currently.temperature nest property?"
        );
      });
    });
    it("should handle unable to connect error 501", () => {});
    it("should handle unauthorized request 403", () => {
      darksky.setSecretAPI(darksky.secretAPI + "a");
      darksky.forecastRequest(undefined, undefined, (error, response) => {
        assert.equal(response.statusCode, 403, "is not status cod 403?");
        assert.isObject(error, "is error not an object?");
        assert.hasAllKeys(
          error,
          ["message", "code"],
          "does error not have message and code?"
        );
      });
    });
    it("should handle poorly formatted request 400", () => {
      darksky.setSecretAPI("random-awekjfkalsdjf");
      darksky.forecastRequest(undefined, undefined, (error, response) => {
        assert.equal(response.statusCode, 400, "is not status cod 400?");
        assert.isObject(error, "is error not an object?");
        assert.hasAllKeys(
          error,
          ["message", "code"],
          "does error not have message and code?"
        );
      });
    });
  });
});
