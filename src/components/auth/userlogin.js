
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import UserCheckGuest from "./UserCheckGuest";

function UserLogin() {
    var [username, setUsername] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
   
    
    function attemptLogin() {
        axios.post(`http://127.0.0.1:8000/booking/login`,{
            username:username,
            password:password
        }).then(response=>{
            console.log("Login response:", response.data); 
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user_id', response.data.user_id);
            setErrorMessage('')
            var user = {
                username:username,
                token:response.data.token
            }
            dispatch(setUser(user));
            navigate("/usermovielist");
        } else {
            setErrorMessage('No token received, check the backend response.');
        }
        }).catch(error => {
    console.error('Login failed:', error);

    if (error.response && error.response.data) {
        if (error.response.data.error) {
            setErrorMessage(error.response.data.error);
        } else if (error.response.data.message) {
            setErrorMessage(error.response.data.message);
        } else {
            setErrorMessage('Failed to login user. Please contact admin');
        }
    } else {
        setErrorMessage('Server not responding');
    }
});
    }
    return (<div>
        <Navbar/>
        <div className="ott-page-wrapper">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            {/* Added 'ott-card' custom class */}
            <div className="card ott-card w-100 mx-auto shadow-lg">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="ott-title">Login</h2>
                  <p className="text-muted">Join the ultimate streaming experience</p>
                </div>
                
                <div className="card-content">
                  {errorMessage ? <div className="alert alert-danger py-2">{errorMessage}</div> : ''}
                  
                  <div className="form-group mb-3">
                    <label className="text-light-50 mb-1">Username</label>
                    <input
                      type="text"
                      className="form-control ott-input"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      placeholder="Enter username"
                    />
                  </div>


                  <div className="form-group mb-3">
                    <label className="text-light-50 mb-1">Password</label>
                    <input
                      type="password"
                      className="form-control ott-input"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="••••••••"
                    />
                  </div>

                

                  <div className="form-group">
                    <button className="btn btn-ott-primary w-100 py-2" onClick={attemptLogin}>
                      Get Started
                    </button>
                  </div>
                  <p className="text-center mt-3">Don't have an account?<a href="/usersignup"><span>Sign up here</span></a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>)



}

export default UserCheckGuest(UserLogin);