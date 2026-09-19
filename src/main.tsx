import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { reportPlaceholders } from './lib/checkPlaceholders';
import './index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Could not find the #root element in index.html');

createRoot(container).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);

reportPlaceholders();
