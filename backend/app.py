from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)  # 👈 Add this line

# Load model
movies = pickle.load(open('movies.pkl', 'rb'))
similarity = pickle.load(open('similarity.pkl', 'rb'))

@app.route('/')
def home():
    return '✅ Movie Recommender Backend is Running!'

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    movie_name = data['movie']
    
    if movie_name not in movies['title'].values:
        return jsonify({'error': 'Movie not found'})
    
    idx = movies[movies['title'] == movie_name].index[0]
    distances = sorted(list(enumerate(similarity[idx])), reverse=True, key=lambda x: x[1])[1:6]
    recommendations = [movies.iloc[i[0]].title for i in distances]
    
    return jsonify({'recommended_movies': recommendations})

if __name__ == '__main__':
    app.run(debug=True)
