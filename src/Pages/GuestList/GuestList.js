import React, { useEffect, useState } from "react";
import { requestWithToken } from "../../utils/httpRequest";
import styles from "./guestList.module.css";
import Loader from "../../components/Loader";
function GuestList() {
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    address: "",
    members: 0,
  });

  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(window.localStorage.getItem("user"));
    console.log(user);
    form.user = user.user;
    setIsLoading(true);
    await requestWithToken("POST", "/guest", form);
    setIsLoading(false);
  };
  useEffect(() => {
    const guestList = async () => {
      const result = await requestWithToken("GET", "/guest");
      setGuests(result.data.data);
      setIsLoading(false);
    };
    guestList();
  }, []);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await requestWithToken("POST", "/guest/" + id);
  };
  return (
    <div className={styles.guests}>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        className={styles.addBtn}
      >
        + Add Guest
      </button>

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Configure Your Guest
              </h5>
            </div>
            <div class="modal-body">
              <div className={styles.form}>
                <form
                  className={styles.create}
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Name"
                      name="name"
                      onChange={(e) => handleInput(e)}
                      required
                    />
                    <label for="floatingInput">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Address"
                      name="address"
                      onChange={(e) => handleInput(e)}
                      required
                    />
                    <label for="floatingInput">Address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Number of members"
                      name="members"
                      onChange={(e) => handleInput(e)}
                      required
                    />
                    <label for="floatingInput">Number of members</label>
                  </div>
                </form>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={(e) => handleSubmit(e)}
              >
                {isLoading ? <Loader /> : "Add Guest"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.list}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className={styles.scol} scope="col">
                SI.No.
              </th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th className={styles.members} scope="col">
                members
              </th>
              <th className={styles.scol} scope="col">
                Delete
              </th>
              <th className={styles.scol} scope="col">
                update
              </th>
            </tr>
          </thead>
          <tbody>
            {guests?.map((d, ind) => (
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
                <td
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  style={{ textAlign: "center" }}
                >
                  <i className="fas fa-edit"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GuestList;
