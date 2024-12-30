import React, { useEffect, useState } from 'react';
import talukData from '../data/Taluk1.json'; // Assuming this contains all taluk data
import districtsData from '../data/District.json';  // Adjust the path according to your file location

const DistrictDropdown = ({
  onSelect,
  onDistrictSelect,
  selectedDistrictId,
  setSelectedDistrictId,
  setHighlightedTaluks // New state to highlight taluks on map
}) => {
  const [districts, setDistricts] = useState([]);
  //const [taluks, setTaluks] = useState([]);

  // Fetch and set district data on component mount
  useEffect(() => {
    const districtNames = districtsData.features.map((feature) => ({
      id: feature.id, // "id" is the district ID
      name: feature.properties.name, // "name" is the district name
      coordinates: feature.geometry.coordinates, // Coordinates for the district
    }));
    setDistricts(districtNames);

    // Log all district IDs and names when the districts are loaded
    districtNames.forEach(district => {
      //console.log('District ID:', district.id, 'District Name:', district.name);
    });
  }, []);

 // Whenever the selected district changes, filter taluks for that district
// useEffect(() => {
//   if (selectedDistrictId) {
//     const filteredTaluks = talukData.features.filter(
//       (feature) => feature.district_id === selectedDistrictId // Assuming relationship exists as district_id
//     );
//     //setTaluks(filteredTaluks);

//     // Highlight the taluks on map by passing the filtered taluks to the parent
//     setHighlightedTaluks(filteredTaluks);
//   } else {
//     //setTaluks([]);
//     setHighlightedTaluks([]); // Reset highlighted taluks when no district is selected
//   }
// }, [selectedDistrictId, setHighlightedTaluks]);

  // Handle district selection change
  // const handleSelectChange = (event) => {
  //   const selectedDistrictId = event.target.value;
  //   setSelectedDistrictId(selectedDistrictId); // Set the selected district ID

  //   if (onSelect) {
  //     onSelect(selectedDistrictId); // Call onSelect function passed from parent
  //   }

  //   const selectedCoordinates = districtsData.features.find(
  //     (feature) => feature.id === selectedDistrictId
  //   )?.geometry.coordinates;

  //   if (selectedCoordinates) {
  //     onDistrictSelect(selectedDistrictId, selectedCoordinates); // Trigger callback with selected district ID and coordinates
  //   } else {
  //     console.log('Coordinates not found for district ID:', selectedDistrictId);
  //   }

  //   // Clear previously highlighted taluks before setting the new ones
  //   const filteredTaluks = talukData.features.filter(
  //     (feature) => feature.district_id === selectedDistrictId
  //   );
  //   setHighlightedTaluks(filteredTaluks); // Set the new highlighted taluks
    
  // };

  // Handle taluk selection change
  // const handleTalukChange = (event) => {
  //   const talukId = event.target.value;
  //   setSelectedTalukId(talukId); // Set the selected taluk ID

  //   onDistrictSelect(selectedDistrictId, talukId); // Notify parent about the selected taluk
  // };

  const handleSelectChange = (event) => {
    const selectedDistrictId = event.target.value;
    setSelectedDistrictId(selectedDistrictId); // Update selected district ID

    if (onSelect) {
      onSelect(selectedDistrictId); // Update parent state for district selection
    }

    const selectedDistrict = districtsData.features.find(
      (feature) => feature.id === selectedDistrictId
    );

    if (selectedDistrict) {
      
      // Clear previously highlighted taluks before setting the new ones
      setHighlightedTaluks([]); // This is crucial to remove previously highlighted taluks

      // Pass the selected district coordinates to the parent component
      onDistrictSelect(selectedDistrictId, selectedDistrict.geometry.coordinates);
      
      // Filter taluks for the selected district and update the map
      const filteredTaluks = talukData.features.filter(
        (feature) => feature.district_id === selectedDistrictId // Assuming taluks have "district_id" property
      );
      setHighlightedTaluks(filteredTaluks); // Update the highlighted taluks
    } else {
      setHighlightedTaluks([]); // Clear taluks if no district is selected
    }
  };

  return (
    <div>
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
