const rp = require("request-promise");
const config = require("./config")("development");

class app {
  constructor() {
    this.apiUrl = `${config.darkskyUri}${config.darkskySecretAPI}`;
    this.currentTemperature = "";
    this.currentPrecipProbability = "";
  }
  async getDefaultForecast() {
    try {
      const defaultUri = `${this.apiUrl}/42.3601,-71.0589`;
      const response = await rp({ uri: defaultUri, json: true });
      this.currentTemperature = response.currently.temperature;
      this.currentPrecipProbability = response.currently.precipProbability;
      return response;
      // content = `It is currently ${
      //   response.currently.temperature
      // } degrees out. There is a ${
      //   response.currently.precipProbability
      // }% chance of rain.`;
    } catch (error) {
      throw error;
    }
  }
  async getForecastByLatAndLong(longitude, latitude) {
    try {
      const uri = `${this.apiUrl}/${longitude},${latitude}`;
      const response = await rp({ uri, json: true });
      this.currentTemperature = response.currently.temperature;
      this.currentPrecipProbability = response.currently.precipProbability;
      return response;
    } catch (error) {
      throw error;
    }
  }
  async getGeocode(query = {}) {
    try {
      const response = await rp(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${
          config.mapboxAccessToken
        }`,
        {
          json: true
        }
      );
      return response.features[0].center;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new app();
