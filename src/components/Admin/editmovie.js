import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Adminnavbar from './Adminnavbar';
import './editmovie.css';
import checkAuth from "../auth/checkAuth";


function Edit() {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [movieDetails, setMovieDetails] = useState({
        title: '',
        description: '',
        genre: '',
        image_url: ''
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getAdminToken = () => {
        const adminData = localStorage.getItem('admin');
        return adminData ? JSON.parse(adminData).token : null;
    };

    useEffect(() => {
        if (!movieId) {
            setError('Movie ID is missing');
            return;
        }

        setLoading(true);
        axios.get(`http://127.0.0.1:8000/movie/edit_movie/${movieId}/`, {
            headers: { Authorization: `Token ${getAdminToken()}` }
        })
        .then(response => {
            setMovieDetails(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError('Failed to load movie data');
            setLoading(false);
        });
    }, [movieId]);

    // Handle Image Change & Preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMovieDetails({ ...movieDetails, image_url: file });
            setImagePreview(URL.createObjectURL(file)); // Creates a temporary local URL for preview
        }
    };

    function updateMovie() {
        const formData = new FormData();
        formData.append("title", movieDetails.title);
        formData.append("description", movieDetails.description);
        formData.append("genre", movieDetails.genre);

        if (movieDetails.image_url instanceof File) {
            formData.append("image_url", movieDetails.image_url);
        }

        setLoading(true);
        axios.put(`http://127.0.0.1:8000/movie/edit_movie/${movieId}/`, formData, {
            headers: { Authorization: `Token ${getAdminToken()}` }
        })
        .then(() => {
            alert('Movie updated successfully');
            navigate('/movielist');
        })
        .catch(() => {
            setError('Failed to update movie');
            setLoading(false);
        });
    }

    if (loading && !movieDetails.title) return (
        <div className="movie-page-wrapper d-flex align-items-center justify-content-center">
            <div className="spinner-border text-primary"></div>
        </div>
    );

    return (
        <div className="movie-page-wrapper">
            <Adminnavbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="text-white fw-bold mb-0">Edit Movie Details</h2>
                            <Link to="/movielist" className="btn btn-outline-light btn-sm rounded-pill px-3">
                                Cancel
                            </Link>
                        </div>

                        <div className="admin-card shadow-lg">
                            {error && <div className="alert alert-danger">{error}</div>}
                            
                            <form className="row g-4">
                                {/* Title */}
                                <div className="col-12">
                                    <label className="form-label text-secondary small text-uppercase fw-bold">Movie Title</label>
                                    <input
                                        type="text"
                                        className="form-control custom-input"
                                        value={movieDetails.title}
                                        onChange={(e) => setMovieDetails({ ...movieDetails, title: e.target.value })}
                                    />
                                </div>

                                {/* Genre */}
                                <div className="col-12">
                                    <label className="form-label text-secondary small text-uppercase fw-bold">Genre</label>
                                    <input
                                        type="text"
                                        className="form-control custom-input"
                                        value={movieDetails.genre}
                                        onChange={(e) => setMovieDetails({ ...movieDetails, genre: e.target.value })}
                                    />
                                </div>

                                {/* Description */}
                                <div className="col-12">
                                    <label className="form-label text-secondary small text-uppercase fw-bold">Description</label>
                                    <textarea
                                        className="form-control custom-input"
                                        rows="4"
                                        value={movieDetails.description}
                                        onChange={(e) => setMovieDetails({ ...movieDetails, description: e.target.value })}
                                    ></textarea>
                                </div>

                                {/* Image Section */}
                                <div className="col-12">
                                    <label className="form-label text-secondary small text-uppercase fw-bold d-block">Movie Poster</label>
                                    <div className="d-flex align-items-start gap-4">
                                        <div className="edit-preview-box">
                                            <img 
                                                src={imagePreview || `http://127.0.0.1:8000${movieDetails.image_url}`} 
                                                alt="Preview" 
                                                className="rounded shadow-sm"
                                            />
                                        </div>
                                        <div className="flex-grow-1">
                                            <input
                                                type="file"
                                                className="form-control custom-input"
                                                onChange={handleFileChange}
                                            />
                                            <p className="text-secondary small mt-2">Recommended: 2:3 aspect ratio vertical poster.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="col-12 mt-5">
                                    <button
                                        type="button"
                                        onClick={updateMovie}
                                        className="btn btn-primary btn-lg w-100 fw-bold shadow-sm"
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving Changes...' : 'Save Movie Details'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(Edit);