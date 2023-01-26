import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import JobsiteList from "./pages/JobsiteList";
import Jobsite from "./pages/Jobsite";
import Create from "./pages/Create";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JobsiteList />}></Route>
        <Route path="/jobsite" element={<Jobsite />}></Route>
        <Route path="/create" element={<Create />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
