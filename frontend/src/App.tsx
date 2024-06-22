import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div id="app-main-div">
        <div id="app-content-div">
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
