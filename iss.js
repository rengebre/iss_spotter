const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);

      return;
    }

    try {
      const data = JSON.parse(body);
      callback(null, data.ip);
    } catch (e) {
      callback(Error(e), null);
    }
  });
};

const fetchCoordsByIP = function(ipAddress, callback) {
  request(`https://freegeoip.app/json/${ipAddress}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);

      return;
    }

    try {
      const data = JSON.parse(body);
      const latitude = data.latitude;
      const longitude = data.longitude;
      callback(null, { latitude, longitude });
    } catch (e) {
      callback(Error(e), null);
    }

  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching fly over data. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    try {
      const data = JSON.parse(body);
      callback(null, data.response);
    } catch (e) {
      callback(Error(e), null);
    }
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes
};