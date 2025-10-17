import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import LiveUser from "./Components/LiveUser";
import Login from "./Components/Login";
import SignUp from "./Components/SignUpPage";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import PrivateRouter from "./Components/PrivateRouter";
import { AdminContextProvider } from "./provider/AdminProvider";
import { MyContextProvider } from "./provider/MyAuthProvider";
import LazyLoad from "./Components/LazyLoad";

// Lazy-loaded pages
import {
  Home,
  AboutPage,
  NotFound,
  Dashboard,
  Testpage,
  AdminDasbord,
  UserDetail,
  TournamentPage,
  Leaderboard,
  TournamentQuestionsPage,
} from "./pages";

const App = () => {
  return (
    <AdminContextProvider>
      <MyContextProvider>
        <Navbar />
        <LiveUser />
        <Routes>
          <Route
            index
            element={
              <LazyLoad>
                <Home />
              </LazyLoad>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/:page/:userId" element={<SignUp />} />
          <Route
            path="/about"
            element={
              <LazyLoad>
                <AboutPage />
              </LazyLoad>
            }
          />

          {/* Admin protected routes */}
          <Route element={<PrivateRouter />}>
            <Route
              path="/admin/dasbord"
              element={
                <LazyLoad>
                  <AdminDasbord />
                </LazyLoad>
              }
            />
            {/* <Route
              path="/admin/dasbord/addentitys"
              element={
                <LazyLoad>
                  <SignUp mode="admin"/>
                </LazyLoad>
              }
            /> */}
            <Route
              path="/admin/dasbord/user-detail/:userId"
              element={
                <LazyLoad>
                  <UserDetail />
                </LazyLoad>
              }
            />
          </Route>

          {/* Normal protected routes */}
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/tournament"
              element={
                <LazyLoad>
                  <TournamentPage />
                </LazyLoad>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <LazyLoad>
                  <Leaderboard />
                </LazyLoad>
              }
            />
            <Route
              path="/test"
              element={
                <LazyLoad>
                  <Testpage />
                </LazyLoad>
              }
            />
            <Route
              path="/dashboard"
              element={
                <LazyLoad>
                  <Dashboard />
                </LazyLoad>
              }
            />
            <Route
              path="/user/tournament/:title/:tType"
              element={
                <LazyLoad>
                  <TournamentQuestionsPage />
                </LazyLoad>
              }
            />
          </Route>

          {/* 404 */}
          <Route
            path="*"
            element={
              <LazyLoad>
                <NotFound />
              </LazyLoad>
            }
          />
        </Routes>
      </MyContextProvider>
    </AdminContextProvider>
  );
};

export default App;
