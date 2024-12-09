import React,{useEffect,useState}from 'react';
import { MapContainer, TileLayer, Marker, Popup ,GeoJSON,useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
//import geodata from './india_district_states.json';   //contains all state and district border
//import geodata1 from './india_district.json';
import geodata2 from './State.json';               //Karnataka state border
import geodata3 from './District.json';            //District border
import geodata4 from './Taluk.json';               //Taluk border
import styles from './my_styles.module.css';
import fetchWeather from './weatherApi';  // Import the fetchWeather function
import DistrictDropdown from './DistrictDropdown'; // Importing the DistrictDropdown component



// Fix for marker icons not appearing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


//district borders
const getStyle = (feature) => {
  const isDistrict = feature.properties.TYPE_2 === 'District';
  return {
    fillColor: 'transparent', // No fill color
    weight: isDistrict ? 1 :0, // Thicker for states, thinner for districts
    opacity: 1,
    color: 'blue',
    dashArray: isDistrict ? '3' :null , // Dashed for districts
    fillOpacity: 1 // No fill color
  };
};



// Style function for GeoJSON features
// const getStyle = (feature) => {
//   return {
//     fillColor: 'white', // No fill color
//     weight: feature.properties.type === 'state' ? 2 : 1, // Thicker for states
//     opacity: 1,
//     color: 'black',
//     dashArray: feature.properties.type === 'district' ? '4' : null, // Dashed for districts
//     fillOpacity: 1 // No fill color
//   };
// };


//states border
const style = () => {
  return {
    fillColor: 'transparent', // No fill color
    weight: 2, // Border thickness
    opacity: 1,
    color: 'black', // Border color
    dashArray: '1',
    fillOpacity: 0 // Ensure fillOpacity is 0 to avoid any fill
  };
};

const MyMap = () => {
  //map coordinates
 // const position = [28.6139, 77.2090]; // New Delhi coordinates
 // Initial position for the marker (you can set this to your preferred initial coordinates)
 const [position, setPosition] = useState([20.5937, 78.9629]); // Center of India
 const [zoomLevel, setZoomLevel] = useState(4.5);  // Default zoom level
 const [weather, setWeather] = useState(null); // To store the weather data
 const [loading, setLoading] = useState(false); // To show loading state

  // Function to handle when the marker drag ends
  const handleDragEnd = async (event) => {
    const { lat, lng } = event.target.getLatLng();
    setPosition([lat, lng]); // Update the position state

    setLoading(true); // Set loading state to true while fetching data
    try {
      const weatherData = await fetchWeather(lat, lng); // Fetch weather data for the new coordinates
      setWeather(weatherData); // Set the fetched weather data to state
    } catch (error) {
      setWeather(null); // In case of error, set weather to null
    }
    setLoading(false); // Set loading state to false once data is fetched
  };

// Fetch weather data when the component mounts
useEffect(() => {
  const fetchWeatherData = async () => {
    try {
      const weatherData = await fetchWeather(20.5937, 78.9629); // Pass coordinates for the weather data
      setWeather(weatherData);  // Store the fetched weather data in the state
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };
  fetchWeatherData(); // Call the fetchWeather function
  }, []); // Empty dependency array to call only on mount


  const [showState, setShowState] = useState(false); // Toggle for State layer
  const [showDistrict, setShowDistrict] = useState(false); // Toggle for District layer
  const [showTaluk, setShowTaluk] = useState(false); // Toggle for Taluk layer

  const handleToggleState = () => {
    setShowState((prev) => !prev);
  };

  const handleToggleDistrict = () => {
    setShowDistrict((prev) => !prev);
  };

  const handleToggleTaluk = () => {
    setShowTaluk((prev) => !prev);
  };

 // Function to handle district selection and zoom to the district's coordinates
 const handleDistrictSelect = (districtId, latitude, longitude) => {
  console.log(`Zooming to district ${districtId} at coordinates: ${latitude}, ${longitude}`);
  setPosition([latitude, longitude]); // Update the position to the selected district's coordinates
  setZoomLevel(9.4); // Adjust the zoom level to zoom into the district (you can modify this)
};

// This component will allow direct manipulation of the map when the position or zoom changes
const MapViewUpdater = () => {
  const map = useMap(); // Get the map instance
  useEffect(() => {
    if (map) {
      map.setView(position, zoomLevel); // Update the map's center and zoom level
    }
  }, [position, zoomLevel, map]); // Re-run when position or zoomLevel changes
  return null; // This component doesn't render anything
};


  return (
    <div>
    <MapContainer center={position} zoom={zoomLevel} scrollWheelZoom={true} style={{height:'100vh',width:'100vh',marginLeft:'50%'}}>
    <MapViewUpdater />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* <Marker position={position}> */}
      <Marker
          position={position}
          draggable={true} // Make the marker draggable
          eventHandlers={{
            dragend: handleDragEnd, // Update position when dragging ends
          }}
        >
      <Popup>
            Current coordinates: {position[0].toFixed(4)}, {position[1].toFixed(4)}
            {weather ? (
              <div>
                <h3>Weather Information</h3>
                <p><strong>Location:</strong> {weather.name}</p>
                <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
                <p><strong>Weather:</strong> {weather.weather[0].description}</p>
                <p><strong>Humidity:</strong> {weather.main.humidity} %</p>
                <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
              </div>
            ) : (
              <p>Loading weather data...</p>
            )}
          </Popup>
      </Marker>
      {/* <GeoJSON data={geodata} style={getStyle}/>
      <GeoJSON data={geodata1} style={style}/> */}
      {showState && <GeoJSON data={geodata2} />}
      {showDistrict && <GeoJSON data={geodata3}/>}
      {showTaluk && <GeoJSON data={geodata4}/>}       
    </MapContainer>

    <div className={styles.DistrictDropdown}>
      {/* Use the DistrictDropdown component here and pass the handleDistrictSelect callback */}
    <DistrictDropdown onDistrictSelect={handleDistrictSelect} />
    </div>
    

    <div className={styles.buttonContainer}>
        <button  onClick={handleToggleState}>
          {showState ? 'Hide State Layer' : 'Show State Layer'}
        </button>
        <button  onClick={handleToggleDistrict}>
          {showDistrict ? 'Hide District Layer' : 'Show District Layer'}
        </button>
        <button  onClick={handleToggleTaluk}>
          {showTaluk ? 'Hide Taluk Layer' : 'Show Taluk Layer'}
        </button>
      </div>
    </div>
  );
};

export default MyMap;