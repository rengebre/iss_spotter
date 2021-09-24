const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

const nextISSTimesForMyLocation = function() {
  fetchMyIP((error, ipAddress) => {
    if (error) {
      console.log(`Error retrieving IP: ${error}`);
    } else {
      fetchCoordsByIP(ipAddress, (error, geoData) => {
        if (error) {
          console.log(`Error retrieving geo data, ${error}`);
        } else {
          fetchISSFlyOverTimes(geoData, (error, flyOverTimes) => {
            if (error) {
              console.log(`Error retrieving fly over times, ${error}`);
            } else {
              for (const time of flyOverTimes) {
                const date = new Date(0);
                date.setUTCSeconds(time.risetime);
                const duration = time.duration;
                console.log(`Next pass at ${date} for ${duration} seconds!`);
              }
            }
          });
        }
      });
    }
  });
};

nextISSTimesForMyLocation();