// if ('geolocation' in navigator) {
//   console.log('geo ok');
//   navigator.geolocation.getCurrentPosition(async (position) => {
//     let lat, long, weather, air;

//     try {
//       lat = position.coords.latitude;
//       long = position.coords.longitude;
//       document.getElementById('latitude').textContent = lat.toFixed(2);
//       document.getElementById('longitude').textContent = long.toFixed(2);
//     } catch (e) {
//       console.log(e);
//     }
//   });
// }

let lat = 39.571625;
let long = 2.650544;

document.getElementById('lat').textContent = lat;
document.getElementById('long').textContent = long;

const btn = document.getElementById('submit');

async function showWeather() {
  const api_url = `weather/${lat},${long}`;

  const response = await fetch(api_url);
  const json = await response.json();
  console.log(json);
  // console.log(json.weather[0].description);

  const temp = (json.weather_data.main.temp - 273.15).toFixed(0);
  const weatherDescription = json.weather_data.weather[0].description;
  const airQuality = json.data[0].measurements[5].value;
  console.log(airQuality);

  try {
    console.log(airQuality);
    document.getElementById('temp').textContent = temp;
    document.getElementById('summary').textContent = weatherDescription;
    document.getElementById('airquality').textContent = airQuality;
  } catch (e) {
    console.log('something went wrong ' + e);
  }

  const data = { lat, long, temp, airQuality };
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  const db_response = await fetch('/api', options);
  const db_json = await db_response.json();
  console.log(db_json);
}

showWeather();

btn.addEventListener('click', async () => {});
