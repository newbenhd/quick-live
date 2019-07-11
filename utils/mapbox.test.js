const mapbox = require("./mapbox");
const { assert } = require("chai");

describe("--> mapbox module test <--", () => {
  describe("forwardGeocoding() test", () => {
    it("should have response with default", () => {
      mapbox.forwardGeocoding(undefined, undefined, {}, (error, response) => {
        // if (error) throw error;
        assert.isObject(response, "is not an object?");
      });
    });
    it("should have response with search_text", () => {
      mapbox.forwardGeocoding(
        undefined,
        "San Francisco",
        {},
        (error, response) => {
          // if (error) throw error;
          assert.isObject(response, "is not an object?");
        }
      );
    });
    it("should handle unable to connect 501", () => {
      mapbox.forwardGeocoding(
        undefined,
        "San Francisco",
        {},
        (error, response) => {
          assert.equal(error.code, 501, "is not code 501?");
        }
      );
    });

    it("should handle unauthorized error 401", () => {
      mapbox.setAccessToken("random-asdjfklaskdfj");
      mapbox.forwardGeocoding(
        undefined,
        "San Francisco",
        {},
        (error, response) => {
          assert.equal(error.code, 401, "is not code 401?");
        }
      );
    });
  });
});
