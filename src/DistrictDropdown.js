import React, { useEffect, useState } from 'react';

// Import the districts JSON data
import districtsData from './District.json';  // Adjust the path according to your file location

const DistrictDropdown = ({ onDistrictSelect }) => {
  const [districts, setDistricts] = useState([]);

  // Hardcoded district coordinates (these should correspond to district IDs)
  //used for zooming in on district
  const districtCoordinates = {
    "ID_00000": { latitude: 15.8497, longitude: 74.4977 }, // Belagavi
    "ID_00001": { latitude: 16.1814, longitude: 75.6952 }, // Bagalkot
    "ID_00002": { latitude: 16.8302, longitude: 75.7100 }, // Vijayapura
    "ID_00003": { latitude: 17.3297, longitude: 76.8343 }, // Kalaburagi
    "ID_00004": { latitude: 17.9139, longitude: 77.5047 }, // Bidar
    "ID_00005": { latitude: 16.2076, longitude: 77.3463 }, // Raichur
    "ID_00006": { latitude: 15.3477, longitude: 76.1540 }, // Koppal
    "ID_00007": { latitude: 15.4293, longitude: 75.6245 }, // Gadag
    "ID_00008": { latitude: 15.4589, longitude: 75.0078 }, // Dharwad
    "ID_00009": { latitude: 14.8833, longitude: 74.5833 }, // Uttara Kannada
    "ID_00010": { latitude: 14.7934, longitude: 75.4042 }, // Haveri
    "ID_00011": { latitude: 15.1394, longitude: 76.9214 }, // Ballari
    "ID_00012": { latitude: 14.2266, longitude: 76.4006 }, // Chitradurga
    "ID_00013": { latitude: 14.4641, longitude: 75.9210 }, // Davanagere
    "ID_00014": { latitude: 13.9299, longitude: 75.5681 }, // Shivamogga
    "ID_00015": { latitude: 13.3409, longitude: 74.7421 }, // Udupi
    "ID_00016": { latitude: 13.3152, longitude: 75.7751 }, // Chikkamagaluru
    "ID_00017": { latitude: 13.3392, longitude: 77.1135 }, // Tumakuru
    "ID_00018": { latitude: 13.1362, longitude: 78.1291 }, // Kolar
    "ID_00019": { latitude: 12.9716, longitude: 77.5946 }, // Bengaluru (Urban)
    "ID_00020": { latitude: 13.2312, longitude: 77.4407 }, // Bengaluru (Rural)
    "ID_00021": { latitude: 12.5210, longitude: 76.8973 }, // Mandya
    "ID_00022": { latitude: 13.0079, longitude: 76.0946 }, // Hassan
    "ID_00023": { latitude: 12.8708, longitude: 74.8429 }, // Dakshina Kannada
    "ID_00024": { latitude: 12.3375, longitude: 75.8069 }, // Kodagu
    "ID_00025": { latitude: 12.2958, longitude: 76.6394 }, // Mysuru
    "ID_00026": { latitude: 11.9239, longitude: 76.9405 }, // Chamarajanagar
    "ID_00027": { latitude: 13.4357, longitude: 77.7270 }, // Chikkaballapura
    "ID_00028": { latitude: 12.7164, longitude: 77.2814 }, // Ramanagara
    "ID_00029": { latitude: 16.7709, longitude: 77.1376 }, // Yadgir
    "ID_00030": { latitude: 14.9501, longitude: 76.0776 }  // Vijayanagara
};
    


  useEffect(() => {
    // Extract district names and their respective IDs from the imported JSON data
    const districtNames = districtsData.features.map((feature) => ({
      id: feature.id, // "id" is the district ID
      name: feature.properties.name, //  "name" is the district name
    }));
    setDistricts(districtNames);
  }, []);

  const handleSelectChange = (event) => {
    const selectedDistrictId = event.target.value;
    const selectedCoordinates = districtCoordinates[selectedDistrictId];

    // Trigger the callback function with the district's ID and coordinates
    if (selectedCoordinates) {
      onDistrictSelect(selectedDistrictId, selectedCoordinates.latitude, selectedCoordinates.longitude);
    } else {
      console.log('Coordinates not found for district ID:', selectedDistrictId);
    }
  };

  return (
    <div >
      <h2>Select District</h2>
      <select onChange={handleSelectChange}>
        <option value="">--Select a District--</option>
        {districts.map((district) => (
          <option key={district.id} value={district.id}>
            {district.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DistrictDropdown;
