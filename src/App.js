import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/App/Router/AppRoutes";
import Sidebar from './components/App/Sidebar';
import Navbar from './components/App/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Sidebar/>
        <div>
          <Navbar/>
          <AppRoutes/>
        </div>
      </div>
  </BrowserRouter>
  );
}

export default App;
