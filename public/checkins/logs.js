const mymap = L.map('checkinMap').setView([0, 0], 1);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileUrl = 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

async function getData() {
  const res = await fetch('/api');
  const data = await res.json();
  console.log(data);

  data.forEach((el) => {
    const { lat, long, timestamp, temp, airQuality } = el;
    const marker = L.marker([lat, long]).addTo(mymap);
    console.log(lat, long, timestamp);
    const root = document.createElement('div');
    const geo = document.createElement('div');
    const time = document.createElement('div');
    const temperature = document.createElement('div');
    const air = document.createElement('div');
    geo.textContent = `The lat is ${lat.toFixed(2)}, long is ${long.toFixed(
      2
    )}`;
    time.textContent = `the time is ${new Date(timestamp)}`;
    temperature.textContent = `the temperature is ${temp}`;
    air.textContent = `the air quality is ${airQuality}`;

    root.append(geo, time, temperature, air);
    document.body.appendChild(root);
  });
}

getData();
