// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Diabetes from "./pages/Diabetes";
import Insurance from "./pages/Insurance";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diabetes" element={<Diabetes />} />
        <Route path="/insurance" element={<Insurance />} />
      </Routes>
    </Router>
  );
}

export default App;




