import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaSun, FaMoon } from "react-icons/fa";

function SettingsPage() {
  // Inicializa o estado lendo o localStorage
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Sempre que isDark mudar, atualiza o body e o storage
  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div className="settings-page-container">
      <Link to="/" className="back-link">
        <FaArrowLeft /> Voltar para o Início
      </Link>

      <header style={{ marginBottom: '30px', borderBottom: '1px solid var(--border-color)' }}>
        <h1>⚙️ Definições de Estilo</h1>
      </header>

      <div className="setting-card"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '25px'
        }}
      >
        <div>
          
          <h3>Tema do Sistema</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Alterne entre o modo claro e escuro.
          </p>
        </div>

        <button 
          onClick={() => setIsDark(!isDark)}
          style={{
            padding: '10px 20px',
            borderRadius: '30px',
            border: 'none',
            backgroundColor: 'var(--accent)',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: 'bold'
          }}
        >
          {isDark ? <FaSun /> : <FaMoon />}
          {isDark ? "Modo Claro" : "Modo Escuro"}
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;