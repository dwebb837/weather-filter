import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDebounce } from 'use-debounce';

type WeatherInfo = {
  temperature: string;
  humidity: string;
  condition: {
    text: string;
    icon: string;
    code: number;
  }
}

type HistoryLog = {
  city: string;
  country: string;
};

const App = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);
  const [history, setHistory] = useState<HistoryLog[]>([]);

  const [debouncedCity] = useDebounce(city, 500);
  const [debouncedCountry] = useDebounce(country, 500);

  useEffect(() => {
    if (debouncedCity.length > 0) {
      const fetchWeatherData = async () => {
        let url = '/api/weather?';
        url += `city=${debouncedCity}`;
        if (debouncedCountry.length > 0)
          url += `&country=${debouncedCountry}`;
        const response = await axios.get(url);
        if (response.status === 200) {
          setWeatherInfo(response.data);
        }
      }
      fetchWeatherData();
    }
  }, [debouncedCity, debouncedCountry]);

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await axios.get('/api/history');
      setHistory(response.data);
    }
    fetchHistory();
  }, [weatherInfo]);

  return (
    <div>
      <div>
        <label htmlFor='city'>City *</label>
        <input type='text' id="city" value={city} onChange={(e) => setCity(e.target.value)} />
        <label htmlFor='country'>Country (Optional)</label>
        <input type='text' id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
      </div>
      {weatherInfo && (
        <div>
          <h2>Weather in {debouncedCity}{debouncedCountry.length > 0 ? `, ${debouncedCountry}` : ''}</h2>
          <div className='flex flex-row items-center justify-center gap-3'>
            <img src={weatherInfo.condition.icon} />
            <div className='flex flex-col items-center justify-between'>
              <div>Temperature: {weatherInfo.temperature}°C</div>
              <div>Humidity: {weatherInfo.humidity}</div>
              <div>Condition: {weatherInfo.condition.text}</div>
            </div>
          </div>
        </div>
      )}
      <div>
        Filter History:
        {history.map((log, index) => {
          return (<div key={index}>{index + 1}: City: {log.city}{log.country !== 'undefined' ? `, Country: ${log.country}` : ''}</div>)
        })}
      </div>
    </div>
  );
};

export default App;
