const AQI_LABELS = ['', 'Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
const AQI_CLASSES = ['', 'aqi-good', 'aqi-fair', 'aqi-moderate', 'aqi-poor', 'aqi-very-poor'];
const AQI_ROTATIONS = ['45deg', '45deg', '90deg', '135deg', '180deg', '225deg'];

export default function AirQuality({ aqiData }) {
  if (!aqiData || !aqiData.list?.[0]) return null;

  const data = aqiData.list[0];
  const aqi = data.main?.aqi || 1;
  const components = data.components || {};

  const pollutants = [
    { name: 'PM2.5', value: components.pm2_5?.toFixed(1), unit: 'μg/m³' },
    { name: 'PM10', value: components.pm10?.toFixed(1), unit: 'μg/m³' },
    { name: 'O₃', value: components.o3?.toFixed(1), unit: 'μg/m³' },
    { name: 'NO₂', value: components.no2?.toFixed(1), unit: 'μg/m³' },
    { name: 'SO₂', value: components.so2?.toFixed(1), unit: 'μg/m³' },
    { name: 'CO', value: components.co?.toFixed(0), unit: 'μg/m³' },
  ];

  return (
    <div className={`aqi-panel glass-panel fade-in ${AQI_CLASSES[aqi]}`}
      style={{ '--aqi-rotation': AQI_ROTATIONS[aqi] }}
    >
      <h3 className="section-title">Air Quality Index</h3>
      <div className="aqi-content">
        <div className="aqi-gauge">
          <div className="aqi-value">{aqi}</div>
          <div className="aqi-label">{AQI_LABELS[aqi]}</div>
        </div>
        <div className="aqi-details">
          {pollutants.map((p) => (
            <div key={p.name} className="aqi-pollutant">
              <div className="aqi-pollutant-name">{p.name}</div>
              <div className="aqi-pollutant-value">{p.value || '--'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
