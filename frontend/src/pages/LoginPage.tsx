import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, Shield } from 'lucide-react';
import haalandImg from '../assets/haaland.png';

import toast from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('administrador');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Obtener usuarios simulados registrados (V3 para ignorar los viejos como Francisco)
    const mockUsers = JSON.parse(localStorage.getItem('mockUsersV3') || '[]');
    const registeredUser = mockUsers.find((u: any) => u.email === email && u.rol === role);

    if (!registeredUser) {
      if (role === 'administrador') {
        toast.error('No existe un administrador registrado con ese correo.');
      } else {
        toast.error('No existe un representante registrado con ese correo.');
      }
      return;
    }

    localStorage.setItem('user', JSON.stringify({ 
      role, 
      email,
      nombre: registeredUser.nombre || (role === 'administrador' ? 'Administrador' : 'Representante')
    }));
    
    if (role === 'representante') {
      navigate('/portal-representante');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      {/* Left panel - Branding */}
      <div className="login-left">
        <div className="login-left-pattern"></div>
        <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 3, textAlign: 'left' }}>
          <Shield size={45} color="white" style={{ marginBottom: '0.2rem' }} />
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', margin: 0, textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>ACADEMIA</h1>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', opacity: 0.9, marginTop: '-0.2rem', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>PRO</h2>
        </div>
        
        {/* Imagen del jugador superpuesta */}
        <img 
          src={haalandImg} 
          alt="Erling Haaland" 
          className="login-player-image" 
        />
      </div>

      {/* Right panel - Form */}
      <div className="login-right">
        <div className="login-card">
          <div className="login-header">
            <h2>Bienvenido de nuevo</h2>
            <p>Ingresa tus credenciales para acceder al sistema</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <Mail className="input-icon" size={20} />
              <input 
                type="email" 
                className="login-input" 
                placeholder="Correo Electrónico" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="input-group">
              <Lock className="input-icon" size={20} />
              <input 
                type="password" 
                className="login-input" 
                placeholder="Contraseña" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="input-group">
              <select 
                className="login-input" 
                style={{ appearance: 'auto', paddingLeft: '1.2rem', color: '#666' }}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="administrador">Entrar como Administrador</option>
                <option value="representante">Entrar como Representante</option>
              </select>
            </div>

            <button type="submit" className="login-button">
              INICIAR SESIÓN
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>¿No tienes una cuenta? </span>
            <button 
              onClick={() => navigate('/register')} 
              style={{ background: 'none', border: 'none', color: 'var(--primary-blue)', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}
            >
              Regístrate aquí
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
