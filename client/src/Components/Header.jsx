import axios from "axios";

import { Link, NavLink, useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { useMyFunctions } from "./AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useMyFunctions();
  const [userNameFristLater, setUserNameFristLater] = useState("u");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || false;
    if (user) {
      const fristLater = user.fullName[0];
      setUserNameFristLater(fristLater);
    } else {
      setUserNameFristLater("U");
    }
  }, [isAuth]);

  const handleLogOut = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/user/logout"
      );
      const data = res.data;
      console.log(data);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        setIsAuth(token);
        navigate("/login");
      }
    } catch (e) {
      console.log("logout erro", e);
    }
  };

  console.log("isAuth", isAuth);

  return (
    <div className="header-wrapper fixed w-full ">
      <div className="page-width">
        <div className="header-grid flex justify-between">
          <div className="header-logo">
            <div className="logo cursor-pointer flex gap-2">
              <div className="image rounded-4xl">
                <img
                  className="rounded-4xl w-21 h-full"
                  src="./public/images/logo.png"
                />
              </div>
              <h1 className="text-white text-4xl font-bold font-stretch-50% self-center">
                QuizGecko
              </h1>
            </div>
          </div>
          <div className="header-navs flex gap-10">
            <nav className="navs flex gap-10 text-[18px] font-bold uppercase  self-center text-white ">
              <NavLink className={"navs-link"} to="/">
                Home
              </NavLink>
              <NavLink className={"navs-link"} to="/about">
                About
              </NavLink>
              {/* <NavLink className={"navs-link"} to="/history">
                History
              </NavLink> */}
            </nav>
            <div className="login-btn self-center">
              {isAuth ? (
                <button
                  onClick={handleLogOut}
                  className="login border-1 rounded-3xl text-[20px] hover:border-purple-500 hover:text-purple-500  cursor-pointer  bg-purple-400 text-white"
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className="login border-1 rounded-3xl text-[20px] hover:border-purple-500 hover:text-purple-500  cursor-pointer  bg-purple-400 text-white"
                >
                  Login
                </NavLink>
              )}
            </div>
            <div className="profile">
              <div className="user-box uppercase font-bold text-2xl border-1 cursor-pointer bg-purple-400 text-white">
                {userNameFristLater}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
