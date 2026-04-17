import { useState } from 'react'
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
          <div className="login-logo">🚗</div>
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
              <span className="field-icon">🔒</span>
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
                {showPass ? '🙈' : '👁'}
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
