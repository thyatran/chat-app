import React from "react";
import Home from "./pages/homepage/Home";
import Signup from "./pages/signup/Signup";
// import UsersList from './components/UsersList';

const App = () => {
  // const someuserId = 3;

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      {/* <UsersList userId={someuserId} /> */}
      <Signup />
    </div>
  );
};

export default App;
