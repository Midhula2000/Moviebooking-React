import React from "react";
import { NavLink } from "react-router-dom";



function Adminnavbar(){

    function Adminlogout(){
        localStorage.removeItem('admin');
        window.location.href='/adminlogin';
    }
     return <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="navbar-brand">
                <h4>MOVIE WORLD</h4>
            </div>
            <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div
            className="collapse navbar-collapse mr-auto"
            id="navbarNav"
            style={{ float: "left" }}
            >
                <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
                    <li className="nav-item">
                    <NavLink to={"/adminview"} className="nav-link">
                        Home
                    </NavLink>
                    </li>
                  
                    <li className="nav-item">
                    <NavLink to={"/movielist"} className="nav-link">
                        Movies
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to={"/userlist"} className="nav-link">
                        User
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to={"/adminbookinglist"} className="nav-link">
                        Bookings
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink onClick={Adminlogout} className="nav-link">
                        Logout
                    </NavLink>
                    </li>
               
                </ul>
            </div>
        </nav>;
    }
    
    export default Adminnavbar;