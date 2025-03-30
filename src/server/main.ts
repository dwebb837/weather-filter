import express from "express";
import bodyParser from "body-parser";
import ViteExpress from "vite-express";
import axios from 'axios';

const app = express();
app.use(bodyParser.json());

type HistoryLog = {
  city: string;
  country: string;
};

const history: HistoryLog[] = [];

app.get('/api/weather', async (req, res) => {
  const city = String(req.query.city) ?? "";
  const country = String(req.query?.country) ?? "";
  if (city === "")
    res.status(400).json("Invalid City!");
  const url = `http://api.weatherapi.com/v1/current.json?key=c38d8cdf83eb4acd89f162231253003&q=${city}&aqi=no`;
  const response = await axios.get(url);
  if (response.status !== 200)
    res.status(400).json("Error while fetching weather info!");
  else {
    res.status(200).json({
      temperature: response.data.current.temp_c,
      humidity: response.data.current.humidity,
      condition: response.data.current.condition
    });
    history.push({ city, country });
  }
});

app.get('/api/history', (req, res) => {
  res.status(200).json(history);
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
