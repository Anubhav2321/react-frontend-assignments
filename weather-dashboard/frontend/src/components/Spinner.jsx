export default function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner-ring">
        <div className="ring-outer"></div>
        <div className="ring-inner"></div>
      </div>
      <p className="spinner-text">Loading Weather Data...</p>
    </div>
  );
}