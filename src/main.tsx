import '@mantine/core/styles.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
// import './index.css'
import { MantineProvider } from '@mantine/core';
import App from './App.tsx'
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import { AuthProvider } from './context/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <MantineProvider>
          <Notifications />
          <App />
        </MantineProvider>
      </BrowserRouter>
    </AuthProvider>


  </StrictMode >
);
