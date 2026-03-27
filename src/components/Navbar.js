import { NavLink, useNavigate, useLocation } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();
    const route = location.pathname;

    let userid = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    function handlelogout(){
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        navigate("/userlogin");
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

            <div className="navbar-brand">
                <h4>MOVIE WORLD</h4>
            </div>

            <div className="collapse navbar-collapse mr-auto" id="navbarNav">
                <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>

                  

                    {/* Hide My Bookings on Home and Login page */}
                    {route !== "/" && route !== "/userlogin" && (
                        <li className="nav-item">
                            <NavLink to={`/userbookings/${userid}`} className="nav-link">
                                My Bookings
                            </NavLink>
                        </li>
                        

                    )}
                    {/* Hide My Bookings on Home and Login page */}
                    {route !== "/" && route !== "/userlogin" && (
                    <li className="nav-item">
                        <NavLink to={"/usermovielist"} className="nav-link">
                            Movies
                        </NavLink>
                    </li>
                    )}
                    <li className="nav-item">
                        <NavLink to={"/aboutus"} className="nav-link">
                            About us
                        </NavLink>
                    </li>

                    {/* Hide Login button on Home and Login page */}
                    {!token && route !== "/" && route !== "/userlogin" && (
                        <li className="nav-item">
                            <NavLink to={"/userlogin"} className="nav-link">
                                Login
                            </NavLink>
                        </li>
                    )}

                    {/* Logout */}
                    {token && (
                        <li className="nav-item">
                            <NavLink to='' className="nav-link" onClick={handlelogout}>
                                Logout
                            </NavLink>
                        </li>
                    )}

                    {route === "/" && (
                        <>
                            

                            <li className="nav-item">
                                <NavLink to={"/usersignup"} className="nav-link">
                                    Signup
                                </NavLink>
                            </li>

                              {/* Hide Home on usermovielist and mybookings */}
                {route !== "/usermovielist" && route !== "/userbookings/:id" && (
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>
                    </li>
                )}
                        </>
                    )}

                </ul>
            </div>

        </nav>
    );
}

export default Navbar;