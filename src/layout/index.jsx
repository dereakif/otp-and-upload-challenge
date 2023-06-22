import { Outlet } from "react-router-dom";
import NavBar from "../components/nav-bar";

const Layout = () => {
  return (
    <>
      <NavBar isJustified />
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default Layout;
