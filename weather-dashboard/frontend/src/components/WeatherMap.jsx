import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Map pan/zoom updater
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom(), { animate: true, duration: 1.5 });
  }, [center, map]);
  return null;
};

// User's live location marker with pulsing effect
const UserLocationMarker = () => {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const latlng = [pos.coords.latitude, pos.coords.longitude];
        setPosition(latlng);
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 30000, timeout: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [map]);

  if (!position) return null;

  return (
    <>
      {/* Outer pulse ring */}
      <CircleMarker
        center={position}
        radius={20}
        pathOptions={{
          color: '#818cf8',
          fillColor: '#818cf8',
          fillOpacity: 0.15,
          weight: 1,
          opacity: 0.3,
        }}
      />
      {/* Core dot */}
      <CircleMarker
        center={position}
        radius={7}
        pathOptions={{
          color: '#fff',
          fillColor: '#6366f1',
          fillOpacity: 1,
          weight: 3,
        }}
      >
        <Popup>
          <div style={{ textAlign: 'center', fontWeight: 600 }}>Your Location</div>
        </Popup>
      </CircleMarker>
    </>
  );
};

const OVERLAY_LAYERS = [
  { id: 'none', label: 'No Overlay' },
  { id: 'temp_new', label: 'Temperature' },
  { id: 'precipitation_new', label: 'Precipitation' },
  { id: 'clouds_new', label: 'Clouds' },
  { id: 'wind_new', label: 'Wind' },
];

const WeatherMap = ({ lat, lon, city, isDark }) => {
  const position = useMemo(() => [lat, lon], [lat, lon]);
  const [activeOverlay, setActiveOverlay] = useState('clouds_new');
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  // Dark tile or light tile based on theme
  // CartoDB Voyager is free without API key
  const tileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

  // Apply dark filter via CSS on the map container in dark mode
  const mapStyle = {
    height: '100%',
    width: '100%',
    minHeight: '350px',
    borderRadius: '24px',
    ...(isDark ? { filter: 'invert(1) hue-rotate(180deg) brightness(0.85) contrast(1.2)' } : {}),
  };

  return (
    <div className="glass-panel map-panel fade-in" style={{ height: '100%', width: '100%', minHeight: '400px', padding: 0, overflow: 'hidden' }}>
      <MapContainer
        center={position}
        zoom={10}
        scrollWheelZoom={true}
        style={mapStyle}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={tileUrl}
        />

        {/* Weather overlay */}
        {activeOverlay !== 'none' && (
          <TileLayer
            url={`https://tile.openweathermap.org/map/${activeOverlay}/{z}/{x}/{y}.png?appid=${apiKey}`}
            opacity={0.6}
          />
        )}

        <MapUpdater center={position} />
        <UserLocationMarker />

        <Marker position={position}>
          <Popup>
            <div style={{ textAlign: 'center' }}>
              <strong>{city}</strong>
              <br />
              <span style={{ fontSize: '0.8em', opacity: 0.7 }}>
                {lat.toFixed(2)}°, {lon.toFixed(2)}°
              </span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Overlay layer controls - positioned over the map */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: '16px',
        right: '16px',
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap',
        zIndex: 1000,
      }}>
        {OVERLAY_LAYERS.map((layer) => (
          <button
            key={layer.id}
            className={`map-layer-btn ${activeOverlay === layer.id ? 'active' : ''}`}
            onClick={() => setActiveOverlay(layer.id)}
          >
            {layer.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeatherMap;
