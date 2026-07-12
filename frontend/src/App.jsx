import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Stocks from "./pages/Stocks";
import ForeignExchange from "./pages/ForeignExchange";
import PreciousMetals from "./pages/PreciousMetals";
import Crypto from "./pages/Crypto";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/home" element={<Home />} />
      <Route path="/stocks" element={<Stocks />} />
      <Route path="/foreign-exchange" element={<ForeignExchange />} />
      <Route path="/precious-metals" element={<PreciousMetals />} />
      <Route path="/crypto" element={<Crypto />} />
    </Routes>
  );
}