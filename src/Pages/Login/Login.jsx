import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./login.css";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import { login } from "./../../Redux/Action/UserAction";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../Components/Loading/Error/Loading";
import Message from "./../../Components/Loading/Error/Error";

const Login = () => {
  const history = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  React.useEffect(() => {
    if (userInfo) {
      history(redirect);
    }
  }, [history, userInfo, redirect]);

  return (
    <>
      <div className="login-wrapper py-5">
        <div className="container">
          <div className="row gx-5 justify-content-center align-items-center">
            <div className="col-md-6 col-12 d-md-none d-block mob-face ">
              <img src="/images/v.png" className="img-fluid" />
            </div>
            <div className="col-md-6 col-12 d-md-block d-none ">
              <img src="/images/log.png" className="img-fluid" />
            </div>
            <div className="col-md-6 col-12 mt-3">
              <div className="login-container">
                <div className="login-card">
                  <div className="header-logo m-auto">
                    <img
                      className="img-fluid"
                      src="/images/v.png"
                      style={{ width: "30px" }}
                    />
                  </div>
                  <h2 className="text-center">Login</h2>

                  {error && <Message variant="danger">{error}</Message>}
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

                    <button
                      className="login-btn mb-4 d-flex justify-content-center align-items-center"
                      disabled={loading || !email || !password}
                    >
                      {loading ? (
                        <>
                          <span>signing in</span> <Loading />
                        </>
                      ) : (
                        <span>Submit</span>
                      )}
                    </button>

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
