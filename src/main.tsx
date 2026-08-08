import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Register basic service worker for offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('[Service Worker] Registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('[Service Worker] Registration failed:', error);
      });
  });

  // Listen for offline status messages sent from the Service Worker
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SW_OFFLINE_NOTIFICATION') {
      window.dispatchEvent(new CustomEvent('app-offline-event', { detail: { source: 'sw' } }));
    }
  });
}

// Global connection state listeners
window.addEventListener('offline', () => {
  window.dispatchEvent(new CustomEvent('app-offline-event', { detail: { source: 'browser' } }));
});

window.addEventListener('online', () => {
  window.dispatchEvent(new CustomEvent('app-online-event'));
});

