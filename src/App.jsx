// import { useState } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';

export default function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <h1>My Movie List</h1>
      <MovieCard
        title="Inception" 
        year={2010} 
        rating={5}
      />
      <MovieCard
        title="The Matrix" 
        year={1999} 
        rating={5}
      />
      <MovieCard
        title="Interstellar" 
        year={2014} 
        rating={4}
      />
    </>
  )
}
