export default function MovieCard({ movie, onEdit, onDelete }) {
  
  return (
    <div className="card--div">
      {movie.poster && <img src={movie.poster} alt={movie.title} width="100" />}
      <h3>{movie.title}</h3>
      <p>Year: {movie.year}</p>
      <p>Rating: {"⭐️".repeat(movie.rating)}</p>
      <section className="buttons">
        <button onClick={() => onEdit(movie)}>Edit</button>
        <button onClick={() => onDelete(movie.id)}>Delete</button>
      </section>
    </div>
  );
}