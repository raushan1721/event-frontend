import React, { useState } from "react";
import { requestWithToken } from "../../../utils/httpRequest";
import styles from "../index.module.css";
import { GoogleLogin } from "react-google-login-include-granted-scopes";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await requestWithToken("POST", "/auth", form);
    if (result.data.status === 0) {
      window.localStorage.setItem("isLoggedIn", false);
    } else {
      window.localStorage.setItem("isLoggedIn", true);
      window.localStorage.setItem("user", JSON.stringify(result.data.data));
      window.localStorage.setItem("token",result.data.token);
      window.location.replace("/home");
    }
  };

  const google = async (googleData) => {
    const result = await requestWithToken("POST", "/socialauth/google", {
      token: googleData.tokenId,
    });
    if (result.data.status === 0) {
      window.localStorage.setItem("isLoggedIn", false);
    } else {
      window.localStorage.setItem("isLoggedIn", true);
      window.localStorage.setItem("user", JSON.stringify(result.data.data));
      window.localStorage.setItem("token",result.data.token);
      window.location.replace("/home");
    }
  };
  const facebook = () => {
    window.open("http://localhost:3000/auth/facebook", "_self");
  };

  return (
    <div className={styles.login}>
      <div className="d-flex align-items-center flex-column">
        <div
          className="d-flex flex-column align-items-center"
          style={{
            border: "1px solid black",
            borderRadius: "3px",
            padding: "20px",
          }}
        >
          <div className={styles.top}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => handleInput(e)}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => handleInput(e)}
                required
              />
              <button className={styles.submit}>Login</button>
            </form>
          </div>
          <div className={styles.center}>
            <div className={styles.line}></div>
            <div className={styles.or}>OR</div>
          </div>
          <div
            className={`${styles.bottom} d-flex flex-column flex-sm-row gap-2`}
            style={{ marginTop: "20px" }}
          >
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID}
              render={(renderProps) => (
                <button
                  className={`${styles.loginButton} ${styles.google}`}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  {" "}
                  <img
                    src="https://raw.githubusercontent.com/safak/youtube/react-social-login/client/src/img/google.png"
                    alt=""
                    className="icon"
                  />
                  Google
                </button>
              )}
              onSuccess={google}
              onFailure={google}
              cookiePolicy={"single_host_origin"}
            />

            <div
              className={`${styles.loginButton} ${styles.facebook}`}
              onClick={facebook}
            >
              <img
                src="https://raw.githubusercontent.com/safak/youtube/react-social-login/client/src/img/facebook.png"
                alt=""
                className="icon"
              />
              Facebook
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
