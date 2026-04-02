import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";

function AutoLogin({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch(setUser(user));
      console.log("ok");
      
    }
  }, []);

  return children;
}

export default AutoLogin;