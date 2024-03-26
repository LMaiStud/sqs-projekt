import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import DetailView from "./pages/DetailView";
import Dashboard from "./pages/Dashboard";
import { RequireAuth } from "./auth/RequireAuth";
import CreateAuction from "./pages/CreateAuction";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import MyAuction from "./pages/MyAuction";
import MyBids from "./pages/MyBids";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div id="app-main-div">
        <div id="app-content-div">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/DetailView" element={<DetailView />} />
            <Route
              path="/Dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/CreateAuction"
              element={
                <RequireAuth>
                  <CreateAuction />
                </RequireAuth>
              }
            />
            <Route
              path="/MyAuction"
              element={
                <RequireAuth>
                  <MyAuction />
                </RequireAuth>
              }
            />
            <Route
              path="/MyBids"
              element={
                <RequireAuth>
                  <MyBids />
                </RequireAuth>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
