import './App.css';
import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi'

function App() {

  //Set States for data
  const [location, setLocation] = useState("")
  const [degrees, setDegrees] = useState(null)
  const [description, setDescription] = useState("")
  const [icon, setIcon] = useState("")
  const [humidity, setHumidity] = useState(null)
  const [wind, setWind] = useState(null)
  const [country, setCountry] = useState("")

  //Set user Location
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const getuserPosition = () => {
    //Get user District
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log(position);
        const latitude = position.coords.latitude;
        setLat(latitude);
        const longitude = position.coords.longitude;
        setLon(longitude)
      },
    );
  }

  const urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;



  const fetchDataWeatherDefault = async () => {
    try {
      const response = await fetch(urlApi);
      const data = await response.json();

      setLocation(data.name)
      setDegrees(data.main.temp)
      setDescription(data.weather[0].description)
      setIcon(data.weather[0].icon)
      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setCountry(data.sys.country)

    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchDataWeatherDefault();
    getuserPosition();
  }, []);

  //Trigger fetch for location search

  const getInputValue = async (e) => {
    e.preventDefault()
    //We can set the value to state setLocation(e.target.elements.localization.value)
    let searchValue = e.target.elements.district.value;
    try {

      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
      const data = await response.json();

      setDegrees(data.main.temp)
      setLocation(data.name)
      setDescription(data.weather[0].description)
      setIcon(data.weather[0].icon)
      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setCountry(data.sys.country)

    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className="App">
      <div className='weather'>
        <form onSubmit={getInputValue}>
          <div className="input">
            <input type={"text"} name="district" placeholder="Please enter location" className="input_value" />
            <span className="input_icon">
              <FiSearch />
            </span>
          </div>
        </form>

        <div className='weather_display'>
          <h3 className='weather_location'>Weather in {location}</h3>

          <div>
            <h1 className='weather_degrees'>{degrees} °C</h1>
          </div>

          <div className='weather_description'>
            <div >
              <div className='weather_description_head'>
                <span className='weather_icon'>
                  <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather icon" />
                </span>
                <h3>{description}</h3>
              </div>

              <h3>Humidity: {humidity}%</h3>
              <h3>Wind speed: {wind} m/s</h3>
            </div>

            <div className='weather_country'>
              <h3>{country}</h3>
              <h2 className='weather_date'>4/30/2022, 2:05:24 PM</h2>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;