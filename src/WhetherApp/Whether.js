import React from "react";
import "./style.css";
import axios from "axios";
import { FaCloudRain } from 'react-icons/fa';

const Whether = () => {
  const [city, setCity] = React.useState();
  const [data, setData] = React.useState({
    whether: "",
    description: "",
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    humidity: 0,
    sunrise: 0,
    sunset: 0,
    country: "",
  });
  console.log("data is", data);

  const submitHandler = () => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=87315b018b38bdd3fc03e6794a64e661`
      )
      .then((response) => {
        console.log(response.data);
        setData({
          whether: response.data.weather[0].main,
          description: response.data.weather[0].description,
          temp: response.data.main.temp,
          temp_max: response.data.main.temp_max,
          temp_min: response.data.main.temp_min,
          humidity: response.data.main.humidity,
          sunrise: response.data.sys.sunrise,
          sunset: response.data.sys.sunset,
          country: response.data.sys.country,
        });
      });
    // setCity("");
  };
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}-${month}-${year}`;
  console.log(currentDate); // "17-6-2022"
  return (
    <div>
      <div id="parent">
        <div id="child">
          <h1 className="location">
            {" "}
            <i class="fas fa-street-view"></i>{" "}
          </h1>
          <label> Enter City </label>
          <br></br>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {/* <br> </br> */}
          <button className="btn btn-primary" onClick={submitHandler}>
            {" "}
            search{" "}
          </button>
          <h2 style={{ marginTop: "30px" }}>{data.whether}</h2>{" "}
          {data.whether == "Clouds" && (
            <h1>
              {" "}
              <i class="fas fa-cloud" style={{ color: "#bdd0e7" }}></i>{" "}
            </h1>
          )}
          {data.whether == "sun" && (
            <h1>
              {" "}
              <i className="fas fa-sun" style={{ color: "#eccc68" }}></i>{" "}
            </h1>
          )}
          {data.whether == "Rain" && (
            <h1 style={{ color:"white"}}>
                <FaCloudRain />
            </h1>
          )} 
          
          <h6> {data.description}</h6>
          <h2> {data.humidity}&#x2103;</h2>
          <h4> 
                Min {data.temp_min}&#x2103; | Max {data.temp_max}&#x2103;</h4> 
          <h4>  {data.country} ||{city}</h4>
          <h6>Date : {currentDate}</h6>
          <i 
                // style={{ color: "#eccc68" }}
                className="fas fa-rain"
              ></i>           
        </div>
      </div>
    </div>
  );
};

export default Whether;
