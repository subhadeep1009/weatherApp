import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { PiWindFill } from "react-icons/pi";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const App = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [city, setCity] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("01d");

  const fetchWeather = async () => {
    if (!search) {
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`,
      );
      if (data.cod === 200 || data.cod === "200") {
        setLoading(false)
        setTemperature(data.main.temp);
        setHumidity(data.main.humidity);
        setWindSpeed(data.wind.speed);
        setCity(data.name);
        setWeatherIcon(data.weather[0].icon);
      }
    } catch (error) {
      console.log(error);
      setTemperature(null);
      setHumidity(null);
      setWindSpeed(null);
      setCity("City not found");
      setWeatherIcon("01d");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-tl from-black to-cyan-900 h-screen w-full">
      {/* Main card section */}
      <div className="h-4/5 w-100 rounded-3xl bg-gradient-to-br from-blue-950 to-black border-emerald-500 border-5">
        {/* Search bar */}
        <div className="flex justify-center mt-18">
          {/* Relative add */}
          <div className="relative w-2/3">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="bg-white px-4 pr-10 w-full rounded-full outline-none p-2"
            />

            <button
              onClick={fetchWeather}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <FaSearch className="text-gray-500" />
            </button>
          </div>
        </div>
        {/*Image section*/}
        <div className="justify-center flex mt-5">
          <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="weather icon" className="w-32" />
        </div>
        {/* Temperature and location */}
        <div className="items-center flex flex-col">
          <h1 style={{ fontFamily: "Playwrite IE" }} className="text-white font-semibold text-2xl mt-2">{loading?"Loading...":temperature!==null?`${temperature}ºC`:"-----"}</h1>
          <h2 style={{ fontFamily: "Bona Nova SC" }} className="text-white text-3xl mt-1">{city||"Type to check weather"}</h2>
        </div>
        {/* Humadity and wind speed */}
        <div className="flex justify-between px-10 mt-12">
          <div className="items-center flex flex-col">
            <WiHumidity className="text-yellow-300 text-3xl" />
            <h2 style={{ fontFamily: "Cairo" }} className="text-white">{humidity!==null?`${humidity}%`:"--"}</h2>
            <h2 style={{ fontFamily: "Courgette" }} className="text-pink-500">Humidity</h2>
          </div>
          <div className="items-center flex flex-col">
            <PiWindFill className="text-blue-400 text-3xl" />
            <h2 style={{ fontFamily: "Cairo" }} className="text-white">{windSpeed!==null?`${windSpeed}km/h`:"--"}</h2>
            <h2 style={{ fontFamily: "Courgette" }} className="text-pink-500">Wind Speed</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
