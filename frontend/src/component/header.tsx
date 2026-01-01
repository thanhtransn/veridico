import { useNavigate } from "react-router-dom";
import { useAuth } from "../hoc/authContext";

export function Header() {
  const navigate = useNavigate();
  const {setUserContext} = useAuth()
  const handleClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUserContext(null)
    navigate("/signIn");
  };

  return (
    <>
      <div
        className="container shadow-lg p-3 mb-3 bg-body rounded" style={{padding: 0}}
      >
        <div className="d-flex flex-row justify-content-between">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleClick()}
        >
          {" "}
          VERIDICO LOGO
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleLogout()}
        >
          {" "}
          LOG OUT
        </button>
        </div>
      </div>
    </>
  );
}

