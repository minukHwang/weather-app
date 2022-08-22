import "./App.scss";
import { useEffect } from "react";
import { useState } from "react";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";
import { Alert } from "react-bootstrap";

function App() {
    const [weather, setWeather] = useState(null);
    const cities = ["San Francisco", "New York", "Paris", "Tokyo"];
    const [loading, setLoading] = useState(false);
    const [city, setCity] = useState("");
    const [apiError, setApiError] = useState("");

    useEffect(() => {
        if (city == "") {
            //console.log("componentDidMount");
            getCurrentLocation();
        } else {
            //console.log("componentDidUpdate");
            getWeatherByCity();
        }
    }, [city]);

    const getCurrentLocation = () => {
        //console.log("getCurrentLocation");
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            getWeatherByCurrentLocation(lat, lon);
        });
    };

    const getWeatherByCity = async () => {
        try {
            //console.log("getWeatherByCity");
            let url = new URL(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3e3a4a3ef231b75a3835d66841455f85&units=metric`) ;
            setLoading(true);
            let response = await fetch(url);
            let data = await response.json();
            if (response.status == 200) {
                setApiError("");
                setWeather(data);
                setLoading(false);
            } else {
                console.log(response)
                throw new Error(data.message);
            }
        } catch (error) {
            console.log("에러가 났다")
            setApiError(error.message);
            setLoading(false);
        }
    };

    const getWeatherByCurrentLocation = async (lat, lon) => {
        try {
            //console.log("getWeatherByCurrentLocation");
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3e3a4a3ef231b75a3835d66841455f85\&units=metric`;
            setLoading(true);
            //console.log("setLoadingTrue");
            let response = await fetch(url);
            let data = await response.json();
            if (response.status == 200) {
                setApiError("");
                setWeather(data);
                //console.log("setWeatherData");
                setLoading(false);
                //console.log("setLoadingFalse");
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setApiError(error.message);
            setLoading(false);
        }
    };

    //console.log("Javascript");

    return (
        <div>
            {/* {console.log("Render")} */}
            {loading ? (
                <div className="container">
                    <ClipLoader color="#ffffff" loading={loading} size={150} />
                    {/* {console.log("LoadingSpinner Render")} */}
                </div>
            ) : apiError == "" ? (
                <div className="container">
                    {/* {console.log("WeatherBoxButton Render")} */}
                    <WeatherBox weather={weather} />
                    <WeatherButton
                        cities={cities}
                        setCity={setCity}
                        city={city}
                    />
                </div>
            ) : (
                <div className="container">
                    <Alert key="danger" variant="danger">
                        {apiError}
                    </Alert>
                </div>
            )}
        </div>
    );
}

export default App;
