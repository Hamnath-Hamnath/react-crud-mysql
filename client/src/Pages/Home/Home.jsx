import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Home.module.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // loadData();
    (async () => {
      const { data } = await axios.get("http://localhost:5000/api/get");
      setData(data);
    })();
  }, [data]);

  const deleteContact = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      console.log(id);
      axios.post(`http://localhost:5000/api/remove/${id}`);
      toast.success("deleted Successfully !!!");
    }
  };

  return (
    <section className={styles.home}>
      <NavLink to="/addContact">
        <button className="btn btn_contact">Add Contact</button>
      </NavLink>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td scope="row">{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.contact}</td>
              <td>
                <NavLink to={`/update/${item.id}`}>
                  <button className={`${styles.btn} ${styles.btn_update}`}>
                    Edit
                  </button>
                </NavLink>
                {/* <NavLink to={`/delete/${item.id}`}> */}
                <button
                  onClick={() => deleteContact(item.id)}
                  className={`${styles.btn} ${styles.btn_delete}`}
                >
                  Delete
                </button>
                {/* </NavLink> */}
                <NavLink to={`/view/${item.id}`}>
                  <button className={`${styles.btn} ${styles.btn_view}`}>
                    view
                  </button>
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Home;
