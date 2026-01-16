import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Header from './layout/header.jsx';
import HomePage from './layout/homepage.jsx';
import CityDetailPage from './layout/citydetailpage.jsx';
import SettingsPage from "./layout/settingspage.jsx";
import Sobre from './layout/sobre.jsx';
import Contactos from './layout/contactos.jsx';

function App() {
  return (
    <div className="app-layout">
      <Header />
      <div className="content-area">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cidade/:cityId" element={<CityDetailPage />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="*" element={<main style={{ padding: '20px' }}><h1>404: Página Não Encontrada</h1></main>} />
          <Route path="/definicoes" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;