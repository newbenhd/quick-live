const rp = require("request-promise");
const config = require("./config")("development");

class app {
  constructor() {
    this.apiUrl = `https://api.darksky.net/forecast/${
      config.darkskySecretAPI
    }/37.8267,-122.4233`;
    this.currentTemperature = "";
    this.currentPrecipProbability = "";
  }
  async printCurrent() {
    let content = undefined;
    try {
      const response = await rp({ uri: this.apiUrl, json: true });
      this.currentTemperature = response.currently.temperature;
      this.currentPrecipProbability = response.currently.precipProbability;
      content = `It is currently ${
        response.currently.temperature
      } degrees out. There is a ${
        response.currently.precipProbability
      }% chance of rain.`;
    } catch (error) {
      throw error;
    }
    return content;
  }
}

module.exports = new app();
