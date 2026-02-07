import { useState, useEffect } from 'react';

export default function AddMovieForm({ onAddMovie, onUpdateMovie, editingMovie }) {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');

  function clearForm() {
    setTitle('');
    setYear('');
    setRating('');
  }

  useEffect(() => {
    if (editingMovie) {
      setTitle(editingMovie.title);
      setYear(editingMovie.year.toString());
      setRating(editingMovie.rating.toString());
    }
  }, [editingMovie]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !year.trim() || !rating.trim()) {
      return;
    }
    
    const movieData = {
      title,
      year: Number(year),
      rating: Number(rating)
    };

    if (editingMovie) {
      onUpdateMovie({ 
        ...movieData, 
        id: editingMovie.id,
        poster: editingMovie.poster
      });
    } else {
      onAddMovie({ ...movieData, id: Date.now()});
    }

    clearForm()
  }


  function cancelButton() {
    clearForm()
  }

  return (
    <>
      <hr />
      <form onSubmit={handleSubmit} className='form'>
        <input
          placeholder="Movie title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button type="submit">
          {editingMovie ? "Update Movie" : "Add Movie"}        
        </button>
        <button 
          type="button"
          className='cancel-btn'
          onClick={cancelButton}        
        >
          Cancel
        </button>
      </form>
      <hr />
    </>
  );
}