'use strict';

const client = require('../../client');
const superagent = require('superagent');


// function locationHandler(req, res) {
//   let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.data}&key=${process.env.GEOCODE_API_KEY}`;

//   let sql = 'SELECT * FROM location WHERE city=$1;';
//   let city = req.query.data;
//   let safeValues = [city];

//   client.query(sql, safeValues)
//     .then(results => {
//       console.log(results.rowcount);
//       if (results.rowcount > 0) {
//         res.send(results.rows[0]);
//       } else {
//         console.log('in the else');
//         superagent.get(url)
//           .then(data => {
//             const geoData = data.body;
//             // req.query.data is the city name
//             let latitude = geoData.results[0].geometry.location.lat;
//             let longitude = geoData.results[0].geometry.location.lng;

//             const locationObj = new Location(city, geoData);
//             let sql = 'INSERT INTO location (city, latitude, longitude) VALUES ($1, $2, $3);';
//             let safeValues = [city, latitude, longitude];

//             client.query(sql, safeValues);
//             res.send(locationObj);
//           })
//           .catch((error) => {
//             res.status(500).send(error);
//           });
//       }
//     })
//     .catch((err) => console.error(err));
// }

module.exports = locationHandler;
