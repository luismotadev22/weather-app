import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Header from './layout/header.jsx';
import HomePage from './layout/homepage.jsx';
import CityDetailPage from './layout/citydetailpage.jsx';

function App() {
  return (
    <div className="app-layout">
      <Header />
      <div className="content-area">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cidade/:cityId" element={<CityDetailPage />} />
          <Route path="/definicoes" element={<main style={{ padding: '20px' }}><h1>⚙️ Definições (Brevemente)</h1></main>} />
          <Route path="/sobre" element={<main style={{ padding: '20px' }}><h1>ℹ️ Sobre (Brevemente)</h1></main>} />
          <Route path="/contactos" element={<main style={{ padding: '20px' }}><h1>👤 Contactos (Brevemente)</h1></main>} />
          <Route path="*" element={<main style={{ padding: '20px' }}><h1>404: Página Não Encontrada</h1></main>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;