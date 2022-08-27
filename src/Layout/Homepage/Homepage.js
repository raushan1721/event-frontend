import React from "react";
import styles from "./homepage.module.css";
import { Link } from "react-router-dom";

function Homepage(props) {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const handleLogout = async () => { 
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("isLoggedIn");
    window.location.replace("/signin");
  };

  return (
    <div className={styles.homepage}>
      <nav className={styles.navigation}>
        <div className={styles.logo}>
          <Link to="/home" className="link">
            GUESTS{" "}
          </Link>
        </div>
        <div className={styles.profile}>
          <div className="dropdown">
            <div
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              className="d-flex align-items-center"
              style={{ gap: "10px" }}
            >
              <img
                className={styles.profileImage}
                src={user.image}
                alt="profile"
              />
              <p>{user.name}</p>
            </div>
            <div
              className={`${styles.dropdown} dropdown-menu `}
              aria-labelledby="dropdownMenuButton1"
            >
              <div className="d-flex flex-column">
                <Link to="/profile/edit">
                  <button className={styles.edit}>Edit profile</button>
                </Link>
                <button className={styles.logout} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className={styles.body}>
        <div className={styles.left}>
          <Link to="/home" className={styles.link}>
            <div className={styles.side_icon}>
              {" "}
              <i className="fas fa-calendar"></i>
              <p>Events</p>
            </div>
          </Link>
          <Link to="/guests" className={styles.link}>
            <div className={styles.side_icon}>
              {" "}
              <i className="fas fa-users"></i>
              <p>Guests</p>
            </div>
          </Link>
          <Link to="/home" className={styles.link}>
            <div className={styles.side_icon}>
              {" "}
              <i className="fas fa-calendar"></i>
              <p>Events</p>
            </div>
          </Link>
          <Link to="/profile/edit" className={styles.link}>
            <div className={styles.side_icon}>
              {" "}
              <i className="fas fa-user"></i>
              <p>Profile</p>
            </div>
          </Link>
        </div>
        <div className={styles.right}>{<props.component />}</div>
      </div>
    </div>
  );
}

export default Homepage;
