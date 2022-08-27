import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { requestWithToken } from "../../utils/httpRequest";
import styles from "./guestselect.module.css";
const option = ["invited", "uninvited", "all"];

function GuestSelect() {
  const id = useLocation().pathname.split("/")[2];
  const [status, setStatus] = useState("invited");
  const [guest, setGuest] = useState([]);
  useEffect(() => {
    const guestList = async () => {
      const result = await requestWithToken("GET", "/guest");
      const again = await requestWithToken("GET", "/event/guest", id);
      setGuest(result.data.data);
    };
    guestList();
  }, []);


  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <h1 style={{ fontSize: "1.8em" }}>Invite your loved ones</h1>
        <div className={styles.tablectrl}>
          {option.map((data, ind) => (
            <p
              style={
                data == status
                  ? { borderBottom: " 3px solid rgb(46, 106, 121)" }
                  : {}
              }
              onClick={() => setStatus(data)}
            >
              {data}
            </p>
          ))}
        </div>
      </div>
      <div className={styles.bottom}>
        <div>
          <p className={styles.warning}>
            please save if you make any change !!
          </p>
          <div className={styles.btn}>
            <button>select all</button>
            <button>save</button>
          </div>
        </div>
      </div>

      <div className={styles.lists}>
        <table class="table">
          <thead>
            <tr>
              <th scope="col" style={{ width: "10px" }}>
                select
              </th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col" style={{ width: "120px" }}>
                Members
              </th>
            </tr>
          </thead>
          <tbody>
            {
              guest.map((data,key)=>(
                <tr key={key}>
                <th scope="row">
                  <input
                    type="checkbox"
                    style={{ height: "20px", width: "20px" }}
                  />
                </th>
                <td>{data.name}</td>
                <td>{data.address}</td>
                <td>{data.members}</td>
              </tr>
              ))
            }

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GuestSelect;
