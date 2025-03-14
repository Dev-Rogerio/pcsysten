import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Measure from "./components/pages/measure/Measure.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Measure />} />
      </Routes>
    </Router>
  );
}

export default App;
