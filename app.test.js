const app = require("./app");
const { expect, assert } = require("chai");

describe("Weather app API test", () => {
  let value = undefined;
  before(async () => {
    value = await app.printCurrent();
  });
  describe("printCurrent()", () => {
    it("Assert if printCurrent() returns string", () => {
      assert.isString(value, "is not a string?");
    });
    it("Assert if printCurrent() includes current temperature", () => {
      assert.include(
        value,
        app.currentTemperature,
        "does not contain api data current temperature?"
      );
    });
    it("Assert if printCurrent() includes current precipitation probability", () => {
      assert.include(
        value,
        app.currentPrecipProbability,
        "does not contain api data current precipitation probability?"
      );
    });
  });
});
