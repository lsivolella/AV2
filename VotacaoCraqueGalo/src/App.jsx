import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Resultado from './pages/Resultado';
import Votacao from './pages/Votacao';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/votacao" element={<Votacao />} />
        <Route path="/resultado" element={<Resultado />} />
        {/* Qualquer outro endereço volta para a Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer className="rodape">Lucas Sivolella | DIAW 2026 | PUC Minas</footer>
    </BrowserRouter>
  )
}

export default App
