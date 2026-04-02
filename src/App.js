import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import "./App.css";
import { Carousel, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserCheckGuest from './components/auth/UserCheckGuest';

function App() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [aiResponse, setaiResponse] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/movie/list_movies_home')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  function Aisearch(event) {
    event.preventDefault();
    axios.post('http://127.0.0.1:8000/movie/ask_ai', { message: searchTerm })
      .then((response) => {
        setaiResponse(response.data.reply);
      })
      .catch((error) => {
        console.error('Error fetching AI response:', error);
      });
  }

  function handleclick(id) {
    if (!localStorage.getItem('token')) {
      navigate('/userlogin');
    } else {
      navigate('/Moviedetail/' + id);
    }
  }

  return (
  <>
    <div className="bg-dark min-vh-100 text-white">
      <Navbar />

      {/* --- SECTION 1: FULL WIDTH CAROUSEL --- */}
      <div className='container-fluid p-0 overflow-hidden'>
        <div className="row g-0">
          <Col xs={12}>
            <Carousel fade interval={3000} pause="hover" className="custom-carousel shadow-lg">
              {movies.length > 0 && movies.slice(0, 5).map((movie, index) => (
                <Carousel.Item key={index}>
                  <div className="carousel-img-wrapper">
                    <img
                      className="d-block w-100"
                      src={`http://127.0.0.1:8000/${movie.image_url}`}
                      alt={movie.title}
                    />
                    <div className="carousel-vignette"></div>
                  </div>
                  <Carousel.Caption className="text-start custom-caption">
                    <span className="badge bg-primary mb-2 px-3 py-2">{movie.category || 'Featured'}</span>
                    <h2 className="display-4 fw-bold">{movie.title}</h2>
                    <p className="d-none d-md-block opacity-75">Stream the latest blockbuster now on our platform.</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </div>
      </div>

      {/* --- SECTION 2: RECOMMENDED MOVIES GRID --- */}
      <div className="container mt-5">
        <h2 className="text-white fw-bold mb-4 border-start border-primary border-4 ps-3">
          Recommended Movies
        </h2>

        {movies.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">No movies available at the moment.</p>
          </div>
        ) : (
          <div className="row row-cols-2 row-cols-md-4 row-cols-lg-5 g-4">
            {movies.map((movie) => (
              <div className="col" key={movie.id}>
                <div className="movie-card-v2" onClick={() => handleclick(movie.id)}>
                  <div className="poster-container shadow">
                    <img
                      src={`http://127.0.0.1:8000/${movie.image_url}`}
                      className="poster-img"
                      alt={movie.title}
                    />
                    <div className="poster-hover-overlay">
                      <button className="btn btn-primary btn-sm rounded-pill px-3 fw-bold">
                        View Info
                      </button>
                    </div>
                  </div>
                  <div className="movie-details mt-2">
                    <h6 className="text-white mb-0 text-truncate">{movie.title}</h6>
                    <div className="d-flex justify-content-between align-items-center mt-1">
                      <small className="text-primary fw-bold">Premium</small>
                      <small className="text-muted small">2024</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- SECTION 3: AI ASSISTANT --- */}
      <div className="container mt-5 pb-5">
        <div className="ai-container p-4 rounded-4 shadow-lg border border-secondary border-opacity-25">
          <div className="row align-items-center">
            <Col xs={12}>
              <div className="d-flex align-items-center mb-3">
                <div className="ai-icon-pulse me-3">✨</div>
                <h3 className="text-white fw-bold mb-0">AI Movie Assistant</h3>
              </div>
              <p className="text-muted small">Not sure what to watch? Tell me your mood!</p>
              
              <form onSubmit={Aisearch} className="d-flex gap-2">
                <input 
                  className="form-control ai-input bg-dark text-white border-secondary"
                  placeholder="e.g., I want a thriller with a plot twist..."
                  value={searchTerm} 
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
                <button type="submit" className="btn btn-primary px-4 fw-bold">Ask AI</button>
              </form>
            </Col>
          </div>

          {aiResponse && (
            <div className="mt-4 ai-response-bubble">
              <div className="p-3 rounded-3 bg-primary bg-opacity-10 border border-primary border-opacity-25">
                <div className="d-flex gap-2">
                  <span className="text-primary fw-bold">AI:</span>
                  <span className="text-light-50 small">{aiResponse}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default UserCheckGuest(App);