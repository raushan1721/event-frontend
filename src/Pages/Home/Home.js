import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import { requestWithToken } from "../../utils/httpRequest";
import { Link } from "react-router-dom";
function Home() {
  const [event, setEvent] = useState("upcoming");
  const [data, setData] = useState({ current: [], past: [], upcoming: [] });
  const status=["upcoming","current","past"];

  useEffect(() => {
    const getData = async () => {
      const result = await requestWithToken("GET", `/event`);
      setData(result.data.data);
    };
    getData();
  }, []);

  return (
    <div className={styles.home}>
      <header>
        <div className={styles.search}>
          <div className={styles.searchContainer}>
            <input placeholder="Search..."></input>
            <button>search</button>
          </div>
          <button>
            <Link
              to="/event/create"
              style={{ color: "black", textDecoration: "none" }}
            >
              + Create Event
            </Link>
          </button>
        </div>
        <div className={styles.eventButtons}>
          {
            status.map((d,id)=>(
              <p
              key={id}
              style={
                event === d
                  ? {
                      borderBottom: "4px solid rgb(45, 85, 100)",
                    }
                  : { border: "none" }
              }
              onClick={()=>setEvent(d)}
            >
              {d} Event ({data[d].length})
            </p>
            ))
          }

        </div>
      </header>
      <div className={styles.body}>
        <div className={styles.lists}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">EVENT NAME</th>
                <th scope="col">LOCATION</th>
                <th scope="col">EVENT DATE</th>
                <th scope="col">EVENT TIME</th>
              </tr>
            </thead>
            <tbody>
              {data[event].map((d, ind) => (
                <tr key={ind}>
                  <th scope="row">
                    <Link to={`/event/${d._id}`}>{d.title}</Link>
                  </th>
                  <td>{d.title}</td>
                  <td>{d.address}</td>
                  <td>{d.date}</td>
                  <td>{d.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
