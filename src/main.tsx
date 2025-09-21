import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './main.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error("Can't find root");
}

createRoot(root).render(
  // <StrictMode>
  <App />
  // </StrictMode>
);
