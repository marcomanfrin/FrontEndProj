import React, { useEffect, useState } from "react";

const API_KEY = "c3540be547721be3d08cf1f24a83a1e1";

export default function Meteo({ location }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `api.openweathermap.org/data/2.5/forecast/daily?lat=44.34&lon=10.99&cnt=7&appid=${API_KEY}`
        );
        const data = await res.json();

        if (data.cod !== "200") {
          setError("Weather data not found.");
          return;
        }

        const today = new Date().getDate();
        const filtered = data.list.filter((item) => {
          const itemDate = new Date(item.dt_txt);
          const isToday = itemDate.getDate() === today;
          const isTomorrow = itemDate.getDate() === today + 1;
          return isToday || isTomorrow;
        });

        const grouped = filtered.reduce(
          (acc, item) => {
            const day = new Date(item.dt_txt).getDate();
            if (day === today) acc.today.push(item);
            else acc.tomorrow.push(item);
            return acc;
          },
          { today: [], tomorrow: [] }
        );

        const extractSummary = (items) => {
          const avgTemp =
            items.reduce((sum, item) => sum + item.main.temp, 0) /
            items.length;
          const weatherDesc = items[0].weather[0].description;
          return {
            temp: avgTemp.toFixed(1),
            desc: weatherDesc,
            icon: items[0].weather[0].icon,
          };
        };

        setWeather({
          today: extractSummary(grouped.today),
          tomorrow: extractSummary(grouped.tomorrow),
        });
      } catch (err) {
        setError("Error fetching weather data.");
      }
    };

    fetchWeather();
  }, [location]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!weather) return <div className="text-gray-500">Loading weather...</div>;

  const WeatherCard = ({ title, data }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 m-4 w-64 text-center">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt="weather icon"
        className="mx-auto"
      />
      <p className="text-2xl">{data.temp}°C</p>
      <p className="text-gray-600 capitalize">{data.desc}</p>
    </div>
  );

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center">
      <WeatherCard title="Today" data={weather.today} />
      <WeatherCard title="Tomorrow" data={weather.tomorrow} />
    </div>
  );
}
