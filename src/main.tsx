import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../semantic.css';
import './docs-shell.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
