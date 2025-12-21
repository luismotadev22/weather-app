import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="main-header">
      <nav className="nav-container">
        <NavLink to="/" className="brand-area">
          <span className="brand-logo">🌤️</span>
          <span className="brand-text">WeatherApp</span>
        </NavLink>

        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Início
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sobre"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Sobre
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contactos"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Contactos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/definicoes"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Definições
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;