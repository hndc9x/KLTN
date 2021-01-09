import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { Redirect } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { login, signup, signupG as _signupG } from "../../redux/actions";
import GoogleLogin from "react-google-login";
import GitHubLogin from "react-github-login";
import "./style.css";

const LoginRegister = ({ location }) => {
  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj.email);
    const firstName = response.profileObj.familyName;
    const lastName = response.profileObj.givenName;
    const email = response.profileObj.email;
    const password = response.profileObj.googleId;

    const userG = { firstName, lastName, email, password };
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      return;
    }
    dispatch(_signupG(userG));
  };

  const onSuccess = (response) => console.log(response);
  const onFailure = (response) => console.error(response);

  const { pathname } = location;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }

  const userSignup = () => {
    const user = { firstName, lastName, email, password };
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      return;
    }

    dispatch(signup(user));
  };

  const userLogin = () => {
    dispatch(login({ email, password }));
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Hello! | Login</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login Register
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={userLogin}>
                              <input
                                value={email}
                                type="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              <input
                                value={password}
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <GoogleLogin
                                className="LoginByGoogle"
                                clientId="771497100146-lfdmdp81b33jls8tt23mtok4uuo02na9.apps.googleusercontent.com"
                                buttonText="Login in with Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={"single_host_origin"}
                              />
                              <p></p>
                              {/* login with fb and github */}
                              <GitHubLogin
                                clientId="7bdf766990f8c397b80f"
                                onSuccess={onSuccess}
                                onFailure={onFailure}
                              />
                              <button className="github">
                                Log In With Gitub
                              </button>
                              <button className="facebook">
                                Log In With Facebook
                              </button>
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  {/* <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link> */}
                                </div>
                                ,
                                <button type="submit">
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={userSignup}>
                              <input
                                value={firstName}
                                type="text"
                                placeholder="First Name"
                                onChange={(e) => setFirstName(e.target.value)}
                              />
                              <input
                                value={lastName}
                                type="text"
                                placeholder="Last Name"
                                onChange={(e) => setLastName(e.target.value)}
                              />
                              <input
                                value={email}
                                placeholder="Email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              <input
                                value={password}
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <div className="button-box">
                                <button type="submit">
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object,
};

export default LoginRegister;
