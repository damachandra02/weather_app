import React, { useEffect, useState } from 'react';

// Import the districts JSON data
import districtsData from '../data/District.json';  // Adjust the path according to your file location

const DistrictDropdown = ({ onDistrictSelect, selectedDistrictId, setSelectedDistrictId  }) => {
  const [districts, setDistricts] = useState([]);
  
  useEffect(() => {
    // Extract district names and their respective IDs from the imported JSON data
    const districtNames = districtsData.features.map((feature) => ({
      id: feature.id, // "id" is the district ID
      name: feature.properties.name, //  "name" is the district name
      coordinates:feature.geometry.coordinates,
    }));
    setDistricts(districtNames);
  }, []);  
  
  const handleSelectChange = (event) => {
    const selectedDistrictId = event.target.value;
    

    setSelectedDistrictId(selectedDistrictId); // Set the selected district ID
    const selectedCoordinates = districtsData.features.find(
      (feature) => feature.id === selectedDistrictId
    )?.geometry.coordinates;



    // Find the district name by matching the ID from the districts state
  // const selectedDistrict = districts.find(district => district.id === selectedDistrictId);
  // if (selectedDistrict) {
  //   console.log('Selected District Name:', selectedDistrict.coordinates); // Log the selected district's name
  // }

    // const selectedCoordinates = districtCoordinates[selectedDistrictId];

    // Trigger the callback function with the district's ID and coordinates
    if (selectedCoordinates) {
      onDistrictSelect(selectedDistrictId, selectedCoordinates);
    } else {
      console.log('Coordinates not found for district ID:', selectedDistrictId);
    }
  };

  return (
    <div >
      <h2>Select District</h2>
      <select onChange={handleSelectChange} value={selectedDistrictId}>
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
