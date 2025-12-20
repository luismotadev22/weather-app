import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WeatherProvider } from './logic/weathercontext.jsx' 
import './index.css'
import App from './App.jsx'

// 1. Criar a instância do cliente para o React Query
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Provedor de Dados (React Query) */}
    <QueryClientProvider client={queryClient}>
      {/* 3. Provedor do teu Estado Global (Favoritos/Unidades) */}
      <WeatherProvider>
        {/* 4. Provedor de Rotas (Navegação) */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WeatherProvider>
    </QueryClientProvider>
  </StrictMode>,
)