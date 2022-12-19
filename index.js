const fetch = require('node-fetch');
const express = require('express');
const Datastore = require('nedb');
const sdk = require('api')('@openaq/v2.0#19gckhl8n71bw8');
require('dotenv').config();
console.log(typeof process.env.API_KEY);

const app = express();
const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on ${port}`));

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api/', (req, res) => {
  database.find({}, (err, db) => {
    if (err) {
      res.end();
      return;
    }

    res.send(db);
  });
});

app.post('/api/', (req, res) => {
  const data = req.body;
  console.log(data);
  const timestamp = Date.now();
  data.timestamp = timestamp;
  console.log(data);
  database.insert(data);
  res.json(data);
});

app.get('/weather/:latlong', async (req, res) => {
  //   console.log(req.params);
  const latlong = req.params.latlong.split(',');
  //   console.log(latlong);

  const lat = latlong[0];
  const long = latlong[1];
  //   console.log(lat, long);
  //   console.log(typeof lat);

  const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.API_KEY}`;
  const weather_response = await fetch(weather_url);
  const weather_data = await weather_response.json();
  //   console.log(json);

  async function consData(data) {
    const combineData = {
      data,
      weather_data,
    };
    // console.log(combineData);
    res.json(combineData);
  }

  sdk
    .latest_v1_get_v1_latest_get({
      limit: '100',
      page: '1',
      offset: '0',
      sort: 'desc',
      coordinates: `${lat}%2C${long}`,
      radius: '1000',
      order_by: 'lastUpdated',
      dumpRaw: 'false',
    })
    .then(({ data }) => consData(data.results))
    .catch((err) => console.error(err));
});

// app.get('/air/:latlong', async (req, res) => {
//   //   console.log(req.params);
//   const latlong = req.params.latlong.split(',');
//   //   console.log(latlong);

//   const lat = latlong[0];
//   const long = latlong[1];
//   console.log(lat, long);

// });
