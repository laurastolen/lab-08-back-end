'use strict';

function Location(city, geoData) {
  // eslint-disable-next-line camelcase
  this.search_query = city;
  // eslint-disable-next-line camelcase
  this.formatted_query = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}

module.exports = Location;
