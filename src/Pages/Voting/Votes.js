import React, { useEffect, useState } from "react";
import styles from "./vote.module.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
const baseUrl = "https://event-management1721.herokuapp.com";

function Votes() {
  const [status, setStatus] = useState(null);
  const [data, setData] = useState(null);
  const event = useLocation().pathname.split("/")[3];
  const [input, setInput] = useState(0);
  const [form, setForm] = useState({
    event: event,
    coming: 0,
    notcoming: 0,
    maybe: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(baseUrl+"/vote/" + event);
      setData(result.data.data);
    };
    fetchData();
  }, [event]);

  const handleSubmit = async () => {
    form[status] = input;
    const result = await axios.post(baseUrl+"/vote/new", form); 
    if (result.data.status)
    {
      alert("your response is recorded , Thanx!!")
      window.location.replace("/event/vote/"+event)
      }
  };

  return (
    <div className={styles.votes}>
      <div className={styles.top}>
        <div className={styles.eventDetails}>
          <div className={styles.title}>{data?.title}</div>
          <div className={styles.organizer}>by {data?.user.name}</div>
          <div className={styles.location}>{data?.address}</div>
        </div>
      </div>
      <div className={styles.details}>
        <div
          className={`d-flex flex-column flex-lg-row gap-0 gap-lg-3`}
          style={{ width: "100%" }}
        >
          <div className="form-floating mb-3" style={{ flex: "6" }}>
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="full name"
            />
            <label for="floatingInput">Full Name</label>
          </div>
          <div className="form-floating mb-3" style={{ flex: "6" }}>
            <input
              type="number"
              className="form-control"
              id="floatingInput"
              placeholder="No. of members"
              onChange={(e) =>setInput(e.target.value)}
            />
            <label for="floatingInput">
              Total Members belongs to this event
            </label>
          </div>
        </div>
      </div>
      <div className={styles.voting}>
        <div className={styles.date}>
          {data?.date} {data?.time}
        </div>
        <div className={styles.options}>
          <div
            className={`d-flex justify-content-between`}
            style={{ width: "100%" }}
          >
            <div className={status==="coming"?styles[status]:null} onClick={() => setStatus("coming")} >
              coming
            </div>
            <div className={status==="maybe"?styles[status]:null} onClick={() => setStatus("maybe")}>
              maybe
            </div>
            <div
              className={status==="notcoming"?styles[status]:null}
              onClick={() => setStatus("notcoming")}
            >
              not coming
            </div>
          </div>
        </div>

        <div className={`${styles.line} ${styles[status]}`}></div>
      </div>
      <button className={styles.submit} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default Votes;
