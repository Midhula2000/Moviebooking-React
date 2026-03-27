import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import UserCheckAuth from "./auth/UserCheckAuth";
import './userbookinglist.css'; // Using consistent styles

function ListBooking() {
    const [booking, setBooking] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const token = localStorage.getItem('token');

    const fetchBookings = () => {
        axios.get(`http://127.0.0.1:8000/booking/userlist_booking/`, {
            headers: { Authorization: `Token ${token}` }
        }).then((response) => {
            setBooking(response.data);
        }).catch((error) => {
            console.error("Error fetching bookings:", error);
        });
    };

    useEffect(() => {
        fetchBookings();
    }, [token]);

    const openModal = (id) => {
        setSelectedBookingId(id);
        setShowModal(true);
    };

    const handleCancel = () => {
        axios.delete(`http://127.0.0.1:8000/booking/delete_booking/${selectedBookingId}/`, {
            headers: { Authorization: `Token ${token}` }
        }).then(() => {
            setShowModal(false);
            fetchBookings(); // Refresh the list
            alert("Booking cancelled successfully");
        }).catch((error) => {
            console.error("Error cancelling booking:", error);
        });
    };

    return (
        <div className="movie-page-wrapper">
            <Navbar />
            <div className="container py-5">
                <h1 className="display-5 fw-bold text-white mb-5 text-center">My Tickets</h1>
                
                <div className="row justify-content-center">
                    {booking.length > 0 ? (
                        booking.map((item) => (
                            <div className="col-lg-8 mb-4" key={item.id}>
                                <div className="ticket-card d-flex flex-column flex-md-row">
                                    {/* Left Side: Movie Poster */}
                                    <div className="ticket-img-wrapper">
                                        <img
                                            src={`http://127.0.0.1:8000/${item.movie.image_url}`}
                                            alt={item.movie.title}
                                        />
                                    </div>

                                    {/* Middle Section: Booking Details */}
                                    <div className="ticket-info p-4 flex-grow-1">
                                        <div className="d-flex justify-content-between align-items-start">
                                            <div>
                                                <h4 className="fw-bold text-white mb-1">{item.movie.title}</h4>
                                                <span className="badge bg-primary mb-3">Confirmed</span>
                                            </div>
                                            <div className="text-end">
                                                <p className="text-secondary small mb-0">Seats</p>
                                                <h5 className="text-white">{item.no_of_seats || 1}</h5>
                                            </div>
                                        </div>
                                        
                                        <div className="row mt-2">
                                            <div className="col-6">
                                                <p className="text-secondary small mb-0">Date</p>
                                                <p className="text-white mb-0">{item.date}</p>
                                            </div>
                                            <div className="col-6">
                                                <p className="text-secondary small mb-0">Time</p>
                                                <p className="text-white mb-0">{item.time}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side: Action (Cancellation) */}
                                    <div className="ticket-action d-flex align-items-center justify-content-center p-3">
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => openModal(item.id)}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-5">
                            <h4 className="text-secondary">No bookings found.</h4>
                        </div>
                    )}
                </div>
            </div>

            {/* Dark Styled Modal */}
            {showModal && (
                <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.8)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-dark text-white border-secondary">
                            <div className="modal-header border-secondary">
                                <h5 className="modal-title">Confirm Cancellation</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body text-center py-4">
                                <p className="lead">Are you sure you want to cancel your ticket for this movie?</p>
                                <p className="text-danger small">This action cannot be undone.</p>
                            </div>
                            <div className="modal-footer border-secondary">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Keep Ticket</button>
                                <button className="btn btn-danger" onClick={handleCancel}>Cancel Booking</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserCheckAuth(ListBooking);