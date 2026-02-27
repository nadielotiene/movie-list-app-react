import { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';
import AddMovieForm from './components/AddMovieForm';
import MovieSearch from './components/MovieSearch';

export default function App() {
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem('movieList');
    return savedMovies ? JSON.parse(savedMovies) : []
  });

  useEffect(() => {
    localStorage.setItem('movieList',JSON.stringify(movies));
  }, [movies])

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

  async function fetchMovieDetails(imdbID) {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${imdbID}`
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error fetching movie details', err);
      return null;
    }
  }

  async function addMoviesFromSearch(result) {
    if (isMovieInList(result.imdbID)) {
      alert("This movie is already in your list!");
      return;
    }

    const fullDetails = await fetchMovieDetails(result.imdbID);

    if (!fullDetails) {
      alert('Failed to fetch movie  details');
      return;
    }

    const newMovie = {
      id: result.imdbID,
      title: fullDetails.Title,
      year: parseInt(fullDetails.Year),
      rating: 5,
      poster: fullDetails.Poster !== "N/A" ? fullDetails.Poster : null,
      plot: fullDetails.Plot,
      director: fullDetails.Director,
      actors: fullDetails.Actors,
      imdbRating: fullDetails.imdbRating,
      genre: fullDetails.Genre
    };
    
    setMovies([...movies, newMovie]);
  }

  function isMovieInList(movieId) {
    return movies.some(m => m.id === movieId);
  }

  return (
    <>
      <h1>My Movie List</h1>

      {/* <h2>Search Movies</h2> */}
      <MovieSearch 
        onAddMovie={addMoviesFromSearch}
        isMovieInList={isMovieInList}
      />

      <AddMovieForm 
        onAddMovie={addMovie} 
        onUpdateMovie={updateMovie}
        editingMovie={editingMovie}
      />

      {movies.length === 0 ? (
        <p className="empty-state">
          No movies in your list yet. Search and add some movies above!
        </p>
      ) : (
        movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onEdit={editMovie}
            onDelete={deleteMovie}
          />
        ))
      )}

    </>
  )
}
