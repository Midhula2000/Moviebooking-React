import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const checkAuth = (Component) => {

    function Wrapper(props){

        const navigate = useNavigate();
        const location = useLocation();

        useEffect(()=>{

                  const token = localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')).token : null;

            if(!token){
                navigate("/adminlogin", { state: { from: location } });
            }

        },[navigate,location]);

        return <Component {...props}/>;

    }

    return Wrapper;

}

export default checkAuth;