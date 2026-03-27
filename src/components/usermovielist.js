import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import UserCheckAuth from './auth/UserCheckAuth';
import './usermovielist.css';

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);

    const moviesPerPage = 8;

    const fetchMovies = async (genre = 'All') => {
        try {
            setSelectedGenre(genre);
            setCurrentPage(1);

            let url = 'http://127.0.0.1:8000/movie/list_movies/';

            // ✅ Add query param only if not "All"
            if (genre !== 'All') {
                url += `?genre=${genre}`;
            }

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                }
            });

            setMovies(response.data);
            setError('');
        } catch (error) {
            console.error(error);
            setError('Failed to fetch movies.');
        }
    };

    useEffect(() => {
        fetchMovies(); // load all movies initially
    }, []);

    // Pagination logic
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    const genres = ['All', 'Comedy', 'Romance', 'Family', 'Science fiction'];

    return (
        <div className="movie-page-wrapper">
            <Navbar />

            <div className="container py-5">
                <h1 className="display-6 fw-bold text-white mb-5 text-center">
                    FEATURED MOVIES
                </h1>

                {/* Genre Buttons */}
                <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
                    {genres.map((genre) => (
                        <button
                            key={genre}
                            onClick={() => fetchMovies(genre)}
                            className={`btn rounded-pill px-4 ${
                                selectedGenre === genre ? 'btn-primary' : 'btn-outline-light'
                            }`}
                        >
                            {genre}
                        </button>
                    ))}
                </div>

                {/* Error */}
                {error && <div className="alert alert-danger text-center">{error}</div>}

                {/* Movies Grid */}
                <div className="row g-4">
                    {currentMovies.length > 0 ? (
                        currentMovies.map(movie => (
                            <div className="col-lg-3 col-md-6 col-sm-12" key={movie.id}>
                                <div className="movie-card shadow-lg h-100">
                                    
                                    <div className="movie-poster-container">
                                        <img 
                                            src={`http://127.0.0.1:8000/${movie.image_url}`} 
                                            className="movie-grid-img" 
                                            alt={movie.title} 
                                        />

                                        <div className="poster-overlay">
                                            <Link 
                                                to={`/Moviedetail/${movie.id}`} 
                                                className="btn btn-light btn-sm rounded-pill px-3"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="card-body bg-dark-card p-3 text-white text-center">
                                        <h6 className="fw-bold text-truncate">{movie.title}</h6>
                                        <p className="small text-secondary">{movie.genre}</p>

                                        <div className="d-grid">
                                            <Link 
                                                to={`/bookingform/${movie.id}`} 
                                                className="btn btn-primary btn-sm rounded-pill"
                                            >
                                                Book Now
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-white">
                            No movies found 🎬
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {movies.length > moviesPerPage && (
                    <nav className="mt-5 d-flex justify-content-center">
                        <ul className="pagination custom-pagination shadow">

                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button 
                                    className="page-link" 
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                >
                                    Prev
                                </button>
                            </li>

                            {[...Array(totalPages)].map((_, i) => (
                                <li 
                                    key={i} 
                                    className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                                >
                                    <button 
                                        className="page-link" 
                                        onClick={() => {
                                            setCurrentPage(i + 1);
                                            window.scrollTo(0, 0);
                                        }}
                                    >
                                        {i + 1}
                                    </button>
                                </li>
                            ))}

                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button 
                                    className="page-link" 
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                >
                                    Next
                                </button>
                            </li>

                        </ul>
                    </nav>
                )}
            </div>
        </div>
    );
}

export default UserCheckAuth(MovieList);