import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './usersignup.css';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    function userSignup() {
        const user = {
            username: username,
            email: email,
            password1: password,
            password2: passwordConfirmation
        };
        console.log(user);

        axios.post('http://127.0.0.1:8000/booking/signup', user,{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        .then(response => {
                setErrorMessage('');
                navigate('/userlogin');
        })
        .catch(error => {
            if (error.response.data.errors) {
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            } else {
                setErrorMessage('Failed to connect to the API');
                }
            });
    }

    return (
       <div className="ott-page-wrapper">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            {/* Added 'ott-card' custom class */}
            <div className="card ott-card w-100 mx-auto shadow-lg">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="ott-title">Register</h2>
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
                    <label className="text-light-50 mb-1">Email Address</label>
                    <input
                      type="email"
                      className="form-control ott-input"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="name@example.com"
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

                  <div className="form-group mb-4">
                    <label className="text-light-50 mb-1">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control ott-input"
                      value={passwordConfirmation}
                      onChange={(event) => setPasswordConfirmation(event.target.value)}
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="form-group">
                    <button className="btn btn-ott-primary w-100 py-2" onClick={userSignup}>
                      Get Started
                    </button>
                  </div>

                  <p className="text-center mt-3">Already have an account?<a href="/userlogin"><span>Login here</span></a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default Signup;

