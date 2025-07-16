
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [movie, setMovie] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {
    if (!movie.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/recommend', { movie });
      setRecommendations(res.data.recommended_movies);
    } catch (err) {
      alert("Movie not found. Try a different title.");
      setRecommendations([]);
    }
    setLoading(false);
  };

  return (
    <div className="main-container">
      <h1 className="title">🎬 Movie Matcher</h1>

      <div className="form-container">
        <input
          type="text"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          placeholder="Enter a movie you love..."
          className="movie-input"
        />
        <button onClick={getRecommendations} className="recommend-button">
          {loading ? 'Finding...' : 'Suggest'}
        </button>
      </div>

      {recommendations.length > 0 && (
        <div className="results">
          <h2> Recommended Movies</h2>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>🎥 {rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
