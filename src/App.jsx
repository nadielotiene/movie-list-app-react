import { useState } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';
import AddMovieForm from './components/AddMovieForm';

export default function App() {
  const [movies, setMovies] = useState([
    { id: 1, title: "Inception", year: 2010, rating: 5 },
    { id: 2, title: "The Matrix", year: 1999, rating: 5 },
    { id: 3, title: "Interstellar", year: 2014, rating: 4 }
  ]);

  function addMovie(newMovie) {
    setMovies([...movies, newMovie]);
  }

  function deleteMovie(movieId) {
    setMovies(movies.filter(m => m.id !== movieId))
  }

  return (
    <>
      <h1>My Movie List</h1>
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          year={movie.year} 
          rating={movie.rating}
          // or
          // {...movie}
          onDelete={deleteMovie}
        />
      ))}

      <AddMovieForm onAddMovie={addMovie} 
      />
    </>
  )
}
