import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createTheme,ThemeProvider } from '@mui/material' //for theme
import { BrowserRouter } from "react-router-dom"; //for wrapping funcitonality in browser to use routing function
import { AuthProvider } from './context/AuthContext.tsx'
import { Toaster } from "react-hot-toast";
//we use axios to send the api request to backend
import axios from "axios";
axios.defaults.baseURL = "https://chatbot-ai-backend-m0m2.onrender.com";
axios.defaults.withCredentials = true;

const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab, serif",
    allVariants: {color: "white"},
  },
})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
        <Toaster position="top-right" />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
