import React, { useEffect, useState } from "react";
import { requestWithToken } from "../../utils/httpRequest";
import { useLocation } from "react-router-dom";
import styles from "./eventView.module.css";
import { Link } from "react-router-dom";
function EventView() {
  const id = useLocation().pathname.split("/")[2];
  const [data, setData] = useState([]);
  const [tempData, setTempData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await requestWithToken("GET", "/event/" + id);
      setData(result.data.data);
    };
    getData();
  }, [id]);

  const handleImport = async () => {
    const result = await requestWithToken("GET", "/guest");
    setTempData(result.data.data);
  };

  useEffect(() => {
    setData({ ...data, guests: data.guests?.concat(tempData) });
  }, [tempData]);
  const handleAdd = async () => {
    const guests = [];
    const eventId = data._id;
    data.guests.map((d) => guests.push(d._id));
    await requestWithToken("POST", "/event/guest", { eventId, guests });
  };

  const handleDelete = () => {};
  return (
    <div className={styles.eventView}>
      <div className={styles.top}>
        <div>
          <p className={styles.title}>{data.title}</p>
          <p
            className={`${styles.info} d-flex justify-content-center gap-4 gap-md-5`}
          >
            <span>{data.address}</span>
            <span>{data.date}</span>
            <span>{data.time}</span>
          </p>
        </div>

        <div>
          <Link to={`/event/detail/${id}`} className="link">
            <div className={styles.link}>dashboard</div>
          </Link>
        </div>
      </div>
      <div className={`${styles.button} d-flex justify-content-center gap-3`}>
        <Link to={`/event/guests/${id}`}>
        <button onClick={handleAdd}>Add guest only for this occasion</button>
        </Link>
        
        <button onClick={(e) => handleImport(e)}>
          send e-invitation to every guests
        </button>
      </div>

      <div className={styles.list}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">SI.No.</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">members</th>
              <th scope="col">del</th>
            </tr>
          </thead>
          <tbody>
            {data.guests?.map((d, ind) => (
              <tr key={ind}>
                <td>{ind + 1}</td>
                <td>{d.name}</td>
                <td>{d.address}</td>
                <td>{d.members}</td>
                <td
                  style={{ textAlign: "center", cursor: "pointer" }}
                  onClick={(e) => handleDelete(e, d._id)}
                >
                  <i className="fas fa-trash"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EventView;
