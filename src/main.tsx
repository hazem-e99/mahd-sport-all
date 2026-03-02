import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from '@shared/context/AuthContext';
import './i18n';
import Router from './routes';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={Router} />
        </AuthProvider>
    </StrictMode>
)
