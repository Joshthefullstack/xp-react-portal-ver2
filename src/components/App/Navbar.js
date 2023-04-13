import React from 'react';
import style from "../../styles/Navbar.module.css";
import { FaSearch } from "react-icons/fa";

function Navbar() {
  return (
    <div className={style.container}>
        <p>Welcome Admin</p>
        <div>
            <input type='text' placeholder='Search...'/>
            <button type='submit'><FaSearch/></button>
        </div>
    </div>
  )
}

export default Navbar