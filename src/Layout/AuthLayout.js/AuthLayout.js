import React from "react";
import styles from "./authlayout.module.css";
import { Link } from "react-router-dom";
function AuthLayout(props) {
  return (
    <div className={styles.authlayout}>
      <div className={styles.backgroundImage}>
        <nav className={styles.navbar}>
          <div className="d-flex justify-content-between">
            <div className={styles.title}>Coming Or Not&nbsp;?</div>
            <div className={styles.authOptions}>
              <ul className="d-flex">
                <Link to="/signin" className="link">
                  <li>SignIn</li>
                </Link>
                <Link to="/signup" className="link">
                  <li>Register</li>
                </Link>
              </ul>
            </div>
          </div>
        </nav>
        <span className={styles.subTitle}>
          Pick a date for your event with family and friends
        </span>
        <div className={styles.authForm}>{<props.component />}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
