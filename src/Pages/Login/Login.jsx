import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./login.css";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";

const Login = () => {
  const history = useNavigate();
  const location = useLocation();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const handleLogin = (e) => {};

  return (
    <>
      <div className="login-wrapper py-5">
        <div className="container">
          <div className="row gx-5 justify-content-center align-items-center">
            <div className="col-md-6 col-12 d-md-block d-none ">
              <img src="/images/log.png" className="img-fluid" />
            </div>
            <div className="col-md-6 col-12 mt-3">
              <div className="login-container">
                <div className="login-card">
                  <div className="header-logo m-auto">
                    <FacebookRoundedIcon
                      style={{
                        color: "rgb(25, 154, 177)",
                        fontSize: "3.5rem",
                      }}
                      className="m-auto"
                    />
                  </div>
                  <h2 className="text-center">Login</h2>
                  <form onSubmit={(e) => handleLogin(e)}>
                    <div className="login-input">
                      <div>
                        <label className="mb-2">Enter email</label>
                        <input
                          type="email"
                          value={email}
                          required={true}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="mt-4 mb-4">
                        <label className="mb-2">Enter password</label>
                        <input
                          type="password"
                          value={password}
                          required={true}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <button className="login-btn mb-4">Submit</button>

                    <p className="text-center">
                      Not a member yet? <Link to={"/register"}>Register</Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
