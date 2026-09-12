import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to dynamically update map center
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom(), { animate: true, duration: 1.5 });
  }, [center, map]);
  return null;
};

const WeatherMap = ({ lat, lon, city }) => {
  const position = [lat, lon];
  const [mapKey, setMapKey] = useState(0); // Force re-render if completely broken

  return (
    <div className="glass-panel map-panel fade-in" style={{ height: '100%', width: '100%', minHeight: '400px', padding: 0, overflow: 'hidden' }}>
      <MapContainer 
        center={position} 
        zoom={10} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%', borderRadius: '24px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <TileLayer
          attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_WEATHER_API_KEY}`}
          opacity={0.65}
        />
        
        <MapUpdater center={position} />
        <Marker position={position}>
          <Popup>
            <div style={{ textAlign: 'center' }}>
              <strong>{city}</strong>
              <br />
              Lat: {lat}, Lon: {lon}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
