const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((flyOverTimes) => {
    for (const time of flyOverTimes) {
      const date = new Date(0);
      date.setUTCSeconds(time.risetime);
      const duration = time.duration;
      console.log(`Next pass at ${date} for ${duration} seconds!`);
    }
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });

