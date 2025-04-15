import '@mantine/core/styles.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { MantineProvider } from '@mantine/core';
import App from './App.tsx'
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';


createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <BrowserRouter>
      <MantineProvider>
        <Notifications />
        <App />
      </MantineProvider>
    </BrowserRouter>
  </StrictMode >
);
