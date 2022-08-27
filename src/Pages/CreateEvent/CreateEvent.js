import React, { useState } from "react";
import styles from "./createEvent.module.css";
import { requestWithToken } from "../../utils/httpRequest";
import Loader from "../../components/Loader";
function CreateEvent() {
  const inititalState={
    title: "",
    address: "",
    date: "",
    time: "",
  }
  const [form, setForm] = useState(inititalState);
  const [isLoading, setIsLoading] = useState(false);
  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    await requestWithToken("POST", "/event", form);
    alert("Event is Created Successfully");
    setForm(inititalState);
    setIsLoading(false)
  };
  return (
    <div className={styles.createEvent}>
      <p className={styles.title}>
        Create An event with family and friends
      </p>
      <div className={styles.form}>
        <form className={styles.create} onSubmit={(e) => handleSubmit(e)}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Occassion"
              name="title"
              onChange={(e) => handleInput(e)}
              required
              value={form.title}
            />
            <label for="floatingInput">Occassion</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Location"
              name="address"
              onChange={(e) => handleInput(e)}
              required
              value={form.address}
            />
            <label for="floatingInput">Location</label>
          </div>

          <div
            className="d-flex flex-column flex-md-row gap-0 gap-md-4"
            
          >
            <div className="form-floating mb-3" style={{ flex: 6 }}>
              <p>Date</p>
              <input
                type="date"
                className="form-control"
                id="floatingInput"
                name="date"
                onChange={(e) => handleInput(e)}
                required
                value={form.date}
              />
            </div>
            <div className="form-floating mb-3" style={{ flex: 6 }}>
              <p>Time</p>
              <input
                type="time"
                className="form-control"
                id="floatingInput"
                name="time"
                onChange={(e) => handleInput(e)}
                required
                value={form.time}
              />
            </div>
          </div>
          <button type="submit">{isLoading ? <Loader/> : "Add Events"}</button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
