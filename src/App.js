import React from 'react';
import { MapContainer, TileLayer, Marker, Popup ,GeoJSON} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import geodata from './india_district_states.json';
//import geodata from './india_district.geojson';
import geodata1 from './india_district.json';
console.log(geodata);
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
    weight: isDistrict ? 1 :2, // Thicker for states, thinner for districts
    color: 'black',
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
      <GeoJSON data={geodata} style={getStyle}/>
      <GeoJSON data={geodata1} style={style}/>       
    </MapContainer>
    </div>
  );
};

export default MyMap;
