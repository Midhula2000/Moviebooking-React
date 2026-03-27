import React, { useState, useEffect } from "react";
import Adminnavbar from "./Adminnavbar";
import axios from "axios";
import { Link } from "react-router-dom";
import './userlist.css';
import checkAuth from "../auth/checkAuth";


function Userlist() {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')).token : null;

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/movie/list_users', {
            headers: { Authorization: `Token ${token}` }
        })
        .then((response) => {
            setUsers(response.data);
        })
        .catch((error) => {
            console.error("Error fetching users:", error);
        });
    }, [token]);

   const handleToggleBlock = (userId, currentStatus) => {
    const action = currentStatus ? "block" : "unblock";
    
    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
    
        axios.post(`http://127.0.0.1:8000/movie/blockuser/${userId}/`, {}, {
            headers: { Authorization: `Token ${token}` }
        })
        .then(() => {
            alert(`User ${action}ed successfully`);
            
         
            setUsers(prevUsers => 
                prevUsers.map(user => 
                    user.id === userId ? { ...user, is_active: !user.is_active } : user
                )
            );
        })
        .catch(error => {
            console.error(`Error during ${action}:`, error);
            alert(`Failed to ${action} user`);
        });
    }
};
      

    return (
        <div className="movie-page-wrapper">
            <Adminnavbar />
            <div className="container py-5">
                
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                        <h1 className="display-6 fw-bold text-white mb-0">Registered Users</h1>
                        <p className="text-secondary">View and manage customer accounts</p>
                    </div>
                    <Link to="/adminview" className="btn btn-outline-light rounded-pill px-4">
                        ← Dashboard
                    </Link>
                </div>

                {/* Table Container */}
                <div className="admin-table-container shadow-lg">
                    <div className="table-responsive">
                        <table className="table table-dark table-hover mb-0 align-middle">
                            <thead>
                                <tr>
                                    <th className="ps-4">UID</th>
                                    <th>Username</th>
                                    <th>Email Address</th>
                                    <th className="text-center">Status / Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map(user => (
                                        <tr key={user.id}>
                                            <td className="ps-4">
                                                <code className="text-primary fw-bold">#{user.id}</code>
                                            </td>
                                            <td className="text-white fw-semibold">{user.username}</td>
                                            <td className="text-secondary">{user.email}</td>
                                            <td className="text-center">
    <button 
        className={`btn btn-sm rounded-pill px-3 shadow-sm ${
            user.is_active ? "btn-outline-danger" : "btn-success"
        }`}
        onClick={() => handleToggleBlock(user.id, user.is_active)}
        style={{ minWidth: "110px" }} // Keeps button size consistent when text changes
    >
        {user.is_active ? (
            <span><i className="bi bi-slash-circle me-1"></i> Block</span>
        ) : (
            <span><i className="bi bi-check-circle me-1"></i> Unblock</span>
        )}
    </button>
</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-5 text-secondary">
                                            No users found in the database.
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

export default checkAuth(Userlist);