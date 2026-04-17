import { useState } from 'react'
import LoginScreen from './componente/login/login.jsx'
import Mantenimento from './componente/mantenimento/mantenimento.jsx'
import './App.css'

function App() {
  const [screen, setScreen] = useState('login')
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
    setScreen('home')
  }

  const handleLogout = () => {
    setUser(null)
    setScreen('login')
  }

  if (screen === 'login') {
    return <LoginScreen onLogin={handleLogin} />
  }

  return (
    <Mantenimento user={user} onLogout={handleLogout} />
  )
}

export default App
