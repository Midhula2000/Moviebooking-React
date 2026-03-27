import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Adminnavbar from "./Adminnavbar";
import checkAuth from "../auth/checkAuth";



function AdminMovieDetails() {
    const { id } = useParams();
const [movie, setMovie] = React.useState(null);
const [error, setError] = React.useState('');

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/movie/movie_detail/${id}/`, {headers: {
            'Authorization': 'Token ' + (localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')).token : null)
        }})
        .then(response => {
            setMovie(response.data);
            console.log(response.data);
            setError('');
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
            setError('Failed to fetch movie details.');
        });
    }, [id]);

    return (
        <div className="movie-page-wrapper"> {/* This covers the whole screen dark */}
    <Adminnavbar />
    
    <div className="container mt-5">
        {error && <div className="alert alert-danger">{error}</div>}
        
        {movie ? (
            /* The Main Styled Card */
            <div className="movie-details-card">
                <div className="row g-0 align-items-center"> {/* g-0 removes gaps between img and text */}
                    
                    {/* Left Side: Poster (4 units wide) */}
                    <div className="col-md-4">
                        <img 
                            src={`http://127.0.0.1:8000${movie.image_url}`} 
                            className="movie-poster-img shadow-lg" 
                            alt={movie.title} 
                        />
                    </div>

                    {/* Right Side: Details (8 units wide) */}
                    <div className="col-md-8 p-5">
                        <div className="movie-details-content">
                            <h1 className="display-4 fw-bold">{movie.title}</h1>
                            <h5 className="text-primary mb-4">{movie.genre}</h5>
                            <hr className="opacity-25" />
                            <p className="lead mt-3">{movie.description}</p>
                            
                          
                        </div>
                    </div>

                </div>
            </div>
        ) : (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2">Loading movie details...</p>
            </div>
        )}
    </div>
</div>
    );
}

export default checkAuth(AdminMovieDetails);