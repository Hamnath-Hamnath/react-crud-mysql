import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddEdit = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((res) => setForm({...res.data[0]}));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, contact } = form;
    if (!name || !email || !contact) {
      toast.error("Please provide the fields");
    } else {
        if(!id){
            axios
        .post("http://localhost:5000/api/post", {
          name,
          email,
          contact,
        })
        .then(() => {
          setForm({
            name: "",
            email: "",
            contact: "",
          });
        })
        .catch((err) => console.err(err));
      toast.success("Success");
        }else{
            axios
        .put(`http://localhost:5000/api/update/${id}`, {
          name,
          email,
          contact,
        })
        .then(() => {
          setForm({
            name: "",
            email: "",
            contact: "",
          });
        })
        .catch((err) => console.err(err));
      toast.success("Updated");
        }
      
      setTimeout(() => navigate("/"), 500);
    }
  };

  return (
    <div
      style={{
        marginTop: "100px",
      }}
    >
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit}
      >
        <label>Name</label>
        <input
          type={"text"}
          value={form.name || ""}
          id="name"
          name="name"
          placeholder="Name..."
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          type={"email"}
          value={form.email || ""}
          id="email"
          name="email"
          placeholder="Email..."
          onChange={handleChange}
        />
        <label>Contact</label>
        <input
          type={"text"}
          value={form.contact || ""}
          id="contact"
          name="contact"
          placeholder="Contact..."
          onChange={handleChange}
        />
        <input type="submit" value={id ? 'Update' : 'Save'} />
        <NavLink to="/">
          <input type="button" value="Go Back" />
        </NavLink>
      </form>
    </div>
  );
};

export default AddEdit;
