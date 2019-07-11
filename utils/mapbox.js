const config = require("../config")("development");
const request = require("request");

class mapbox {
  constructor() {
    this.baseUri = config.mapboxBaseUri;
    this.accessToken = config.mapboxAccessToken;
  }
  setAccessToken(token) {
    this.accessToken = token;
  }
  forwardGeocoding(
    endpoint = "mapbox.places",
    search_text = "Los Angeles",
    option,
    callback
  ) {
    let uri = `${this.baseUri}/geocoding/v5/${endpoint}/${encodeURIComponent(
      search_text
    )}.json?access_token=${this.accessToken}`;
    request(uri, { json: true }, (error, response) => {
      if (error) {
        callback(
          { message: "Unable to connect to mapbox service", code: 501 },
          undefined
        );
      } else if (response.statusCode === 401) {
        callback({ message: "Unauthorized", code: 401 }, undefined);
      } else {
        callback({ message: "Success", code: 200 }, response);
      }
    });
  }
}

module.exports = new mapbox();
