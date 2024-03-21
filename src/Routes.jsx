import React from 'react';
import CriandoAgenda from './CriandoAgenda.jsx';
import ValidandoConta from './ValidandoConta.jsx';
import Calendario from './Calendario.jsx';
import EventosAgendados from './EventosAgendados.jsx';
import TiposEventos from './TiposEventos.jsx';
import CriandoTipoEvento from './CriandoTipoEvento.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const AppRoutes = () => {
  return (
   
      <Routes>
        <Route path="/" element={<CriandoAgenda />} />
        <Route path="/validando-conta" element={<ValidandoConta />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/eventos-agendados" element={<EventosAgendados />} />
        <Route path="/tipos-eventos" element={<TiposEventos />} />
        <Route path="/criando-tipo-evento" element={<CriandoTipoEvento />} />
      </Routes>
    
  );
};

export default AppRoutes;