import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Faculty from "../Pages/Faculty";
import Department from "../Pages/Department"

function AppRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Faculty/>} />
            <Route path='/department' element={<Department/>} />
        </Routes>
    </div>
  )
}

export default AppRoutes