import { lazy } from "react";

export const Home = lazy(() => import("./Home"));
export const AboutPage = lazy(() => import("./About"));
export const NotFound = lazy(() => import("../Components/NotFound"));
export const Dashboard = lazy(() => import("./Dashboard"));
export const Testpage = lazy(() => import("./Testpage"));
export const AdminDasbord = lazy(() => import("./AdminDasbord"));
// export const AddPeople = lazy(() => import("../Components/addentitys"));
export const UserDetail = lazy(() => import("./UserDetail"));
export const TournamentPage = lazy(() => import("./TournamentPage"));
export const Leaderboard = lazy(() => import("./Leaderboard"));
export const TournamentQuestionsPage = lazy(() =>
  import("../Components/TournamentQuestionsPage")
);
