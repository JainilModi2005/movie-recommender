
// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [movie, setMovie] = useState('');
//   const [recommendations, setRecommendations] = useState([]);

//   const getRecommendations = async () => {
//     try {
//       const res = await axios.post('http://localhost:5000/recommend', { movie });
//       setRecommendations(res.data.recommended_movies);
//     } catch (err) {
//       alert("Movie not found or error fetching recommendations");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-violet-600 text-white flex flex-col items-center p-8">
//       <h1 className="text-4xl font-bold mb-6">🎬 Movie Recommender</h1>
//       <input
//         type="text"
//         value={movie}
//         onChange={(e) => setMovie(e.target.value)}
//         placeholder="Enter a movie name"
//         className="p-3 rounded-lg w-80 text-black"
//       />
//       <button onClick={getRecommendations} className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg">
//         Get Recommendations
//       </button>

//       <div className="mt-8">
//         {recommendations.length > 0 && (
//           <div>
//             <h2 className="text-2xl font-semibold mb-4">Recommended Movies:</h2>
//             <ul className="list-disc pl-6">
//               {recommendations.map((rec, index) => (
//                 <li key={index}>{rec}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

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
          <h2>🍿 Recommended Movies</h2>
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
