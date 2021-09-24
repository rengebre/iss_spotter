const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(ipAddress) {
  return request(`https://freegeoip.app/json/${JSON.parse(ipAddress).ip}`);
};

const fetchISSFlyOverTimes = function(coords) {
  return request(`https://iss-pass.herokuapp.com/json/?lat=${JSON.parse(coords).latitude}&lon=${JSON.parse(coords).longitude}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };