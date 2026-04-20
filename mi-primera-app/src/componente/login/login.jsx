import { useState } from 'react'
import suzukiLogo from '../../assets/LOGO_SUZUKI.png'
import './login.css'

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && password) {
      onLogin({ email })
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-brand">
          <div className="login-logo-wrap">
            <img src={suzukiLogo} alt="Logo" className="login-logo-img" />
          </div>
          <h1>AutoDirect</h1>
          <p>Inicia sesión para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="field-group">
            <label className="field-label">Correo Electrónico</label>
            <div className="field-wrap">
              <span className="field-icon">✉</span>
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">Contraseña</label>
            <div className="field-wrap">
              <span className="field-icon"></span>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="eye-btn"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
              </span>
            </div>
          </div>

          <button type="submit" className="btn-primary">
            Iniciar Sesión
          </button>
        </form>

        <div className="login-links">
          <a href="#">¿Olvidaste tu contraseña?</a>
          <a href="#">¿No tienes cuenta? Regístrate</a>
        </div>

      </div>
    </div>
  )
}

export default LoginScreen