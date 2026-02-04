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

  const [editingMovie, setEditingMovie] = useState(null);

  function addMovie(newMovie) {
    setMovies([...movies, newMovie]);
  }

  function editMovie(movie) {
    setEditingMovie(movie);
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  function updateMovie(updateMovie) {
    setMovies(movies.map(m =>
      m.id === updateMovie.id ? updateMovie : m
    ));
    setEditingMovie(null);
  }

  function deleteMovie(movieId) {
    setMovies(movies.filter(m => m.id !== movieId))
  }

  return (
    <>
      <h1>My Movie List</h1>
      <AddMovieForm 
        onAddMovie={addMovie} 
        onUpdateMovie={updateMovie}
        editingMovie={editingMovie}
      />

      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onEdit={editMovie}
          onDelete={deleteMovie}
        />
      ))}

    </>
  )
}
