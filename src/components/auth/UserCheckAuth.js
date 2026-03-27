import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const UserCheckAuth = (Component) => {

    function Wrapper(props){

        const navigate = useNavigate();
        const location = useLocation();

        useEffect(()=>{

                  const token = localStorage.getItem('token');
    console.log("Token in UserCheckAuth:", token); // Debugging log
            if(!token){
                navigate("/userlogin", { state: { from: location } });
            }

        },[]);

        return <Component {...props}/>;

    }

    return Wrapper;

}

export default UserCheckAuth;