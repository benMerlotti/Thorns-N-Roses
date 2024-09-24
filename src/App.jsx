import { Authorized } from "./components/views/Authorized";  // Adjust import path as needed
import { Login } from "./components/auth/Login";  // Adjust import path as needed
import { Register } from "./components/auth/Register";  // Adjust import path as needed
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {ApplicationViews} from "./components/views/ApplicationViews"

export const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Routes>
      {/* Route for login */}
      <Route
        path="/login"
        element={<Login setCurrentUser={setCurrentUser} currentUser={currentUser} />}
      />
      
      {/* Route for register */}
      <Route path="/register" element={<Register />} />
      
      {/* Catch-all route for the main app */}
      <Route
        path="*"
        element={
          <Authorized>
            <ApplicationViews setCurrentUser={setCurrentUser} currentUser={currentUser} />
          </Authorized>
        }
      />
    </Routes>
  );
};
export default App;