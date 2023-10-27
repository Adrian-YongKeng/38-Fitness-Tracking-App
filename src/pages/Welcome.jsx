import { useEffect, useState, useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Quote from '../components/Quote';

export default function Welcome() {
  const [dateTime, setDateTime] = useState(new Date());
  const [city, setCity] = useState('');
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [temperature, setTemperature] = useState(null);
  const [climate, setClimate] = useState('');

  let api_key = "d784639ebc69d146e6216d1257216f72"

  const loginButton = () => {
    navigate('/login');
  }

  useEffect(() => {
    // Fetch the user's geolocation
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        // Use a reverse geocoding API to get the city name
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          setCity(data.address.city);
        } catch (error) {
          console.error('Error fetching city data:', error);
        }
        try {
          const weatherResponse = await fetch(
            // Replace with your preferred weather API's endpoint for current weather data
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`
          );
          const weatherData = await weatherResponse.json();
          setTemperature(weatherData.main.temp); // Update temperature state
          setClimate(weatherData.weather[0].main);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }


      });
    }// Set the time update interval
    const timeInterval = setInterval(() =>
      setDateTime(new Date()), 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, [api_key]);

  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  };
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedTime = dateTime.toLocaleString('en-US', timeOptions);
  const formattedDate = dateTime.toLocaleDateString('en-US', dateOptions);

  return (
    <Container className='text-center mt-3 mb-5'>
      <h1 className="my-3">Welcome to Adrian&apos;s Fitness App!</h1>
      <h3 >Are you ready to embark on an epic fitness journey? 💪</h3>
      <p>Join us in the quest for a healthier, stronger, and happier you! Say goodbye to the couch potato life and hello to adventure, fun, and a body you&apos;ll be proud of.
        Here, we don&apos;t just break a sweat; we break the limits. Whether you&apos;re a gym enthusiast, a yoga master, or just starting your fitness odyssey, we&apos;ve got something special for you.
        Don&apos;t just work out; work it out! Let&apos;s turn those &apos;I can&apos;t&apos; into &apos;I can and I will.&apos;
      </p>
      <p>
        Remember, fitness is not just about the body; it&apos;s about the joy of movement, the thrill of progress, and the energy to live life to the fullest.
        So, lace up those sneakers, grab your workout gear, and let&apos;s conquer this fitness adventure together!
        Your journey to awesomeness begins here. Are you in? 🏋️‍♂️
      </p>
      <br />
      <h6>Today&apos;s date and time:</h6>
      <h5>{formattedDate}</h5>
      <h3 className='text-primary'>{formattedTime}</h3>
      <h6 className="mt-3"><i className="bi bi-cloud text-primary"></i> {climate}</h6>

      <h5 >
        <img src="./src/location.gif" height="40" />
        {city}
        <img src="./src/location.gif" height="40" />
        <br />
        <i className="bi bi-thermometer-half text-danger"></i> {temperature}°C
      </h5>
      <br />
      {!authContext.token && (
        <Button variant="primary" size="lg" onClick={loginButton} className='mb-5'>Login</Button>
      )}
      <br />
      <br />
      <Quote />
      <br />
    </Container>

  );
}
