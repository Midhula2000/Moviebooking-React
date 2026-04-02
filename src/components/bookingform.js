import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import UserCheckAuth from './auth/UserCheckAuth';
import Navbar from './Navbar';
import './bookingform.css';
import PayPalPayment from './payment/PayPalPayment';

function BookingForm() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('11:30');
    const [seats, setSeats] = useState('');
    const [error, setError] = useState('');
    const [bookingId, setBookingId] = useState(null);
    const [showPayment, setShowPayment] = useState(false);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/movie/movie_detail/${id}/`, {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        })
        .then(response => setMovie(response.data))
        .catch(() => setError('Failed to fetch movie details.'));
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const bookingData = {
            title: id,
            date: date,
            time: time,
            no_of_seats: seats
        };

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/booking/create_booking/',
                bookingData,
                {
                    headers: { Authorization: `Token ${localStorage.getItem('token')}` }
                }
            );

            // ✅ Store booking ID
            setBookingId(response.data.id);

            // ✅ Show PayPal
            setShowPayment(true);

        } catch {
            setError('Failed to create booking.');
        }
    };

    if (!movie && !error) {
        return (
            <div className="movie-page-wrapper d-flex align-items-center justify-content-center">
                <div className="spinner-border text-primary"></div>
            </div>
        );
    }

    return (
        <div className="movie-page-wrapper">
            <Navbar />
            <div className="container py-5">

                <Link to={`/Moviedetail/${id}`} className="btn btn-outline-light mb-4 border-0">
                    ← Back to Details
                </Link>

                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="movie-details-card shadow-lg overflow-hidden">
                            <div className="row g-0">

                                {/* Left Image */}
                                <div className="col-md-5 d-none d-md-block">
                                    <img 
                                        src={`http://127.0.0.1:8000${movie.image_url}`}
                                        className="w-100 h-100"
                                        style={{ objectFit: 'cover' }}
                                        alt={movie.title}
                                    />
                                </div>

                                {/* Form */}
                                <div className="col-md-7 p-5 bg-dark-card text-white">
                                    <h2 className="mb-4 fw-bold">Confirm Booking</h2>

                                    {error && <div className="alert alert-danger">{error}</div>}

                                    <form onSubmit={handleSubmit}>
                                        <div>
<label className="text-light-50 mb-1">Select Date</label>
                                        <input type="date" value={date} required onChange={(e) => setDate(e.target.value)} className="form-control mb-3" />
                                        </div>
                                        <div>
<label className="text-light-50 mb-1">Select Time</label>
                                        <select value={time} onChange={(e) => setTime(e.target.value)} className="form-select mb-3">
                                            <option value="11:30">11:30 AM</option>
                                            <option value="2:30">02:30 PM</option>
                                            <option value="5:00">05:00 PM</option>
                                            <option value="9:00">09:00 PM</option>
                                        </select>
                                        </div>
                                        <div>
                                        <label className="text-light-50 mb-1">Number of Seats</label>

                                        <input type="number" value={seats} min="1" max="10" required onChange={(e) => setSeats(e.target.value)} className="form-control mb-4" />
</div>
                                        {/* 🔥 IMPORTANT PART */}
                                        <div className="d-grid gap-2 mt-5">

                                            {!showPayment ? (
                                                <button type="submit" className="btn btn-primary btn-lg fw-bold">
                                                    Confirm & Pay
                                                </button>
                                            ) : (
                                                <PayPalPayment bookingId={bookingId} />
                                            )}

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