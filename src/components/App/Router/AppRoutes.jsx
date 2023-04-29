import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Faculty from "../Pages/Faculty";
import Department from "../Pages/Department"
import CourseOfStudy from "../Pages/CourseOfStudy";
import Course from "../Pages/Course";
import Lecturer from "../Pages/Lecturer";


function AppRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Faculty/>} />
            <Route path='/department' element={<Department/>} />
            <Route path='/courseOfStudy' element={<CourseOfStudy/>} />
           <Route path='/course' element={<Course/>} /> 
           <Route path='/lecturer' element={<Lecturer/>}/>
        </Routes>
    </div>
  )
}

export default AppRoutes