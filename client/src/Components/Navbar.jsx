import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAdminFunctions } from "../provider/AdminProvider";
import { useAlert } from "../servics/ApiChanger";
import { useMyFunctions } from "../provider/MyAuthProvider";
import  LanguageSwitcher  from "./LanguageSwitcher"

const Navbar = () => {
  const {showAlert} = useAlert();
  const navigate = useNavigate();
  const { isAuth, setIsAuth, userName, setUserNameFristLater } =
    useMyFunctions();
  const { role } = useAdminFunctions();
  const handleLogOut = async () => {
    try {
      const res = await axios.post(
        "https://test-app-backend-xi.vercel.app/api/auth/user/logout"
      );
      const data = res.data;
      console.log(data);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      const token = localStorage.getItem("token");
      if (!token) {
                  showAlert("LogOut SuccessFully","#CE2029");
        setIsAuth(token);
       setTimeout(()=>{ navigate("/login");},1e3);
      }
    } catch (e) {
      console.log("logout erro", e);
    }
  };

  return (
    <div className="header-wrapper w-full ">
      <div className="page-width">
        <div className="header-grid flex justify-between">
          <div className="header-logo">
            <Link to="/" className="logo cursor-pointer flex gap-2">
              <div className="image rounded-4xl">
                <img
                  className="rounded-4xl w-21 h-full"
                  src="/images/logo.png"
                />
              </div>
              <h1 className="text-white text-4xl font-bold font-stretch-50% self-center">
                QuizGecko
              </h1>
            </Link>
          </div>
          <div className="header-navs flex gap-10">
            <nav className=" flex gap-10 text-[18px] font-bold uppercase  self-center text-white ">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "navs-link-active navs" : "navs-link navs"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "navs-link-active navs" : "navs-link navs"
                }
              >
                About
              </NavLink>
              {role === "admin" && isAuth && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "navs-link-active navs" : "navs-link navs"
                  }
                  to="/admin/dasbord"
                >
                  Admin
                </NavLink>
              )}

              <LanguageSwitcher />
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
              <Link
                to={
                  isAuth
                    ? role == "admin"
                      ? "/admin/dasbord"
                      : "/dashboard"
                    : "/login"
                }
                className="user-box uppercase font-bold text-2xl border-1 cursor-pointer bg-purple-400 text-white"
              >
                {userName[0]}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
