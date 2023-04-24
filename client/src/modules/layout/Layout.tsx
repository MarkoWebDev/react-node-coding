import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import Encoder from "../Encode/Encoder";
import { UserContext } from "../../shared/UserContext/AuthContext";

const Layout = () => {
  const navigate = useNavigate();
  const {
    state: { user },
  } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      navigate("/encoder");
    }
  }, []);

  return (
    <div className="bg-[#f8fafc]">
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route
          path="/encoder"
          element={user ? <Encoder></Encoder> : <Login></Login>}
        ></Route>
      </Routes>
    </div>
  );
};

export default Layout;
