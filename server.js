'use strict';

// requiring libraries (express, dotenv, cors)
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const client = require('./client');

const Location = require('./lib/location/Location');
// const locationHandler = require('./lib/location/locationhandler');

const Weather = require('./lib/weather/Weather');

// superagent goes and gets API data for us
const superagent = require('superagent');

// invoking express, setting port, using cors
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());



// ----------------ROUTES-------------------

// define location route------------------------------
app.get('/location', locationHandler);

function locationHandler(req, res) {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.data}&key=${process.env.GEOCODE_API_KEY}`;

  let sql = 'SELECT * FROM locations WHERE city=$1;';
  let city = req.query.data;
  let safeValues = [city];

  client.query(sql, safeValues)
    .then(results => {
      // console.log(results.rows);
      if (results.rows.length > 0) {
        return res.send(results.rows[0]);
      } else {
        console.log('in the else');
        superagent.get(url)
          .then(data => {
            const geoData = data.body;
            // req.query.data is the city name
            let latitude = geoData.results[0].geometry.location.lat;
            let longitude = geoData.results[0].geometry.location.lng;

            const locationObj = new Location(city, geoData);
            let sql = 'INSERT INTO locations (city, latitude, longitude) VALUES ($1, $2, $3);';
            let safeValues = [city, latitude, longitude];

            client.query(sql, safeValues);
            res.send(locationObj);
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      }
    })
    .catch((err) => console.error(err));
}

// define weather route--------------------------------
app.get('/weather', weatherHandler);

// weatherHandler, which contains the superagent.get, which contains .then and .catch. The .then uses the constructor to create location instances
function weatherHandler(req, res) {
  let url = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${req.query.data.latitude},${req.query.data.longitude}`;

  let sql = 'SELECT * FROM locations WHERE city=$1;';
  let city = req.query.data;
  let safeValues = [city];

  client.query(sql, safeValues)
    .then(results => {
      console.log(results.rows.length)
    })

  superagent.get(url)
    .then(data => {
      const weatherData = data.body.daily.data.map((value) => new Weather(value.summary, value.time));
      res.send(weatherData);
    });

}

// page not found route
app.get('*', (req, res) => {
  res.status(404);
});


client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`listening on ${PORT}`));
  })
  .catch((err) => console.error(err));
