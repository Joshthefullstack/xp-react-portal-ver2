import React from "react";
import style from "../../styles/Sidebar.module.css";
import { Link } from "react-router-dom";
import { FaCog, FaGrinWink } from "react-icons/fa";
import { FaTachometerAlt } from "react-icons/fa";
import Accordion from "react-bootstrap/Accordion";

function Sidebar() {
  return (
    <div className={style.container}>
      <a className={style.sidebar_link} href="index.html">
        <div className={style.sidebar_icon}>
          <FaGrinWink />
        </div>
        <div className={style.sidebar_text}>
          XP Portal <sup>TM</sup>
        </div>
      </a>
      <div className={style.academicLinks}>
        <li className={style.academic_links}>
          <a href="index.html">
            <FaTachometerAlt />
            <span className={style.span}>Dashboard</span>
          </a>
        </li>
        <hr></hr>
        <p className={style.academic_para}>ACADEMICS</p>
        <Accordion className={style.accordion}>
          <Accordion.Item eventKey="0" className={style.accordion}>
            <Accordion.Header><FaCog className={style.facog}/>Setup</Accordion.Header>
            <Accordion.Body className={style.accordion_body}>
                <Link to="/" className={style.accordion_link}>Faculty</Link>
                <Link to="/department" className={style.accordion_link}>Department</Link>
                <Link to="/courseOfStudy" className={style.accordion_link}>Course Of Study</Link>
                <Link to="/course" className={style.accordion_link}>Course</Link>
                <Link to="/lecturer" className={style.accordion_link}>Lecturer</Link>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

      </div>
    </div>
  );
}

export default Sidebar;
