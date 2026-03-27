

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Adminnavbar from './Adminnavbar';
import { Link } from 'react-router-dom';
import './movielist.css';
import checkAuth from "../auth/checkAuth";


function MovieList() {
    const [movies, setMovies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [movieToDelete, setMovieToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

    // Calculate pagination values (inside component, not in return)
    const indexOfLastMovie = currentPage * itemsPerPage;
    const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
    const totalPages = Math.ceil(movies.length / itemsPerPage);

    useEffect(() => {
        fetchMovies();
    }, []);



    const fetchMovies = async () => {
        try {
            const token = localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')).token : null;
            const response = await axios.get('http://127.0.0.1:8000/movie/list_movies', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const openDeleteModal = (id) => {
        setMovieToDelete(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        if (!movieToDelete) return;
        try {
            const token = localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')).token : null;
            const headers = { Authorization: `Token ${token}` };
            await axios.delete(`http://127.0.0.1:8000/movie/delete_movie/${movieToDelete}`, { headers });
            // Update UI to remove the deleted movie
            setMovies(prev => prev.filter(movie => movie.id !== movieToDelete));
            setShowModal(false);
            setMovieToDelete(null);
            alert('Movie deleted successfully');
        } catch (error) {
            console.error("Error deleting movie:", error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setMovieToDelete(null);
    };

    // Prevent background scroll while modal is open and allow closing with Escape
    useEffect(() => {
        if (!showModal) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
        document.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = prevOverflow;
            document.removeEventListener('keydown', onKey);
        };
    }, [showModal]);
      // Handler function
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
       // ... inside return ...
<div className="movie-page-wrapper"> {/* Same dark wrapper for consistency */}
    <Adminnavbar />
    <div className="container py-5">
        <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
                <h1 className="text-white fw-bold mb-0">Movie Management</h1>
                <p className="text-secondary">Update, edit, or delete titles from your catalog</p>
            </div>
            <div className="d-flex gap-2">
                <Link to="/addmovie" className="btn btn-success rounded-pill px-4 shadow">
                    + Add New Movie
                </Link>
                <Link to="/adminview" className="btn btn-outline-light rounded-pill px-4">
                    Back
                </Link>
            </div>
        </div>

        <div className="admin-table-container shadow-lg">
            <table className="table table-dark table-hover mb-0">
                <thead>
                    <tr>
                        <th className="ps-4">Poster</th>
                        <th>Title</th>
                        <th>Genre</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentMovies.map(movie => (
                        <tr key={movie.id} className="align-middle">
                            <td className="ps-4">
                                <img 
                                    src={`http://127.0.0.1:8000${movie.image_url}`} 
                                    alt={movie.title} 
                                    className="admin-table-img shadow-sm"
                                />
                            </td>
                            <td>
                                <Link to={`/adminmoviedetail/${movie.id}`} className="movie-link fw-bold">
                                    {movie.title}
                                </Link>
                            </td>
                            <td><span className="badge bg-secondary opacity-75">{movie.genre}</span></td>
                            <td>
                                <div className="d-flex justify-content-center gap-2">
                                    <Link to={`/movie/edit_movie/${movie.id}`} className="btn btn-sm btn-outline-primary">
                                        Edit
                                    </Link>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => openDeleteModal(movie.id)}>
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Pagination controls */}
        <nav className="mt-4 d-flex justify-content-center">
            <ul className="pagination custom-pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(page)}>
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    </div>

    {/* Delete Modal - Added dark styling to the existing logic */}
    {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.8)" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark text-white border-secondary shadow-lg">
                    <div className="modal-header border-secondary">
                        <h5 className="modal-title">Confirm Deletion</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body py-4">
                        <p className="mb-0">Are you sure you want to delete this movie? This action is permanent.</p>
                    </div>
                    <div className="modal-footer border-secondary">
                        <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                        <button className="btn btn-danger px-4" onClick={confirmDelete}>Delete Movie</button>
                    </div>
                </div>
            </div>
        </div>
    )}
</div>
    );
}

export default checkAuth(MovieList);
