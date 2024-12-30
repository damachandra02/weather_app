import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet.heat'; // Import leaflet.heat for heatmap
import L from 'leaflet';
import styles from '../assets/my_styles.module.css';
import { getDatabase, ref, onValue } from 'firebase/database'; // Import Firebase database functions

const HeatMap = () => {
  const map = useMap(); // Get the map instance
  const [heatLayer, setHeatLayer] = useState(null); // Track the heatmap layer
  const [showHeatmap, setShowHeatmap] = useState(false); // Control heatmap visibility
  const [heatmapData, setHeatmapData] = useState([]); // Store heatmap data from Firebase

  // Fetch data from Firebase Realtime Database
  useEffect(() => {
    const db = getDatabase(); // Initialize database
    const heatmapRef = ref(db, 'heatmapData'); // Reference to the heatmap data node in Firebase

    // Listen for data changes
    onValue(heatmapRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.values(data).map((item) => [
          item.latitude,
          item.longitude,
          item.intensity,
        ]);
        setHeatmapData(formattedData);
      }
    });
  }, []);

  useEffect(() => {
    if (map) {
      if (showHeatmap && !heatLayer) {
        // Create and add the heatmap layer if it should be shown
        const newHeatLayer = L.heatLayer(heatmapData, {
          radius: 25,      // Size of the radius (larger is more spread out)
          blur: 15,        // Amount of blur (higher makes the heatmap smoother)
          maxZoom: 4.5,    // Maximum zoom level for heatmap rendering
          gradient: {
            0.0: 'blue',   // Low intensity (blue)
            0.2: 'cyan',   // Medium intensity (cyan)
            0.4: 'lime',   // Medium-high intensity (lime)
            0.6: 'yellow', // High intensity (yellow)
            0.8: 'orange', // Very high intensity (orange)
            1.0: 'red'     // Maximum intensity (red)
          },
        });
        newHeatLayer.addTo(map);
        setHeatLayer(newHeatLayer); // Save the heatLayer instance to state
      } else if (!showHeatmap && heatLayer) {
        // Remove the heatmap layer if it should not be shown
        map.removeLayer(heatLayer);
        setHeatLayer(null); // Clear the heatLayer state
      }
    }
  }, [map, heatLayer, showHeatmap, heatmapData]);

  return (
    <div className={styles.HeatMap}>
      <button onClick={() => setShowHeatmap((prev) => !prev)}>
        {showHeatmap ? 'Hide Heatmap' : 'Show Heatmap'}
      </button>
    </div>
  );
};

export default HeatMap;
