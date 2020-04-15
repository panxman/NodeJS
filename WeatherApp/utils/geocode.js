const request = require("postman-request");

// MapBox
const mapboxToken =
  "pk.eyJ1IjoicGFueG1hbjEiLCJhIjoiY2s4d2lrcnVhMGhlejNuc2I1dzhoZHJpNiJ9.vil0yuQud56QuaJ-GmLkow";

const geocode = (address, callback) => {
  const geocodeURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=" +
    mapboxToken;

  request(geocodeURL, { json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to MapBox Geocoding.", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find geocoding for given location.", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
