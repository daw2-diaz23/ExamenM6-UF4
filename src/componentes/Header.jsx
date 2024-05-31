import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Examen M6</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/card" className="hover:underline">Card</Link></li>
            <li><Link to="/tabla" className="hover:underline">Tabla</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
