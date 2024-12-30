// heat_map.js
import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet.heat'; // Import leaflet.heat for heatmap
import L from 'leaflet';

// Function to provide heatmap data
const getHeatmapData = () => {
  // Example: Static heatmap points with intensity (latitude, longitude, intensity)
  return [
    [28.7041, 77.1025, 0.5],  // New Delhi
    [19.0760, 72.8777, 0.6],  // Mumbai
    [12.9716, 77.5946, 0.6],  // Bengaluru
    [22.5726, 88.3639, 0.4],  // Kolkata
    [13.0827, 80.2707, 0.8],  // Chennai
    [31.5497, 74.3436, 0.5],  // Lahore
    [17.3854, 78.4867, 0.3],  // Hyderabad
    // Add more coordinates and intensity here
  ];
};

const HeatMap1 = () => {
  const map = useMap(); // Get the map instance
  const [gradient, setGradient] = useState({}); // State to store dynamic gradient

  useEffect(() => {
    // Extract the heatmap data
    const data = getHeatmapData();
    
    // Find the maximum intensity from the data
    const maxIntensity = Math.max(...data.map(item => item[2]));
    
    // Adjust the gradient based on the maximum intensity
    let dynamicGradient = {};
    
    // Example: Adjust the gradient based on maxIntensity
    if (maxIntensity < 0.4) {
      dynamicGradient = {
        0.0: 'blue',
        0.4: 'cyan',
        0.6: 'lime',
        0.8: 'yellow',
        1.0: 'red'
      };
    } else if (maxIntensity < 0.7) {
      dynamicGradient = {
        0.0: 'green',
        0.4: 'yellow',
        0.6: 'orange',
        0.8: 'red',
        1.0: 'blue'
      };
    } else {
      dynamicGradient = {
        0.0: 'lightblue',
        0.2: 'yellow',
        0.4: 'orange',
        0.6: 'red',
        0.8: 'green',
        1.0: 'black'
      };
    }

    setGradient(dynamicGradient); // Update the state with the new gradient

  }, []); // Only run once when the component mounts

  useEffect(() => {
    if (map) {
      // Define the heatmap options with dynamic gradient
      const heatLayer = L.heatLayer(getHeatmapData(), {
        radius: 25,      // Size of the radius (larger is more spread out)
        blur: 15,        // Amount of blur (higher makes the heatmap smoother)
        maxZoom: 4.5,     // Maximum zoom level for heatmap rendering
        gradient: gradient, // Use the dynamic gradient from state
      });

      // Add the heatmap layer to the map
      heatLayer.addTo(map);

      // Cleanup the heatmap layer when the component unmounts
      return () => {
        map.removeLayer(heatLayer);
      };
    }
  }, [map, gradient]); // Re-run the effect when the map is ready or the gradient changes

  return null; // This component doesn't render anything
};

export default HeatMap1;
