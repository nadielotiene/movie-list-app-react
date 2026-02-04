export default function MovieCard({ movie, onEdit, onDelete }) {
  
  return (
    <div className="card--div">
      <h3>{movie.title}</h3>
      <p>Year: {movie.year}</p>
      <p>Rating: {"⭐️".repeat(movie.rating)}</p>
      <button onClick={() => onEdit(movie)}>Edit</button>
      <button onClick={() => onDelete(movie.id)}>Delete</button>
    </div>
  );
}