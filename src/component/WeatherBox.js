import React from "react";

const WeatherBox = ({weather}) => {
    //console.log("WeatherBox")
    return (
        <div className="weather-box">
            {/* {console.log("WeatherBox Render")} */}
            <div>{weather?.name}</div>
            <h2>{weather?.main.temp}℃ / {((weather?.main.temp + 40)*1.8-40).toFixed(2)}°F </h2>
            <h3>{weather?.weather[0].description}</h3>
        </div>
    );
};

export default WeatherBox;
