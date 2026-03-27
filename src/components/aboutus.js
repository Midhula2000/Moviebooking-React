import React from 'react';

import { Link } from 'react-router-dom';
import './aboutus.css'; // See the CSS below

const AboutUs = () => {
    return (
        <div className="about-page-wrapper">
          <Link 
  to="/" 
  className="home-btn btn-outline-primary btn-sm rounded-pill d-inline-flex align-items-center px-3"
>
<i className="bi bi-info-circle-fill me-2"></i>
  Home
</Link >
          <div className="about-content">
            
            {/* Hero Section */}
            <div className="about-hero d-flex align-items-center justify-content-center text-center">
                <div className="container">
                    <h1 className="display-3 fw-bold text-white mb-3">REDEFINING YOUR <span className="text-primary">CINEMA</span> EXPERIENCE</h1>
                    <p className="lead text-light mx-auto" style={{ maxWidth: '700px' }}>
                        From the latest blockbusters to timeless indie classics, we bring the magic of the big screen right to your fingertips.
                    </p>
                </div>
            </div>

            <div className="container py-5">
                {/* Story Section */}
                <div className="row align-items-center mb-5">
                    <div className="col-lg-6">
                        <h2 className="text-white fw-bold mb-4">Our Story</h2>
                        <p className="text-secondary">
                            Founded in 2024, our platform was born out of a simple passion: making movie-going seamless. We noticed that booking a seat shouldn't be harder than watching the movie itself. 
                        </p>
                        <p className="text-secondary">
                            Today, we serve thousands of cinephiles daily, providing real-time seat selection, instant digital tickets, and curated movie lists across various genres like Comedy, Romance, and Science Fiction.
                        </p>
                    </div>
                    <div className="col-lg-6">
                        <div className="about-image-card shadow-lg">
                            <img 
                                src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                                alt="Cinema Hall" 
                                className="img-fluid rounded"
                            />
                        </div>
                    </div>
                </div>

                <hr className="border-secondary my-5" />

               </div>
        </div>
        </div>
    );
};

export default AboutUs;