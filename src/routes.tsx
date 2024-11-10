import { Routes, Route } from "react-router-dom";
import Layout from "./Layouts";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import loadable from "@loadable/component";
const Home = loadable(
  () => import(/* webpackChunkName: "home-chunk" */ "./pages/Home"),
  { ssr: true }
);

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* Using path="*"" means "match anything", so this route
              acts like a catch-all for URLs that we don't have explicit
              routes for. */}
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Route>
    </Routes>
  );
};

export default RoutesApp;
