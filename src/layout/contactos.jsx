import React from 'react';
import '../App.css'; 

const Contactos = () => {
  return (
    <main className="sobre-container">
      <div className="sobre-section">
        <h1 className="sobre-title">
          <span role="img" aria-label="person">👤</span> Contacto
        </h1>
        
        <div className="contactos-card">
          <div className="contactos-foto-area">
            {/* Substitui 'as-tua-foto.jpg' pelo nome real do teu ficheiro de imagem */}
            <img 
              src="programador.jpeg" 
              alt="Dono da Plataforma" 
              className="contactos-img"
            />
          </div>
          
          <div className="contactos-info">
            <h2 className="sobre-subtitle">CEO da WheatherApp</h2>
            <p className="sobre-text"><strong>Nome:</strong> Luís Fernando Gomes Mota</p>
            <p className="sobre-text"><strong>Email:</strong> luismota22x@gmail.com</p>
            <p className="sobre-text"><strong>Telefone:</strong> +351 928 096 108</p>
            
            <div className="social-links">
               <p className="sobre-text">Disponível para qualquer esclarecimento técnico sobre a plataforma. Menos na hora do almoço e de jantar.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contactos;