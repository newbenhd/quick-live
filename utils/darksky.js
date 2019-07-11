const config = require("../config")("development");
const request = require("request");

class darksky {
  constructor() {
    this.baseUri = config.darkskyBaseUri;
    this.secretAPI = config.darkskySecretAPI;
  }
  setSecretAPI(secretAPI) {
    this.secretAPI = secretAPI;
  }
  forecastRequest(latitude = "34.0544", longitude = "-118.2439", callback) {
    const uri = `${this.baseUri}${this.secretAPI}/${latitude},${longitude}`;
    request(uri, { json: true }, (error, response) => {
      if (error) {
        callback(
          {
            message: "Unable to reach forecast service at the time",
            code: 501
          },
          response
        );
      } else if (response.statusCode === 403) {
        callback({ message: "Permission denied", code: 403 }, response);
      } else if (response.statusCode === 400) {
        callback({ message: "Poorly formatted request", code: 400 }, response);
      } else {
        callback(undefined, response);
      }
    });
  }
  create() {}
  read() {}
  update() {}
  delete() {}
}

module.exports = new darksky();
