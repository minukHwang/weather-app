import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, setCity, city }) => {
    //console.log("WeatherButton")
    return (
        <div className="weather-button">
            {/* {console.log("WeatherButton Render")} */}
            <Button variant={city == ""?"light":"primary"} onClick={()=>setCity("")}>Current Location</Button>
            {cities.map((item, index) => (
                <Button
                    variant={city == item?"light":"primary"}
                    key={index}
                    onClick={() => setCity(item)}
                >
                    {item}
                </Button>
            ))}
        </div>
    );
};

export default WeatherButton;
