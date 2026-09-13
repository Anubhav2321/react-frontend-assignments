import { useMemo } from 'react';

/**
 * Determines the weather scene class and whether it's night based on weather data.
 */
function getWeatherScene(weatherData) {
  if (!weatherData) return { sceneClass: 'weather-default', isNight: false };

  const weatherId = weatherData.weather?.[0]?.id;
  const icon = weatherData.weather?.[0]?.icon || '';
  const isNight = icon.endsWith('n');

  // Thunderstorm: 2xx
  if (weatherId >= 200 && weatherId < 300) {
    return { sceneClass: 'weather-thunder', isNight };
  }
  // Drizzle / Rain: 3xx, 5xx
  if ((weatherId >= 300 && weatherId < 400) || (weatherId >= 500 && weatherId < 600)) {
    return { sceneClass: 'weather-rain', isNight };
  }
  // Snow: 6xx
  if (weatherId >= 600 && weatherId < 700) {
    return { sceneClass: 'weather-snow', isNight };
  }
  // Atmosphere (fog, mist, haze, etc.): 7xx
  if (weatherId >= 700 && weatherId < 800) {
    return { sceneClass: 'weather-fog', isNight };
  }
  // Clear: 800
  if (weatherId === 800) {
    return { sceneClass: isNight ? 'weather-clear-night' : 'weather-clear-day', isNight };
  }
  // Clouds: 80x
  if (weatherId > 800 && weatherId < 900) {
    return { sceneClass: 'weather-cloudy', isNight };
  }

  return { sceneClass: 'weather-default', isNight };
}

/** Generates raindrop elements */
function RainEffect({ heavy }) {
  const drops = Array.from({ length: 20 }, (_, i) => (
    <div key={i} className="raindrop" />
  ));
  return <div className={`rain-container ${heavy ? 'heavy-rain' : ''}`}>{drops}</div>;
}

/** Generates snowflake elements */
function SnowEffect() {
  const flakes = Array.from({ length: 15 }, (_, i) => (
    <div key={i} className="snowflake" />
  ));
  return <div className="snow-container">{flakes}</div>;
}

/** Lightning flash overlay */
function LightningEffect() {
  return <div className="lightning-flash" />;
}

/** Storm clouds */
function StormClouds() {
  return (
    <div className="storm-clouds">
      <div className="storm-cloud storm-cloud-1" />
      <div className="storm-cloud storm-cloud-2" />
      <div className="storm-cloud storm-cloud-3" />
    </div>
  );
}

/** Fog layers */
function FogEffect() {
  return (
    <div className="fog-container">
      <div className="fog-layer fog-layer-1" />
      <div className="fog-layer fog-layer-2" />
      <div className="fog-layer fog-layer-3" />
    </div>
  );
}

/** Overcast clouds */
function OvercastClouds() {
  return (
    <div className="overcast-clouds">
      <div className="overcast-cloud" />
      <div className="overcast-cloud" />
      <div className="overcast-cloud" />
      <div className="overcast-cloud" />
    </div>
  );
}

/** Sun with rays and clouds */
function SunScene() {
  return (
    <div className="sun-container fade-in">
      <div className="sun-rays" />
      <div className="sun-glow" />
      <div className="sun-halo" />
      <div className="sun-core" />
      <div className="cloud cloud-1" />
      <div className="cloud cloud-2" />
      <div className="cloud cloud-3" />
    </div>
  );
}

/** Moon with stars */
function MoonScene() {
  return (
    <>
      <div className="moon-container fade-in">
        <div className="moon-glow" />
        <div className="moon-core">
          <div className="crater crater-1" />
          <div className="crater crater-2" />
          <div className="crater crater-3" />
        </div>
      </div>
      <div className="stars-layer" />
      <div className="twinkle-stars">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="twinkle-star" />
        ))}
      </div>
    </>
  );
}

export default function DynamicBackground({ weatherData, isDark, children }) {
  const { sceneClass, isNight } = useMemo(() => getWeatherScene(weatherData), [weatherData]);

  // Build celestial scene based on weather
  const renderScene = () => {
    switch (sceneClass) {
      case 'weather-clear-day':
        return <SunScene />;

      case 'weather-clear-night':
        return <MoonScene />;

      case 'weather-rain':
        return (
          <>
            <StormClouds />
            <RainEffect heavy={false} />
            {isNight && <MoonScene />}
          </>
        );

      case 'weather-thunder':
        return (
          <>
            <StormClouds />
            <RainEffect heavy={true} />
            <LightningEffect />
          </>
        );

      case 'weather-snow':
        return (
          <>
            <OvercastClouds />
            <SnowEffect />
            {isNight && <MoonScene />}
          </>
        );

      case 'weather-fog':
        return (
          <>
            <FogEffect />
            {isNight ? <MoonScene /> : <SunScene />}
          </>
        );

      case 'weather-cloudy':
        return (
          <>
            <OvercastClouds />
            {isNight ? <MoonScene /> : <SunScene />}
          </>
        );

      default:
        return isDark ? <MoonScene /> : <SunScene />;
    }
  };

  return (
    <div className={`dynamic-background ${sceneClass} ${isDark && !sceneClass.includes('night') ? 'dark-bg' : ''}`}>
      <div className="bg-overlay" />

      <div className="celestial-container">
        {renderScene()}
      </div>

      <div className="content-layer">
        {children}
      </div>
    </div>
  );
}