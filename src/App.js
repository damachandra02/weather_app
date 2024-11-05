import React,{useEffect,useState}from 'react';
import { MapContainer, TileLayer, Marker, Popup ,GeoJSON} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
//import geodata from './india_district_states.json';   //contains all state and district border
//import geodata1 from './india_district.json';
import geodata2 from './State.json';               //Karnataka state border
import geodata3 from './District.json';            //District border
import geodata4 from './Taluk.json';               //Taluk border
import styles from './my_styles.module.css';

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
  const position = [20.5937, 78.9629]; // Center of India coordinates

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


  return (
    <div>
    <MapContainer center={position} zoom={4.5} scrollWheelZoom={false} style={{height:'100vh',width:'100vh',marginLeft:'50%'}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      {/* <GeoJSON data={geodata} style={getStyle}/>
      <GeoJSON data={geodata1} style={style}/> */}
      {showState && <GeoJSON data={geodata2} />}
      {showDistrict && <GeoJSON data={geodata3}/>}
      {showTaluk && <GeoJSON data={geodata4}/>}       
    </MapContainer>
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