import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTE_HOME, ROUTE_ABOUT } from "constants/routes";

function Header() {
  return (
    <div className="app-header">
      <ul className="app-header__list">
        <li>
          <NavLink exact activeClassName="active" to={ROUTE_HOME}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="active" to={ROUTE_ABOUT}>
            About
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Header;
