export default function MovieCard({ id, title, year, rating, onDelete }) {
  return (
    <div className="card--div">
      <h3>{title}</h3>
      <p>Year: {year}</p>
      <p>Rating: {"⭐️".repeat(rating)}</p>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}