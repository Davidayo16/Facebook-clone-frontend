import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./login.css";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import { login, register } from "./../../Redux/Action/UserAction";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../Components/Loading/Error/Loading";
import Message from "./../../Components/Loading/Error/Error";
const Register = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;
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
              <img src="/images/reg.png" className="img-fluid" />
            </div>
            <div className="col-md-6 col-12 mt-3">
              <div className="login-container">
                <div className="login-card">
                  <div className="header-logo m-auto">
                    <div className="header-logo m-auto">
                      <img
                        className="img-fluid"
                        src="/images/v.png"
                        style={{ width: "30px" }}
                      />
                    </div>
                  </div>

                  <h2 className="text-center">Register</h2>
                  {error && <Message variant="danger">{error}</Message>}
                  <form onSubmit={(e) => handleRegister(e)}>
                    <div className="login-input">
                      <div className="mb-4">
                        <label className="mb-2">Enter name</label>
                        <input
                          type="text"
                          value={name}
                          required={true}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
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
                      disabled={loading || !email || !password || !name}
                    >
                      {loading ? (
                        <>
                          <span>signing up</span> <Loading />
                        </>
                      ) : (
                        <span>Submit</span>
                      )}
                    </button>
                    <p className="text-center">
                      Already a member? <Link to={"/login"}>Login</Link>
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

export default Register;
