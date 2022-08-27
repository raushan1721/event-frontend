import React, { useEffect, useState } from "react";
import styles from "./edit.module.css";
import { requestWithToken } from "../../utils/httpRequest";
function Edit() {
  const { name, email } = JSON.parse(window.localStorage.getItem("user"));

  const [user, setUser] = useState({ name, email });
  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  return (
    <div className={styles.edit}>
      <form className={styles.form}>
        <div class="form-group">
          <label for="exampleInputPassword1">Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Name"
            value={user.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={user.email}
            onChange={(e) => handleChange(e)}
          />
          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Current Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">New Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Edit;
