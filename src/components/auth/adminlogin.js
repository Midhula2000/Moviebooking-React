import axios from "axios";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { setAdmin } from "../../store/authSlice";

import checkGuest from "./checkGuest";
import { useNavigate } from "react-router-dom";
import './usersignup.css';


function Login() {
    
    var [username, setUsername] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate=useNavigate();
    
    function attemptLogin() {
  

        axios.post('http://127.0.0.1:8000/movie/login', {
            username: username,
            password: password
        }).then(res => {
            console.log(res.data);
            var user={
                username:username,
                token: res.data.token
            }
            dispatch(
                setAdmin(user)
            )
            navigate('/adminview')
        })
        .catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(''))
            }else if(error.response.data.message){
                setErrorMessage(error.response.data.message)
            }else{
                setErrorMessage('Failed to login user. Please contact admin')
            }
        })
    }
return (<div className="background d-flex align-items-center" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
    <div className="container">
        <div className="row">
            <div className="col-11 col-sm-10 col-md-8 col-lg-9 mx-auto">
                
                <div className="card ott-card border-0 shadow-lg p-4  w-100 " >
                    <div className="card-body w-50 mx-auto">  
                        <h2 className="text-center mb-4 font-weight-bold" style={{ color: '#333' }}>Welcome Back</h2>
                        <p className="text-center text-white mb-4">Please enter your details to login</p>
                        
                        {errorMessage && (
                            <div className="alert alert-danger py-2 small">{errorMessage}</div>
                        )}

                        <div className="form-group mb-3">
                            <label className="small font-weight-bold">Username</label>
                            <input 
                                type="text"
                                className="form-control form-control-lg shadow-sm"
                                placeholder="Enter your username"
                                style={{ fontSize: '0.9rem' }}
                                value={username}
                                onInput={(event) => setUsername(event.target.value)}
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label className="small font-weight-bold">Password</label>
                            <input 
                                type="password"
                                className="form-control form-control-lg shadow-sm"
                                placeholder="••••••••"
                                style={{ fontSize: '0.9rem' }}
                                value={password}
                                onInput={(event) => setPassword(event.target.value)}
                            />
                        </div>

                        <button 
                            className="btn btn-primary btn-lg w-100 shadow-sm" 
                            style={{ borderRadius: '8px', fontWeight: '600' }}
                            onClick={attemptLogin}
                        >
                            Login
                        </button>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>)
}

export default checkGuest(Login);