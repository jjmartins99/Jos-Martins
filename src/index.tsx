// Fix: Manually define types for import.meta.env to work around vite/client type loading issues.
interface ImportMetaEnv {
    readonly DEV: boolean;
}
interface ImportMeta {
    readonly env: ImportMetaEnv
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    // `worker.start()` returns a Promise that resolves
    // once the Service Worker is up and running.
    return worker.start({
       // Suppress warnings about unhandled requests
      onUnhandledRequest: 'bypass',
    });
  }
  return Promise.resolve();
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

enableMocking().then(() => {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
});