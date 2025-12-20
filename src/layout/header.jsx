import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="main-header">
      <nav className="nav-container">
        {/* Usamos uma div para o Logo para facilitar o alinhamento */}
        <NavLink to="/" className="brand-area">
          <span className="brand-logo">🌤️</span>
          <span className="brand-text">WeatherApp</span>
        </NavLink>
        
        {/* Menu de Navegação - Limpo e pronto para o CSS */}
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Início
            </NavLink>
          </li>
          <li>
            <NavLink to="/sobre" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Sobre
            </NavLink>
          </li>
          <li>
            <NavLink to="/contactos" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Contactos
            </NavLink>
          </li>
          <li>
            <NavLink to="/definicoes" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Defenições
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;