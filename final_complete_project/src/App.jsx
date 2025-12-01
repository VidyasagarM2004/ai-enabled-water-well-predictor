import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Prediction from './pages/Prediction'
import MapView from './pages/MapView'
import SoilData from './pages/SoilData'
import Weather from './pages/Weather'
import Chat from './pages/Chat'
import { setTheme } from './store/themeSlice'
import { auth } from './services/firebase'

function App() {
  const dispatch = useDispatch()
  const { isDark } = useSelector((state) => state.theme)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    // Initialize theme on app load
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      dispatch(setTheme(savedTheme === 'dark'))
    }
  }, [dispatch])

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Landing />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="prediction" element={<Prediction />} />
        <Route path="map" element={<MapView />} />
        <Route path="data" element={<SoilData />} />
        <Route path="weather" element={<Weather />} />
        <Route path="chat" element={<Chat />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App