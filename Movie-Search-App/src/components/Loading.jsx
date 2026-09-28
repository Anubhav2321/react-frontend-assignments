export default function Loading({ count = 10 }) {
  // Generate an array of skeletons based on count
  const skeletons = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="movie-grid">
      {skeletons.map((index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-poster skeleton"></div>
          <div className="card-content">
            <div className="skeleton-text skeleton"></div>
            <div className="skeleton-text short skeleton"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
