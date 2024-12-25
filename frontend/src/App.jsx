import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/homepage/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
// import UsersList from "./components/UsersList";

const App = () => {
  const someuserId = 3;

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      {/* <UsersList userId={someuserId} /> */}
      <Signup />
      {/* <Router>
        <Routes>
          <Signup />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router> */}
    </div>
  );
};

export default App;
