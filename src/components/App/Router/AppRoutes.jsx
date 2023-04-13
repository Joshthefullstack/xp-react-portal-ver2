import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FacultyGrid from '../FacultyGrid';

function AppRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<FacultyGrid/>} />
        </Routes>
    </div>
  )
}

export default AppRoutes