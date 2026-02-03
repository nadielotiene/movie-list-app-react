import { useState } from 'react';

export default function AddMovieForm({ onAddMovie }) {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !year.trim() || !rating.trim()) {
      return;
    }

    
    const newMovie = {
      id: Date.now(),
      title,
      year: Number(year),
      rating: Number(rating)
    };

    onAddMovie(newMovie);

    setTitle('');
    setYear('');
    setRating('');
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
        <button type="submit">Add Movie</button>
      </form>
    </>
  );
}