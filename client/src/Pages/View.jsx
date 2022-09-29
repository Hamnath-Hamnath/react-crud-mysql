import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useParams,NavLink } from 'react-router-dom'

const View = () => {
    const [user,setUser] = useState({})
    const {id} = useParams();

    useEffect(()=>{
        axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((res) => setUser({...res.data[0]}));
    },[id])
  return (
    <section>
        <h2>View {user.id}</h2>
        <br/>
        <p>{user.name}</p>
        <br/>
        <p>{ user.email}</p>
        <br/>
        <p>{user.contact}</p>
        <NavLink to='/'>GoBack</NavLink>
    </section>
  )
}

export default View
