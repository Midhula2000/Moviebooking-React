import React from "react";
import { Link } from "react-router-dom";
import Adminnavbar from "./Adminnavbar"; // Assuming you have an admin version
import './adminview.css'; // Custom styles for the admin dashboard
import checkAuth from "../auth/checkAuth";

function ListMovies() {
    return (
        <div className="admin-dashboard-wrapper">
            <Adminnavbar />
            
            <div className="container py-5 mt-5">
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold text-white">Admin Control Center</h1>
                    <p className="text-light opacity-75">Manage your theater, users, and reservations from one place.</p>
                </div>

                <div className="row g-4 justify-content-center">
                    {/* Movies Management Card */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="admin-card">
                            <div className="admin-card-icon">🎬</div>
                            <div className="card-body text-center">
                                <h2 className="card-title text-white h4">Movies</h2>
                                <p className="text-secondary small">Add, edit, or remove movie listings</p>
                                <Link to="/movielist" className="btn btn-primary stretched-link px-4">Manage Catalog</Link>
                            </div>
                        </div>
                    </div>

                    {/* Users Management Card */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="admin-card">
                            <div className="admin-card-icon">👥</div>
                            <div className="card-body text-center">
                                <h2 className="card-title text-white h4">Users</h2>
                                <p className="text-secondary small">Manage registered customers & profiles</p>
                                <Link to="/userlist" className="btn btn-primary stretched-link px-4">View Directory</Link>
                            </div>
                        </div>
                    </div>

                    {/* Bookings Management Card */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="admin-card">
                            <div className="admin-card-icon">🎟️</div>
                            <div className="card-body text-center">
                                <h2 className="card-title text-white h4">Bookings</h2>
                                <p className="text-secondary small">Track all active ticket reservations</p>
                                <Link to="/adminbookinglist" className="btn btn-primary stretched-link px-4">Sales Report</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(ListMovies);