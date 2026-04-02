import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export const UserCheckAuth = (Component) => {

  function Wrapper(props) {

    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      if (!user) {
        navigate("/userlogin", { state: { from: location } });
      }
    }, [user, navigate, location]);

    if (!user) return null;

    return <Component {...props} />;
  }

  return Wrapper;
};

export default UserCheckAuth;