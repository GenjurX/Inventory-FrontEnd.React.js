import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import JobsiteList from "./pages/JobsiteList";
import Jobsite from "./pages/Jobsite";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JobsiteList />}></Route>
        <Route path="/jobsite" element={<Jobsite />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
