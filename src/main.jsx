import React from 'react';
import ReactDOM from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import App from './App';
import './index.css';
import { GlobalProvider } from './context/GlobalContext'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <NextUIProvider>
        <main className="text-foreground bg-background">
          <App />
          
        </main>
      </NextUIProvider>
    </GlobalProvider>
  </React.StrictMode>
);
