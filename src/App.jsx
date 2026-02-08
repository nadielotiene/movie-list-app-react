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

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults]= useState([]);
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

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

  async function searchMovies(query) {
    if (!query.trim()) return;

    try {
      setSearching(true);
      setHasSearched(true);
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${query}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setSearchResults(data.Search);
      } else {
        setSearchResults([]);
      }
      setSearching(false);
    } catch (err) {
      console.error(err);
      setSearching(false);
    }
  }

  function addMoviesFromSearch(result) {
    if (isMovieInList(result.imdbID)) {
      alert("This movie is already in your list!");
      return;
    }

    const newMovie = {
      id: result.imdbID,
      title: result.Title,
      year: parseInt(result.Year),
      rating: 5,
      poster: result.Poster !== "N/A" ? result.Poster : null
    };
    setMovies([...movies, newMovie]);
    setSearchResults([]);
    setSearchQuery('');
  }

  function isMovieInList(movieId) {
    return movies.some(m => m.id === movieId);
  }

  return (
    <>
      <div className="search-section">
        <h2>SearchMovies</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          searchMovies(searchQuery);
        }}>
          <input 
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" disabled={searching}>
            {searching ? "Searching..." : "Search"}
          </button>
        </form>

        {searchResults.length > 0 && (
          <div className="search-results">
            <h3>Results:</h3>
            {searchResults.map(result => (
              <div key={result.imdbID} className="search-result">
                <img src={result.Poster} alt={result.Title} width="50" />
                <span>{result.Title} ({result.Year})</span>
                <button 
                  onClick={() => addMoviesFromSearch(result)}
                  disabled={isMovieInList(result.imdbID)}
                >
                  {isMovieInList(result.imdbID) ? "Already Added" : "Add to List"}
                </button>
              </div>
            ))}
          </div>
        )}

        {hasSearched && searchResults.length === 0 && !searching && (
          <p className="no-results">{`No movies found for "${searchQuery}". Try another search!`}</p>
        )}
      </div>

      <h1>My Movie List</h1>
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
