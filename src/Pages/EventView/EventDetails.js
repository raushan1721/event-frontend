import React, { useEffect, useState } from "react";
import { requestWithToken } from "../../utils/httpRequest";
import styles from "./eventDetails.module.css";
import { useLocation } from "react-router-dom";


function EventDetails() {
  const [data, setData] = useState([]);
  const id = useLocation().pathname.split("/")[3];
  const link = "http://localhost:3000/event/vote/" + id;
  const [copy, setCopy] = useState(false);
  const [vote, setVote] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await requestWithToken("GET", "/event/" + id);
      const v = await requestWithToken("GET", "/vote/count/" + id);
      setVote(v.data.data);
      setData(result.data.data);
    };
    fetchData();
  }, [id]);

  const totalMembers = data.guests
    ?.map((item) => item.members)
    .reduce((prev, curr) => prev + curr, 0);

  const handleClick = () => {
    navigator.clipboard.writeText(link);
    setCopy(true);
    setTimeout(() => setCopy(false), 3000);
  };
  return (
    <div className={styles.eventDetails}>
      <div
        className={`${styles.top} d-flex justify-content-between flex-column flex-lg-row gap-3 text-lg-start text-center`}
      >
        <div>
          <p className={styles.title}>{data.title}</p>
          <p className={styles.subtitle}>
            <span>{data.address}, </span>
            <span>
              {data.date}
              {"  "}
            </span>
            <span>
              {"  "}
              {data.time}
            </span>
          </p>
        </div>
        <div>
          <div className={styles.link}>
            <p>
              Copy link to share. (Voting Link){" "}
              <span style={{ color: "#fff", background: "green" }}>
                {copy ? "copied" : null}
              </span>{" "}
            </p>
            <div
              className={`d-flex justify-content-between align-items-center gap-2`}
              onClick={handleClick}
            >
              <p
                style={{
                  background: "rgb(234, 234, 234)",
                  marginTop: "5px",
                  textTransform: "lowercase",
                }}
              >
                {link}{" "}
                <i
                  className="far fa-copy"
                  style={{ fontSize: "1.3em", cursor: "pointer" }}
                ></i>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={`d-flex flex-wrap gap-3 justify-content-center`}>
        <div className={styles.box}>
          <div>
            <div className={styles.name}>No. of family invited</div>
            <div className={styles.count}>{data.guests?.length}</div>
          </div>
        </div>
        <div className={styles.box}>
          <div>
            <div className={styles.name}>Total members in all family</div>
            <div className={styles.count}>
              {totalMembers ? totalMembers : 0}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.votesBox}>
        <p>
          No. of people casted votes: <span>{vote?.total} </span>
        </p>

        <div
          className={`d-flex flex-wrap gap-3 justify-content-center`}
          style={{ padding: "10px 20px 20px 20px", overflowX: "hidden" }}
        >
          <div className={`${styles.Vbox} ${styles.coming}`}>
            <div>
              <div className={styles.name}>No. of people coming</div>
              <div className={styles.count}>{vote?.coming}</div>
            </div>
          </div>
          <div className={`${styles.Vbox} ${styles.maybe}`}>
            <div>
              <div className={styles.name}>No. of people maycome or not</div>
              <div className={styles.count}>{vote?.maybe}</div>
            </div>
          </div>
          <div className={`${styles.Vbox} ${styles.notcoming}`}>
            <div>
              <div className={styles.name}>No. of people not coming</div>
              <div className={styles.count}>{vote?.notcoming}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
