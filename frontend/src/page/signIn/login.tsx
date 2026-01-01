import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../API/apiCall";

export function LogIn() {
  const navigate = useNavigate();
  const handleSignIn = async (formData: FormData) => {
    formData
       const data = {
        email: formData.get('email'),
        password: formData.get('password'),
      }
    const result = await publicRequest({path: "auth/sign-in", method:"post", data});
    if(result){
      localStorage.setItem("token", result.token);
      navigate("/");
    }
  };

  return (
    <>
      <form action={handleSignIn} className="container-lg position-absolute top-50 start-50 translate-middle">
        <div className="raw d-flex align-self-center justify-content-center align-middle">
          <div
            className="col-md-6 col-10 shadow p-3 mb-5 bg-body rounded"
            id="form"
          >
            <h1 className="text-center">Sign In</h1>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control email"
                id="floatingInput"
                placeholder="name@example.com"
                name="email"
                required
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control password"
                id="floatingPassword"
                placeholder="Password"
                name="password"
                required
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="button mt-3 d-flex justify-content-between">
              <button type="submit" className="btn btn-success w-50">
                SignIn
              </button>
              <button type="button" className="btn btn-danger w-50" onClick={() => navigate("/signUp")}>
                Create New Account
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
