import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import Signup from "./components/auth/usersignup";
import Login from "./components/auth/adminlogin";
import AddMovies from "./components/Admin/addmovie";
import ListMovies from "./components/Admin/adminview";
// import AboutUs from "./components/aboutus";
import MovieList from "./components/Admin/movielist";
import Edit from "./components/Admin/editmovie";
import SignUp from "./components/auth/adminsignup"
import UserLogin from "./components/auth/userlogin"
import UserMovieList from "./components/usermovielist";
import BookingForm from "./components/bookingform";
import MovieDetails from "./components/Moviedetail";
import AdminMovieDetails from "./components/Admin/Moviedetail";
import Userlist from "./components/Admin/Userlist";
import Viewbookings from "./components/Admin/Viewbookings";
import ListBooking from "./components/Userbookinglist";
import Aboutus from "./components/aboutus";

const router = createBrowserRouter([
    { path: '/', element: <App/> },
    { path : '/adminlogin', element: <Login/>},
    { path : '/adminsignup', element: <SignUp/>},
    { path : '/adminview', element: <ListMovies/>},
    { path : '/addmovie',element:<AddMovies/>},
    { path: '/movielist', element:<MovieList/>},
    { path: '/movie/edit_movie/:movieId', element:<Edit />},
    { path : '/adminmoviedetail/:id', element: <AdminMovieDetails/>},
     {path:'/adminbookinglist', element: <Viewbookings/>},
     {path : '/userlist', element: <Userlist/>},

    //USER ROUTES

    {path : '/usersignup', element: <Signup/>},
    {path : '/userlogin', element : <UserLogin/>},
    {path : '/usermovielist', element : <UserMovieList/>},
    {path : '/bookingform/:id', element: <BookingForm/> },
    {path : '/Moviedetail/:id/',element: <MovieDetails/>},
    {path: '/userbookings/:id', element: <ListBooking/>},
    {path: '/aboutus', element: <Aboutus/>},
   
   
    // { path : 'aboutus', element: <AboutUs/>},
])

export default router;