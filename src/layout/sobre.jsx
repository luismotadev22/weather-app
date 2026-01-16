import React from 'react';
import '../App.css';

const Sobre = () => {
  return (
    <main className="sobre-container">
      <section className="sobre-section">
        <h1 className="sobre-title">ℹ️ Sobre o WeatherApp</h1>
        <p className="sobre-text">
          O <strong>WeatherApp</strong> é uma plataforma de consulta meteorológica focada em Portugal, 
          desenhada para oferecer dados precisos e oficiais de forma simples e intuitiva de todas as cidades de Portugal. 
        </p>
      </section>

      <section className="sobre-section">
        <h2 className="sobre-subtitle">📡 Origem dos Dados</h2>
        <p className="sobre-text">
          Todos os dados exibidos são obtidos em tempo real através da API pública do 
          <strong> IPMA (Instituto Português do Mar e da Atmosfera)</strong>. Ao contrário de outras apps 
          que usam satélites globais, nós privilegiamos a rede de estações meteorológicas nacionais. Enquanto os satélites estimam a temperatura e a humidade através da radiação infravermelha da atmosfera, 
          as estações terrestres realizam medições físicas diretas no local, deste modo eliminando margens de erro causadas por coberturas de nuvens ou interferências atmosféricas.
        </p>
      </section>

      <section className="sobre-section">
        <h2 className="sobre-subtitle">⚙️ Como funciona a API?</h2>
        <p className="sobre-text">
          A ligação ao IPMA é feita em dois passos técnicos fundamentais para garantir a precisão:
        </p>
        <ol className="sobre-list">
          <li>
            O IPMA utiliza identificadores numéricos (IDs) em vez de nomes, a app primeiro cruza a tua pesquisa (ex: "Matosinhos") com uma lista local 
            de distritos e concelhos para encontrar o ID correspondente (no caso de Matosinhos, o ID do Porto: 1131200).
            
          </li>
          <li>
            Conexão Segura: Após obter o ID, o nosso backend estabelece uma ligação 
            direta aos servidores do IPMA via protocolo HTTP, solicitando o ficheiro JSON específico 
            daquela cidade para as próximas 24 horas.
          </li>
        </ol>
      </section>

      <section className="sobre-section">
        <h2 className="sobre-subtitle">📍Informação útil sobre Localidades</h2>
        <p className="sobre-text">
          A previsão apresentada refere-se sempre à estação meteorológica principal mais próxima. 
          Cidades como Matosinhos, Maia ou Gaia são servidas pelos dados da estação oficial do Porto.
        </p>
      </section>
    </main>
  );
};


export default Sobre;