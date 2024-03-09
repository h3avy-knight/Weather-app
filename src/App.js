import "./App.css";
import { FaBatteryFull } from "react-icons/fa";
import { PiCellSignalHighBold } from "react-icons/pi";
import { IoIosWifi } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import close from "../src/assets/close.png";
import cloud from "../src/assets/clouds.svg";
import cloud1 from "../src/assets/cloud1.png";
import { CiCloud } from "react-icons/ci";

import { HiMenuAlt1 } from "react-icons/hi";
import bg from "../src/assets/bg.png";
import search from "../src/assets/search.png";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const apiKey = "eab8ad5c73df79e46e057ed92329cc16";
  const [location, setLocation] = useState("");
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [weatherinfo, setWeatherInfo] = useState({});
  const [searchClicked, setSearchClicked] = useState(false);
  const [currentLocationData, setCurrentLocationData] = useState({});
  const [open, setOpen] = useState(!false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (location) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
      axios.get(url).then((response) => {
        if (response.status === 200) {
          setWeatherInfo(response.data);
          setSearchClicked((state) => !state);
          setLocation("");
        }
      });
    }
  };
  // console.log(weatherinfo);

  // console.log({ position });

  const getCurrentLocationWeatherData = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${apiKey}`
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setCurrentLocationData(res.data);
        }
      });
  };
  useEffect(() => {
    if (position.latitude && position.longitude)
      getCurrentLocationWeatherData();
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, [getCurrentLocationWeatherData()]);
  return (
    <div>
      {open ? (
        <header className="App-header">
          <nav className="nav">
            <p className="nav_time">9:41</p>
            <div className="nav_indicator">
              <PiCellSignalHighBold />
              <IoIosWifi style={{ marginRight: "5px" }} />
              <FaBatteryFull />
            </div>
          </nav>
          <main className="main">
            <div className="main_live">
              <div onClick={() => setOpen((state) => !state)}>
                <img src={close} />
              </div>
              <button className="live_button">LIVE</button>
            </div>
            <div className="main_billbord">
              <p className="main_location">
                <MdLocationOn />
                CURRENT LOCATION
              </p>
            </div>
          </main>
          {currentLocationData.name ? (
            <h1 className="main_heading">
              {currentLocationData?.name},
              <br /> {currentLocationData.sys.country}
            </h1>
          ) : (
            ""
          )}
        </header>
      ) : (
        <header className="App-header_main">
          <nav className="nav">
            <p className="nav_time_main">9:41</p>
            <div className="nav_indicator">
              <PiCellSignalHighBold color="#000" />
              <IoIosWifi style={{ marginRight: "5px" }} color="#000" />
              <FaBatteryFull color="#000" />
            </div>
          </nav>
          <main className="main">
            <div className="main_live">
              <div onClick={() => setOpen((state) => !state)}>
                <HiMenuAlt1 color="#000" />
              </div>
              {searchClicked ? (
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Search..."
                    style={{
                      border: "none",
                      outline: "none",
                      padding: "20px",
                      color: "gray",
                      fontSize: 20,
                    }}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </form>
              ) : (
                <div onClick={() => setSearchClicked((state) => !state)}>
                  <img src={search} />
                </div>
              )}
            </div>
          </main>
          {weatherinfo.name ? (
            <>
              <div className="">
                <div className="main_content">
                  <div className="main_content_left">
                    <p style={{ padding: 0, margin: 0 }}>
                      {weatherinfo.name}
                      <br />
                      {weatherinfo.sys.country}
                    </p>
                    <p className="main_content_left-time">
                      {new Date().getMonth()} /{new Date().getDate()} /{" "}
                      {new Date().getFullYear()}
                    </p>
                    <div className="main_content_left-bg-image">
                      <img src={cloud} alt="" />
                      <p className="main_content_left-cloudy">
                        {weatherinfo.weather[0].description}
                      </p>
                    </div>
                  </div>
                  <div className="bg_main">
                    <img src={bg} alt="" />
                    <button className="main_content_left-button">Live</button>
                  </div>
                </div>
              </div>
              <div className="main_content_forcast">
                <div className="main_content_forcast-content">
                  <p className="main_content_forcast-content_data">12:00</p>
                  <CiCloud />
                  <p className="main_content_forcast-content_data">24</p>
                </div>
                <div className="main_content_forcast-content">
                  <p className="main_content_forcast-content_data">12:00</p>
                  <CiCloud />
                  <p className="main_content_forcast-content_data">24</p>
                </div>
                <div className="main_content_forcast-content">
                  <p className="main_content_forcast-content_data">12:00</p>
                  <CiCloud />
                  <p className="main_content_forcast-content_data">24</p>
                </div>
                <div className="main_content_forcast-content">
                  <p className="main_content_forcast-content_data">12:00</p>
                  <CiCloud />
                  <p className="main_content_forcast-content_data">24</p>
                </div>
                <div className="main_content_forcast-content">
                  <p className="main_content_forcast-content_data">12:00</p>
                  <CiCloud />
                  <p className="main_content_forcast-content_data">24</p>
                </div>
              </div>
              <div
                style={{
                  borderBottom: "1px solid #f1f1f3",
                  margin: "20px 30px",
                }}
              ></div>
              <div className="main_content_additional_info">
                <p>Additional Info</p>
                <div className="main_content_additional_info_box">
                  <div className="main_content_additional_info_content">
                    <p className="main_content_additional_info_heading">
                      Precipitation
                    </p>
                    <p className="main_content_additional_info_para">
                      {weatherinfo.main.pressure}%
                    </p>
                  </div>
                  <div
                    className="main_content_additional_info_content"
                    style={{ margin: "0 18px" }}
                  >
                    <p className="main_content_additional_info_heading">
                      Humidiy
                    </p>
                    <p className="main_content_additional_info_para">
                      {weatherinfo.main.humidity}
                    </p>
                  </div>
                  <div className="main_content_additional_info_content">
                    <p className="main_content_additional_info_heading">
                      Windy
                    </p>
                    <p className="main_content_additional_info_para">
                      {weatherinfo.wind.speed} km/h
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  borderBottom: "1px solid #f1f1f3",
                  margin: "20px 30px",
                }}
              ></div>
            </>
          ) : (
            ""
          )}
        </header>
      )}
    </div>
  );
}

export default App;
