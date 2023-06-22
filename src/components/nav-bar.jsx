import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";

const routes = [
  {
    path: "/",
    name: "OTP",
  },
  {
    path: "/upload",
    name: "Upload",
  },
];

const NavBar = ({ isVertical = false, isJustified = false }) => {
  const { pathname } = useLocation();

  return (
    <Nav justified={isJustified} pills vertical={isVertical}>
      {routes.map((route) => (
        <NavItem key={route.name}>
          <NavLink active={pathname === route.path} href={route.path}>
            {route.name}
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
};

NavBar.propTypes = {
  isVertical: PropTypes.bool,
  isJustified: PropTypes.bool,
};

export default NavBar;
