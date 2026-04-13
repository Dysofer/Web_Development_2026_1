import React, { useState } from 'react';
import hero from '../../assets/hero.png'
import './login.css'; 

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Autenticando:', { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        <div className="login-title" >
          <img src={hero} width="160" height="169" alt="logo" />
          
          <h2> <b>Mantenimiento Vehicular</b> </h2>
          <p>
            Iniciar Sesión para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="login-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
        <a href="#" className="login-footer">¿Has olvidado tu contraseña?</a>
        <a href="#" className="login-footer">Registrate</a>

      </div>
    </div>
  );
};

export default LoginScreen;
