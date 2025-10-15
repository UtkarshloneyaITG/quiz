import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Testpage from "./pages/Testpage";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import SignUp from "./Components/SignUpPage";
import AboutPage from "./pages/About";
import NotFound from "./Components/NotFound";
import AdminDasbord from "./pages/AdminDasbord";
import { AdminContextProvider } from "./provider/AdminProvider";
import PrivateRouter from "./Components/PrivateRouter";
import AddPeople from "./Components/addentitys";
import { MyContextProvider } from "./provider/MyAuthProvider";
import Navbar from "./Components/Navbar";
import LiveUser from "./Components/LiveUser";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import UserDetail from "./pages/UserDetail";
import TournamentPage from "./pages/TournamentPage";

const App = () => {
  return (
    <AdminContextProvider>
      <MyContextProvider>
        <Navbar />
        <LiveUser />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<AboutPage />} />

          {/*  Admin protected route */}
          <Route element={<PrivateRouter />}>
            <Route path="/admin/dasbord" element={<AdminDasbord />} />
            <Route path="/admin/dasbord/addentitys" element={<AddPeople />} />
            <Route
              path="/admin/dasbord/user-detail/:userId"
              element={<UserDetail />}
            />
          </Route>

          {/* Normal protected routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/tournament" element={<TournamentPage />} />
            <Route path="/test" element={<Testpage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Alert message={"Welcomes you"} color="#E9D502" onClose={() => {}} />
      </MyContextProvider>
    </AdminContextProvider>
  );
};

export default App;
