import { useEffect, type FC } from "react";
import { useNavigate } from "react-router-dom";

export function withAuthRequired(Component: FC) {
  return function () {
    const navigate = useNavigate();
   
    const token = localStorage.getItem("token");

    useEffect(() => {
      if (!token) {
        navigate("/signIn");
      }
    }, []);


    return <Component />
  };
}
