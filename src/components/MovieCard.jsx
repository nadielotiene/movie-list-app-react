export default function MovieCard({ title, year, rating }) {
  return (
    <div className="card--div">
      <h3>{title}</h3>
      <p>Year: {year}</p>
      <p>Rating: {"⭐️".repeat(rating)}</p>
      <button>Delete</button>
    </div>
  );
}