import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Analytics from "./components/Analytics/Analytics";

export default function App() {
  return (
    <div className="main-container">
      <nav>
        <Link to="/">Home</Link> | <Link to="/analytics">Analytics</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </div>
  );
}
