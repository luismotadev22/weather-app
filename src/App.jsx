import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'; 

// CORREÇÃO: O caminho correto partindo de src/ para src/layout/
import Header from './layout/header.jsx';
import HomePage from './layout/homepage.jsx';
import CityDetailPage from './layout/citydetailpage.jsx';

// Nota: O CurrentWeatherCard não precisa de ser importado aqui 
// porque ele é usado dentro do CityDetailPage, não diretamente nas rotas.

function App() {
  return (
    <div className="app-layout">
      
      {/* 1. O Header fixo em todas as páginas */}
      <Header /> 

      <div className="content-area">
        <Routes>
          {/* Rota 1: Página Inicial */}
          <Route path="/" element={<HomePage />} />
          
          {/* Rota 2: Detalhes da Cidade */}
          <Route path="/cidade/:cityName" element={<CityDetailPage />} />
          
          {/* Rotas de Placeholder para evitar erros de ficheiro inexistente */}
          <Route path="/definicoes" element={
            <main style={{ padding: '20px' }}><h1>⚙️ Definições (Brevemente)</h1></main>
          } />

          <Route path="/sobre" element={
            <main style={{ padding: '20px' }}><h1>ℹ️ Sobre (Brevemente)</h1></main>
          } />

          <Route path="/contactos" element={
            <main style={{ padding: '20px' }}><h1>👤 Contactos (Brevemente)</h1></main>
          } />
          
          {/* Rota 404 */}
          <Route path="*" element={
            <main style={{ padding: '20px' }}>
                <h1>404: Página Não Encontrada</h1>
            </main>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;