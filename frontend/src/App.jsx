import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AuthSuccess from "./pages/AuthSuccess";
import Stocks from "./pages/Stocks";
import ForeignExchange from "./pages/ForeignExchange";
import PreciousMetals from "./pages/PreciousMetals";
import Crypto from "./pages/Crypto";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/auth/success" element={<AuthSuccess />} />

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/stocks" element={<ProtectedRoute><Stocks /></ProtectedRoute>} />
      <Route path="/foreign-exchange" element={<ProtectedRoute><ForeignExchange /></ProtectedRoute>} />
      <Route path="/precious-metals" element={<ProtectedRoute><PreciousMetals /></ProtectedRoute>} />
      <Route path="/crypto" element={<ProtectedRoute><Crypto /></ProtectedRoute>} />
    </Routes>
  );
}