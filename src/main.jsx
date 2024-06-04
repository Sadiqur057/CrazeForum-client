import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Routes } from './routes/Routes.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthProvider from './proviers/AuthProvider';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <RouterProvider router={Routes}></RouterProvider>
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
