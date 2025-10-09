import Header from "./components/Header";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Testpage from "./pages/Testpage";
import Login from "./components/Login";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import SignUp from "./Components/SignUp";
import { MyContextProvider } from "./components/AuthContext";
import AboutPage from "./pages/About";
import NotFound from "./Components/NotFound";

const App = () => {
  return (
    <MyContextProvider>
      <div>
        <Header />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/sigup" element={<SignUp />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/test" element={<Testpage />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </MyContextProvider>
  );
};

export default App;
