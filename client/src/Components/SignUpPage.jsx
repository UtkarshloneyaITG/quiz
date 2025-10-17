import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { singup } from "../servics/api";
import { useAlert } from "../servics/ApiChanger";
import { useMyFunctions } from "../provider/MyAuthProvider";
import { useAdminFunctions } from "../provider/AdminProvider";

export default function SignUp(props) {
  const { showAlert } = useAlert();
  const { userType } = useAdminFunctions();
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    userClass: "class",
    role: userType || "user"
  });
  console.log(data.role)
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    userClass: "",
  });

  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useMyFunctions();

  useEffect(() => {
    const token = localStorage.getItem("token") || null;
     if (token) {
      navigate("/");
      showAlert("HomePage", "#006400");
    }

  }, []);

  const presentUser = localStorage.getItem("user")
  console.log(presentUser.role);

  
  //  Validations
  
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

  function validPhone(phone) {
    // 10 digit number check
    return /^[0-9]{10}$/.test(phone.trim());
  }
  
  //  Handle input changes
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  
  const handleClass = (e) => {
    setData((pre) => ({
      ...pre,
      userClass: e.target.value,
    }));
  };
  
  //  Submit validation
  const submitHandle = async (e) => {
    e.preventDefault();
    const newErrors = {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      userClass: "",
    };
    
    if (!data.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }
    if (!validEmail(data.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!validPhone(data.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid 10-digit phone number.";
    }
    if (!validPassword(data.password)) {
      newErrors.password =
      "Password must be at least 6 chars, include uppercase, lowercase & number.";
    }
    if (data.userClass === "class") {
      newErrors.userClass = "Please select a class.";
    }
    
    setErrors(newErrors);
    console.log(props.mode);
    
    // Proceed only if no errors
    const isValid = Object.values(newErrors).every((v) => v === "");
    if (isValid) {
      if (props.mode !== "admin") {
        showAlert("user SignUP SuccessFull", "#006400");
        const userData = await singup(data);
        console.log(userData.userData);
        localStorage.setItem("token", userData.userData.token);
        localStorage.setItem("user", JSON.stringify(userData.userData));
        const token = localStorage.getItem("token");
        const role = userData.userData.role;
        if (token !== "") {
          setIsAuth(token);
          if (role == "admin") {
            // if (presentUser.role == "user" ){
            //   navigate('/');
            // }
            showAlert("SignUp Successfull as Admin", "#006400");
            return navigate("/admin/dasbord");
          }
          showAlert("SignUP Successfull", "#006400");
        }
      } else {
        const userData = await singup(data);
        console.log(userData.userData);
        navigate("/admin/dasbord");
        showAlert(userType + " Added Success", "#006400");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[900px] bg-gradient-to-r from-purple-600 to-indigo-600 px-4">
      <form
        onSubmit={submitHandle}
        className="form flex flex-col gap-6 text-white shadow-lg rounded-2xl max-w-md w-full px-10 py-8 bg-black/40 backdrop-blur-md"
      >
        <h1 className="text-4xl font-bold mb-4">{userType ? "Add " + userType : "Sign-up"}</h1>
        {/* Full Name */}
        <div className="flex flex-col">
          <label htmlFor="fullName" className="font-bold">
            Please Enter User Name
          </label>
          <input
            type="text"
            required
            name="fullName"
            value={data.fullName}
            onChange={handleChanges}
            id="fullName"
            placeholder="Name Here"
            className={`border-b text-lg outline-none px-2 py-1 rounded-md ${errors.fullName ? "border-red-500 bg-red-100 text-red-900" : ""
              }`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="font-bold">
            Please Enter E-mail Address
          </label>
          <input
            type="email"
            required
            name="email"
            value={data.email}
            onChange={handleChanges}
            id="email"
            placeholder="E-mail Address"
            className={`border-b text-lg outline-none px-2 py-1 rounded-md ${errors.email ? "border-red-500 bg-red-100 text-red-900" : ""
              }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label htmlFor="phoneNumber" className="font-bold">
            Please Enter Phone Number
          </label>
          <input
            type="number"
            required
            name="phoneNumber"
            value={data.phoneNumber}
            onChange={handleChanges}
            id="phoneNumber"
            placeholder="10-digit phone"
            className={`border-b text-lg outline-none px-2 py-1 rounded-md ${errors.phoneNumber ? "border-red-500 bg-red-100 text-red-900" : ""
              }`}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password" className="font-bold">
            Please Enter Password
          </label>
          <input
            type="password"
            required
            name="password"
            value={data.password}
            onChange={handleChanges}
            id="password"
            placeholder="Password Here"
            className={`border-b text-lg outline-none px-2 py-1 rounded-md ${errors.password ? "border-red-500 bg-red-100 text-red-900" : ""
              }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Class Selection */}
        <div className="flex flex-col">
          <label htmlFor="userClass" className="font-bold">
            Please Select Class
          </label>
          <select
            name="userClass"
            value={data.userClass}
            onChange={handleClass}
            id="userClass"
            required
            className={`border-b text-lg outline-none w-full px-2 py-1 rounded-md ${errors.userClass ? "border-red-500 bg-red-100 text-red-900" : ""
              }`}
          >
            <option className="text-black" value="class">
              Select Class
            </option>
            {[...Array(12)].map((_, i) => (
              <option className={`text-black`} key={i + 1} value={i + 1}>
                Class-{i + 1}
              </option>
            ))}
          </select>
          {errors.userClass && (
            <p className="text-red-500 text-sm mt-1">{errors.userClass}</p>
          )}
        </div>

        <button
          type="submit"
          onClick={submitHandle}
          className="loginbtn bg-purple-950 text-white px-6 py-3 rounded-lg font-semibold transition-transform duration-300 ease-in-out hover:bg-purple-800 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500"
        >
          {userType ? "Add " + userType : "Sign-In"}
        </button>
        {props.mode ? "" : (
          <Link to="/login">
            Already have an <span className="text-red-500 font-bold">Login</span>
          </Link>
        )}
      </form>
    </div>
  );
}
