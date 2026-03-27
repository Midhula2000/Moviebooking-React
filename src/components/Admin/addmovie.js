import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Adminnavbar from "./Adminnavbar";
import { useSelector } from "react-redux";
import checkAuth from "../auth/checkAuth";

function AddMovies() { // Pass token as a prop
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState(''); 
    const [image_url, setImageUrl] = useState('');
    const navigate = useNavigate();

    const admin= localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')) : null;
   

    
    function addMovie() {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("genre", genre);
      formData.append("image_url", image_url);

      axios.post('http://127.0.0.1:8000/movie/create_movie',formData,
            {
                headers: {
                    'Authorization': 'Token '+admin.token // Use the token variable
                }
            }
        )
        .then((response) => {
          navigate('/movielist');
          console.log(formData);
        })
        .catch(error => {
            navigate('/movielist');
            console.log("scene");
            console.error('Error adding movie:', error);
        });
    }

    return (
        <div>
            <Adminnavbar />
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="card-title text-center mb-4">Add Movies</h1>
                                <div className="form" >
                                <div className="form-group">
                                    <label>Title:</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={title} 
                                        onChange={(event) => setTitle(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description:</label>
                                    <textarea 
                                        className="form-control" 
                                        value={description} 
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Genre:</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={genre} 
                                        onChange={(event) => setGenre(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Image URL:</label>
                                    <input 
                                        type="file" 
                                        className="form-control" 
                                       
                                        onChange={(event) => setImageUrl(event.target.files[0])}
                                    />
                                </div>
                                <div className="form-group">
                                <button className="btn btn-primary btn-block" onClick={(event) => addMovie(event)}>Submit</button>
  </div>
                            </div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(AddMovies);





