import * as React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import {
  Home,
  Dashboard,
  MembersPage,
  ProfilePage,
  CreatePost,
  OnePost,
} from "./Pages/index";

import { initialAuth, AuthReducer } from "./Utils/Auth";
export const AuthContext = React.createContext();

function App() {
  const [AuthState, dispatchAuthState] = React.useReducer(
    AuthReducer,
    initialAuth
  );

  let routes;

  if (AuthState.isAuthenticated) {
    routes = (
      <Routes>
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/profile" exact element={<ProfilePage />} />
        <Route path="/members" exact element={<MembersPage />} />
        <Route path="/posts" exact element={<CreatePost />} />
        <Route path="/posts/:id" exact element={<OnePost />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        AuthState,
        dispatchAuthState,
      }}
    >
      {routes}{" "}
    </AuthContext.Provider>
  );
}

export default App;
