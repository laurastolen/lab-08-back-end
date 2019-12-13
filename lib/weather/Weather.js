'use strict';

function Weather(forecast, time) {
  this.time = new Date(time * 1000).toDateString();
  this.forecast = forecast;
}

module.exports = Weather;
