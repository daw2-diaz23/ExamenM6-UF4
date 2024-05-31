import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import Home from './vistas/Home';
import Tabla from './vistas/Tabla';
import Cards from './vistas/Cards';
import { GlobalProvider } from './context/GlobalContext';

const App = () => {
  return (
    <GlobalProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/card" element={<Cards />} />
          <Route path="/tabla" element={<Tabla />} />
        </Routes>
        <Footer />
      </Router>
    </GlobalProvider>
  );
};

export default App;
