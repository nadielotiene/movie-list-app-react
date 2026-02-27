import { useState } from "react";

export default function MovieSearch({ onAddMovie, isMovieInList }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults]= useState([]);
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  function clearSearch() {
    setSearchResults([]);
    // setSearchQuery('');
    setHasSearched(false);
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
  
  return (
    <div className="search-section">
      <form onSubmit={(e) => {
        e.preventDefault();
        searchMovies(searchQuery);
      }}>
        <div className="search-input-wrapper">
          <input 
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              type="button"
              className="clear-button"
              onClick={() => {
                setSearchResults([]);
                setSearchQuery('');
                setHasSearched(false);
              }}
            >
              ✕
            </button>
          )}
        </div>
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
                onClick={() => {
                  onAddMovie(result)
                  clearSearch();
                }}
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
  )
}