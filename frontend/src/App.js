import "./output.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./routes/Login";
import SignupComponent from "./routes/Signup";
import HomeComponent from "./routes/Home";
import TradeList from "./routes/TradeList";
import CreateTradeForm from "./routes/CreateTradeForm";
import Logout from "./routes/Logout";
import Profile from "./routes/Profile";

function App() {
  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/dashboard" element={<HomeComponent />} />
          <Route path="/trades" element={<TradeList />} />
          <Route path="/market" element={<CreateTradeForm />} />
          <Route path="/" element={<LoginComponent />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
