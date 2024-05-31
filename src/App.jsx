import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import Home from './vistas/Home';
import Card from './vistas/Card';
import Tabla from './vistas/Tabla';

 const App = () => {
  return (
    <Router>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/card" element={<Card/>} />
        <Route path="/tabla" element={<Tabla/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
