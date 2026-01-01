import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../API/apiCall";

export function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = async (formData: FormData) => {
      const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        mobileNumber: formData.get('mobileNumber'),
        email: formData.get('email'),
        password: formData.get('password'),
      }
      const result = await publicRequest({path: "auth/sign-up", method: "post", data});
      if(result) navigate("/signIn");
      return
  };

  return (
    <>
    <form action={handleSignUp} className="container-lg position-absolute top-50 start-50 translate-middle">
    <div className="raw d-flex align-self-center justify-content-center align-middle">
        <div className="col-md-6 col-10 shadow p-3 mb-5 bg-body rounded" id="form">
            <h1 className="text-center">Sign Up</h1>
            <div className="form-floating mb-3">
              <input type="text" className="form-control text" id="floatingtext1" name="firstName" placeholder="FirstName" required/>
              <label htmlFor="firstName">First Name</label>
            </div>
              <div className="form-floating mb-3">
              <input type="text" className="form-control text" id="floatingtext2" name="lastName" placeholder="LastName" required/>
              <label htmlFor="lastName">Last Name</label>
            </div>

            <div className="form-floating mb-3">
              <input type="text" className="form-control text" id="floatingtext3" name="mobileNumber" placeholder="Mobile Fhone" required/>
              <label htmlFor="mobileNumber">Mobile Phone</label>
            </div>

            <div className="form-floating mb-3">
                <input type="email" className="form-control email" id="floatingInput" name="email" placeholder="name@example.com" required/>
                <label htmlFor="email">Email Address</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control password" id="floatingPassword" name="password" placeholder="Password" required/>
                <label htmlFor="password">Password</label>
            </div>
            <div className="button mt-3">
                <button type="submit" className="btn btn-success w-100">SignUp</button>
                <button className="float-end btn btn-link" onClick={() => navigate("/signIn")}>I have already an account <i className="fa fa-hand-peace-o" style= {{fontSize:"24x", color:"red"}}></i></button>
            </div>
        </div>
    </div>
    </form>
    </>
  );
}
