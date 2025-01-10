import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const ColorbarComponent = () => {
  const map = useMap();

  useEffect(() => {
    const colorbarControl = L.control({ position: 'bottomright' });

    colorbarControl.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      div.style.width = '150px';
      div.style.padding = '10px';
      div.style.background = 'rgba(255, 255, 255, 0.8)';
      div.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)';
      div.style.borderRadius = '8px';
      div.style.fontFamily = 'Arial, sans-serif';
      div.style.fontSize = '12px';
      div.style.textAlign = 'center';

      const title = L.DomUtil.create('div', 'legend-title', div);
      title.style.fontSize = '14px';
      title.style.fontWeight = 'bold';
      title.style.marginBottom = '10px';
      title.innerText = 'Legend: Air Quality Index';

      const colors = ['#2c7bb6', '#abd9e9', '#ffffbf', '#fdae61', '#d7191c']; // Elegant Blue-Green-Yellow-Orange-Red Palette
      const domains = ['0-50', '51-100', '101-150', '151-200', '201+']; // Legend Ranges

      colors.forEach((color, index) => {
        const legendItem = L.DomUtil.create('div', 'legend-item', div);
        legendItem.style.display = 'flex';
        legendItem.style.alignItems = 'center';
        legendItem.style.marginBottom = '5px';

        const colorBox = L.DomUtil.create('div', 'color-box', legendItem);
        colorBox.style.width = '20px';
        colorBox.style.height = '20px';
        colorBox.style.marginRight = '10px';
        colorBox.style.backgroundColor = color;
        colorBox.style.border = '1px solid #000';

        const label = L.DomUtil.create('span', 'legend-label', legendItem);
        label.innerText = domains[index];
        label.style.flex = 1;
        label.style.textAlign = 'left';

        div.appendChild(legendItem);
      });

      return div;
    };

    colorbarControl.addTo(map);

    return () => {
      map.removeControl(colorbarControl);
    };
  }, [map]);

  return null;
};

export default ColorbarComponent;
