import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import UserCheckAuth from './auth/UserCheckAuth';
import './Moviedetail.css'; 

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState('');

    const getToken = () => {
        const adminData = localStorage.getItem('admin');
        return adminData ? JSON.parse(adminData).token : null;
    };

    useEffect(() => {
        const token = getToken();
        axios.get(`http://127.0.0.1:8000/movie/movie_detail/${id}/`, {
            headers: { Authorization: `Token ${token}` }
        })
        .then(response => { setMovie(response.data); })
        .catch(err => {
            console.error('Error fetching movie details:', err);
            setError('Failed to fetch movie details');
        });
    }, [id]);

    // We wrap EVERYTHING in the wrapper so the background is always dark
    return (
        <div className="movie-page-wrapper">
            <div className="container pt-4">
                <Link to="/usermovielist" className="btn btn-outline-light mb-4 shadow-sm">
                    <i className="bi bi-arrow-left"></i> Back to Movie List
                </Link>

                {error && <div className="alert alert-danger">{error}</div>}

                {!movie && !error && (
                    <div className="text-center mt-5">
                        <div className="spinner-border text-light" role="status"></div>
                        <p className="text-white mt-2">Loading movie details...</p>
                    </div>
                )}

                {movie && (
                    <div className="container movie-details-card shadow-lg p-0 mt-2">
                        <div className="row g-0">
                            {/* Poster Column */}
                            <div className="col-md-4">
                                <img 
                                    src={`http://127.0.0.1:8000${movie.image_url}`} 
                                    alt={movie.title} 
                                    className="img-fluid movie-poster-img" 
                                />
                            </div>

                            {/* Content Column */}
                            <div className="col-md-8 d-flex flex-column justify-content-center p-5 text-white">
                                <h1 className="display-4 fw-bold">{movie.title}</h1>
                                <h5 className="text-warning mb-4">{movie.genre}</h5>
                                <hr className="opacity-25" />
                                <p className="lead mt-3">{movie.description}</p>
                                
                                <div className="mt-auto pt-4">
                                    <button className="btn btn-primary btn-lg px-5 shadow">Book Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserCheckAuth(MovieDetails);