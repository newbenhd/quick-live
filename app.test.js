const app = require("./app");
const { expect, assert } = require("chai");

describe("Weather app API test", () => {
  let defaultForecast = undefined;
  let geocode = undefined;
  let forcastLatAndLong = undefined;
  before(async () => {
    try {
      defaultForecast = await app.getDefaultForecast();
    } catch (error) {
      throw error;
    }
  });
  before(async () => {
    try {
      geocode = await app.getGeocode();
    } catch (error) {
      throw error;
    }
  });

  before(async () => {
    try {
      forcastLatAndLong = await app.getForecastByLatAndLong(
        geocode[1],
        geocode[0]
      );
    } catch (error) {
      throw error;
    }
  });
  describe("defaultForecast()", () => {
    it("Assert if defaultForecast() returns an object", () => {
      assert.isObject(defaultForecast, "is not an object?");
    });
    it("Assert if defaultForecast() has property currently", () => {
      assert.property(
        defaultForecast,
        "currently",
        "does not contain property currently?"
      );
    });
    it("Assert if defaultForecast() returns an object that contains temperature property", () => {
      assert.nestedProperty(
        defaultForecast,
        "currently.temperature",
        "does not contain nested property currently.temperature?"
      );
    });
    it("Assert if defaultForecast() returns an object that contains precipitation probability property", () => {
      assert.nestedProperty(
        defaultForecast,
        "currently.precipProbability",
        "does not contain nested property currently.precipProbability?"
      );
    });
  });
  describe("getGeocode()", () => {
    it("Assert if getGeocode() returns an array", () => {
      assert.isArray(geocode, "is not an array?");
    });
    it("Assert if getGeocode() returns an array with length of two", () => {
      assert.lengthOf(geocode, 2, "is not the array has two numbers?");
    });
    it("Assert if getGeocode() returns an array with two numbers", () => {
      assert.isNumber(geocode[0], "is geocode[0] not a number?");
      assert.isNumber(geocode[1], "is geocode[1] not a number?");
    });
  });
  describe("getForcastByLatAndLong()", async () => {
    it("Assert if getForcastByLatAndLong() returns an object", () => {
      assert.isObject(forcastLatAndLong, "is not an object?");
    });
  });
});
