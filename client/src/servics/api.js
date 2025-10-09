import axios from "axios";

export const singup = async (obj) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/user/register",
      obj
    );

    const data = await res.data;
    return data;
  } catch (error) {
    alert("singup faild");
    console.log("axiox error singup", error);
  }
};

export const login = async (email, password) => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/user/login", {
      email: email,
      password: password,
    });

    const data = res.data;
    return data;
  } catch (error) {
     alert("login faild");
     console.log("axiox error login", error);
  }
};

export const dashboard = async (email) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/user/dashboard",
      {
        email: email,
      }
    );
    const data = res.data;
    return data;
  } catch (error) {
     alert("axiox error dashboard");
     console.log("axiox error dashboard", error.response.data);
  }
};
