import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './components/Auth/Login'
import Feed from './components/Feed/Feed'
import Camera from './components/Camera/Camera'
import Profile from './components/Profile/Profile'
import Friends from './components/Friends/Friends'
import Navigation from './components/Navigation/Navigation'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('berealUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (userData: any) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('berealUser', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('berealUser')
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/feed" replace />} />
        <Route path="/feed" element={<Feed user={user} />} />
        <Route path="/camera" element={<Camera user={user} />} />
        <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} />} />
        <Route path="/friends" element={<Friends user={user} />} />
      </Routes>
      <Navigation />
    </div>
  )
}

export default App
