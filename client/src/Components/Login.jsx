import React, { useEffect } from "react";
import { useState } from "react";
import { login } from "../servics/api";
import { Link, useNavigate } from "react-router-dom";
import { useMyFunctions } from "./AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const { isAuth, setIsAuth } = useMyFunctions();

  useEffect(() => {
    const token = localStorage.getItem("token") || null;

    if (token) {
      navigate("/");
    }
  });

  function validEmail(email) {
    const re =
      /^[a-zA-Z][\w.-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    return re.test(email.trim());
  }

  function validPassword(password) {
    const value = password.trim();
    if (value.length < 6) return false;
    const hasLower = /[a-z]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    return hasLower && hasUpper && hasNumber;
  }

  async function onSubmitForm(e) {
    e.preventDefault();
    const newErrors = { email: "", password: "" };

    if (!validEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!validPassword(password)) {
      newErrors.password =
        "Password must be at least 6 characters and include uppercase, lowercase, and a number.";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      const data = await login(email, password);
      if (data) {
        localStorage.setItem("token", data.userData.token);
        localStorage.setItem("user", JSON.stringify(data.userData));
        const token = localStorage.getItem("token");
        if (token) {
          setIsAuth(token);
          console.log("home");
          navigate("/");
        }
      }
    }
  }

  return (
    <div className="loginpage flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 px-4">
      <form
        onSubmit={onSubmitForm}
        noValidate
        className="form flex flex-col gap-6 text-white shadow-lg rounded-2xl max-w-md w-full px-10 py-8  bg-black/40 backdrop-blur-md"
      >
        <h1 className="text-5xl font-bold text-center mb-6">Login</h1>

        <div className="flex flex-col">
          <input
            className={`border-b-2 px-3 py-2 rounded-md outline-none w-full transition-colors ${
              errors.email
                ? "border-red-500 bg-red-100 text-red-900"
                : "border-white focus:bg-white focus:text-black"
            }`}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="email-error"
            aria-invalid={errors.email ? "true" : "false"}
            required
          />
          {errors.email && (
            <p
              id="email-error"
              className="text-red-500 mt-1 text-sm font-semibold"
              role="alert"
            >
              {errors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <input
            className={`border-b-2 px-3 py-2 rounded-md outline-none w-full transition-colors ${
              errors.password
                ? "border-red-500 bg-red-100 text-red-900"
                : "border-white focus:bg-white focus:text-black"
            }`}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby="password-error"
            aria-invalid={errors.password ? "true" : "false"}
            required
          />
          {errors.password && (
            <p
              id="password-error"
              className="text-red-500 mt-1 text-sm font-semibold"
              role="alert"
            >
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="loginbtn bg-purple-950 text-white px-6 py-3 rounded-lg font-semibold transition-transform duration-300 ease-in-out hover:bg-purple-800 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500"
        >
          Log In
        </button>

        <Link to="/sigup">
          Your hane don't ac Please{" "}
          <span className="text-red-500 capitalize font-bold">Signup</span>{" "}
        </Link>
      </form>
    </div>
  );
}

export default Login;
