import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import UserCheckAuth from './auth/UserCheckAuth';
import Navbar from './Navbar'; // Assuming you want the navbar here too
import './bookingform.css';

function BookingForm() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('11:30');
    const [seats, setSeats] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/movie/movie_detail/${id}/`, {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        })
        .then(response => { setMovie(response.data); })
        .catch(error => { setError('Failed to fetch movie details.'); });
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const bookingData = { title: id, date: date, time: time, no_of_seats: seats };

        axios.post('http://127.0.0.1:8000/booking/create_booking/', bookingData, {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        })
        .then(response => {
            let user_id = localStorage.getItem('user_id');
            navigate(`/userbookings/${user_id}`);
        })
        .catch(error => { setError('Failed to create booking. Please try again.'); });
    };

    if (!movie && !error) return (
        <div className="movie-page-wrapper d-flex align-items-center justify-content-center">
            <div className="spinner-border text-primary"></div>
        </div>
    );

    return (
        <div className="movie-page-wrapper">
            <Navbar />
            <div className="container py-5">
                {/* Back Button */}
                <Link to={`/Moviedetail/${id}`} className="btn btn-outline-light mb-4 border-0">
                    ← Back to Details
                </Link>

                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="movie-details-card shadow-lg overflow-hidden">
                            <div className="row g-0">
                                
                                {/* Left Side: Small Movie Info / Image */}
                                <div className="col-md-5 d-none d-md-block">
                                    <div className="h-100 position-relative">
                                        <img 
                                            src={`http://127.0.0.1:8000${movie.image_url}`} 
                                            className="w-100 h-100" 
                                            style={{ objectFit: 'cover' }} 
                                            alt={movie.title} 
                                        />
                                        <div className="position-absolute bottom-0 start-0 p-4 w-100" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.9))' }}>
                                            <h3 className="text-white fw-bold">{movie.title}</h3>
                                            <p className="text-warning mb-0">{movie.genre}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: The Form */}
                                <div className="col-md-7 p-5 bg-dark-card text-white">
                                    <h2 className="mb-4 fw-bold">Confirm Booking</h2>
                                    {error && <div className="alert alert-danger py-2">{error}</div>}
                                    
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label text-white small text-uppercase fw-bold">Select Date</label>
                                            <input
                                                type="date"
                                                className="form-control custom-input"
                                                value={date}
                                                required
                                                onChange={(e) => setDate(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label text-white small text-uppercase fw-bold">Show Time</label>
                                            <select
                                                className="form-select custom-input"
                                                value={time}
                                                onChange={(e) => setTime(e.target.value)}
                                            >
                                                <option value="11:30">11:30 AM (Morning)</option>
                                                <option value="2:30">02:30 PM (Matinee)</option>
                                                <option value="5:00">05:00 PM (First Show)</option>
                                                <option value="9:00">09:00 PM (Second Show)</option>
                                            </select>
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label text-white small text-uppercase fw-bold">Number of Seats</label>
                                            <input
                                                type="number"
                                                className="form-control custom-input"
                                                placeholder="Max 10 seats"
                                                min="1"
                                                max="10"
                                                value={seats}
                                                required
                                                onChange={(e) => setSeats(e.target.value)}
                                            />
                                        </div>

                                        <div className="d-grid gap-2 mt-5">
                                            <button type="submit" className="btn btn-primary btn-lg fw-bold shadow">
                                                Confirm & Pay
                                            </button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCheckAuth(BookingForm);