import { useState } from 'react';

export default function MovieCard({ movie, onEdit, onDelete }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="card--div"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {movie.poster && <img src={movie.poster} alt={movie.title} width="250" />}

      {isHovered && (
        <div className="hover-details">
          <h3 className='movie-title'>{movie.title}</h3>
          <p>Year: {movie.year}</p>
          <p>My Rating: {"⭐️".repeat(movie.rating)}</p>
          <p>imdbRating: {movie.imdbRating}</p>
          {/* <p>Plot: {movie.plot}</p> */}
          <p>Director: {movie.director}</p>
          <p>Actors: {movie.actors}</p>
          <p>Genre: {movie.genre}</p>
          <section className="buttons">
            <button onClick={() => onEdit(movie)}>Edit</button>
            <button onClick={() => onDelete(movie.id)}>Delete</button>
          </section>
        </div>
      )}
    </div>
  );
}