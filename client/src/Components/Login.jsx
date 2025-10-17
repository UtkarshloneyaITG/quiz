import React, { useEffect, useState } from "react";
import { login } from "../servics/api";
import { Link, useNavigate } from "react-router-dom";
import { useAdminFunctions } from "../provider/AdminProvider";
import { useAlert } from "../servics/ApiChanger";
import { useMyFunctions } from "../provider/MyAuthProvider";



function Login() {
const {showAlert}= useAlert();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const { setUser, setRole } = useAdminFunctions();
  const { isAuth, setIsAuth } = useMyFunctions();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
      showAlert("HomePage","#006400");
    }
  }, [navigate]);

  function validEmail(email){
    const re =
      /^[a-zA-Z][\w.-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    return re.test(email.trim());
  }

  function validPassword(password){
    const value = password.trim();
    if (value.length < 6) return false;
    const hasLower = /[a-z]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    return hasLower && hasUpper && hasNumber;
  }

  // Submit handler
  async function onSubmitForm(e) {
    e.preventDefault();

    const newErrors = { email: "", password: "" };
    if (!validEmail(email)) newErrors.email = "Please enter a valid email.";
    if (!validPassword(password))
      newErrors.password =
        "Password must be at least 6 chars and include upper, lower & number.";
    setErrors(newErrors);

    if (newErrors.email || newErrors.password) return;

    try {
      const data = await login(email, password);   // 👈 This calls your backend
      showAlert('Admin Login Successfull',"#006400");

      if (data && data.userData) {
        showAlert("Login Succssfull","#006400");
        const { token, role } = data.userData;
        //  Save to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(data.userData));
        //  Update context
        setIsAuth(token);
        setUser(data.userData);
        setRole(role);
        showAlert("Admin Login Successfull ","#006400");

        //  Redirect based on role
        if (role === "admin") {
          navigate("/admin/dasbord");
         showAlert("Admin Login Succssfull","#006400");
        } else {
          navigate("/dashboard");
          showAlert("user login Successfull","#006400");
          // <Alert message={' User Login Successfull'} color="#006400" onClose={() => {}} />
        }
      } else {
        showAlert("Invalid Login Response","#CE2029");
        // <Alert message={'Invalid Login Response'} color="#CE2029" onClose={() => {}} />
      }
    } catch (err) {
      console.error(err);
      showAlert("Login failed. Please check credentials.","#CE2029");
      // <Alert message={"Login failed. Please check credentials."} color="#CE2029" onClose={() => {}} />;
    }
  }

  return (
    <div className="loginpage flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 px-4">
      <form
        onSubmit={onSubmitForm}
        noValidate
        className="form flex flex-col gap-6 text-white shadow-lg rounded-2xl max-w-md w-full px-10 py-8 bg-black/40 backdrop-blur-md"
      >
        <h1 className="text-5xl font-bold text-center mb-6">Login</h1>

        {/* Email */}
        <div className="flex flex-col">
          <input
            className={`border-b-2 px-3 py-2 rounded-md outline-none w-full transition-colors ${errors.email
                ? "border-red-500 bg-red-100 text-red-900"
                : "border-white focus:bg-white focus:text-black"
              }`}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && (
            <p className="text-red-500 mt-1 text-sm font-semibold">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <input
            className={`border-b-2 px-3 py-2 rounded-md outline-none w-full transition-colors ${errors.password
                ? "border-red-500 bg-red-100 text-red-900"
                : "border-white focus:bg-white focus:text-black"
              }`}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && (
            <p className="text-red-500 mt-1 text-sm font-semibold">
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

        <Link to="/signup/dummydata/dummydata" className="text-center">
          Don't have an account?{" "}
          <span className="text-red-500 capitalize font-bold">Signup</span>
        </Link>
      </form>
    </div>
  );
}

export default Login;
