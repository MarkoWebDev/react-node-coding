import React from "react";
import "./App.css";
import Layout from "./modules/layout/Layout";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./shared/UserContext/AuthContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext>
          <Layout></Layout>
        </AuthContext>
      </BrowserRouter>
    </div>
  );
}

export default App;
