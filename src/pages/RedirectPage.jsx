
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // if (isAuthenticated) {
    //   navigate("/todos");
    // } else {
    //   navigate("/login");
    // }
    navigate('/groups')
  }, [navigate])
}

export default RedirectPage