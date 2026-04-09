import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const UserCheckGuest = (Component) => {
  function Wrapper(props) {
    const user = useSelector((store) => store.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
      if (user) {
        navigate('/usermovielist'); // or your main page
      }
    }, [user, navigate]);

    return <Component {...props} />;
  }

  return Wrapper;
};

export default UserCheckGuest;