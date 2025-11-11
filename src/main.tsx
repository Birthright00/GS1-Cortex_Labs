import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import PredictiveAnalytics from './pages/PredictiveAnalytics.tsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/predictive-analytics" element={<PredictiveAnalytics />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
