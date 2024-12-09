import axios from 'axios';

// Function to fetch weather data based on latitude and longitude
const fetchWeather = async (lat, lon) => {
  const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY; // API key from .env file

  if (!API_KEY) {
    console.error('API key is missing! Please check your .env file');
    return;
  }

  //console.log('API Key:', API_KEY);  // Log the API key to verify it is loaded correctly
  
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    return response.data; // Return the weather data
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error; // Rethrow the error to handle it in the calling component
  }
};

export default fetchWeather;
