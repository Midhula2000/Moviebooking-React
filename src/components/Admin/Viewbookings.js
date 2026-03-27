import React, { useState, useEffect } from "react";
import Adminnavbar from "./Adminnavbar";
import axios from "axios";
import { Link } from "react-router-dom";
import './viewbookings.css';
import checkAuth from "../auth/checkAuth";


function Viewbookings() {
    const [bookings, setBookings] = useState([]);
    const token = localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')).token : null;

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/booking/adminbookinglist/', {
            headers: { Authorization: `Token ${token}` }
        })
        .then((response) => {
            setBookings(response.data);
        })
        .catch((error) => {
            console.error("Error fetching bookings:", error);
        });
    }, [token]);

    return (
        <div className="movie-page-wrapper">
            <Adminnavbar />
            <div className="container py-5">
                
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                        <h1 className="display-6 fw-bold text-white mb-0">Booking Ledger</h1>
                        <p className="text-secondary">Track all ticket sales and theater occupancy</p>
                    </div>
                    <div className="text-end">
                        <Link to="/adminview" className="btn btn-outline-light rounded-pill px-4">
                            ← Dashboard
                        </Link>
                    </div>
                </div>

                {/* Glassmorphism Table */}
                <div className="admin-table-container shadow-lg">
                    <div className="table-responsive">
                        <table className="table table-dark table-hover mb-0 align-middle">
                            <thead>
                                <tr>
                                    <th className="ps-4">Ref ID</th>
                                    <th>Customer</th>
                                    <th>Movie Title</th>
                                    <th>Showtime</th>
                                    <th className="text-center">Tickets</th>
                                    <th className="text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.length > 0 ? (
                                    bookings.map(booking => (
                                        <tr key={booking.id}>
                                            <td className="ps-4">
                                                <code className="text-primary fw-bold">#BK-{booking.id}</code>
                                            </td>
                                            <td>
                                                <div className="text-white fw-semibold">{booking.user.username}</div>
                                                <div className="small text-secondary">{booking.user.email}</div>
                                            </td>
                                            <td className="text-white">
                                                {booking.movie.title}
                                            </td>
                                            <td>
                                                <div className="text-white">{booking.time}</div>
                                                <div className="small text-secondary">{booking.date}</div>
                                            </td>
                                            <td className="text-center">
                                                <span className="badge rounded-pill bg-primary px-3">
                                                    {booking.no_of_seats} Seats
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="text-success small fw-bold">
                                                    <i className="bi bi-check-circle-fill me-1"></i> Paid
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-5 text-secondary">
                                            No bookings found in the records.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(Viewbookings);