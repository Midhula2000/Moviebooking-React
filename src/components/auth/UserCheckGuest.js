import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

export const UserCheckGuest = (Component) =>{
    function Wrapper(props){
        var user = useSelector(store=>store.auth.admin);
        var navigate = useNavigate();
        useEffect(()=>{
            if(!user){
                navigate('/userlogin');
            }
        },[user])
        return  <Component {...props}/>;
    }
    return Wrapper;
}

export default checkGuest;