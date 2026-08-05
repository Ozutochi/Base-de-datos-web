import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowLeft, Shield } from 'lucide-react';
import haalandImg from '../assets/haaland.png'; // Reutilizamos la imagen

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log('Registrando usuario:', formData);
    navigate('/login');
  };

  return (
    <div className="login-container">
      {/* Left panel - Branding (Mismo estilo que Login para consistencia) */}
      <div className="login-left">
        <div className="login-left-pattern"></div>
        <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 3, textAlign: 'left' }}>
          <Shield size={45} color="white" style={{ marginBottom: '0.2rem' }} />
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', margin: 0, textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>ACADEMIA</h1>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', opacity: 0.9, marginTop: '-0.2rem', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>PRO</h2>
        </div>
        
        <img 
          src={haalandImg} 
          alt="Erling Haaland" 
          className="login-player-image" 
        />
      </div>

      {/* Right panel - Form */}
      <div className="login-right">
        <div className="login-card" style={{ padding: '2.5rem' }}>
          <div className="login-header" style={{ marginBottom: '1.5rem' }}>
            <h2>Únete a la Academia</h2>
            <p>Crea tu cuenta para empezar a gestionar</p>
          </div>

          <form onSubmit={handleRegister}>
            <div className="input-group">
              <User className="input-icon" size={20} />
              <input 
                type="text" 
                name="nombre"
                className="login-input" 
                placeholder="Nombre Completo" 
                required
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <Mail className="input-icon" size={20} />
              <input 
                type="email" 
                name="email"
                className="login-input" 
                placeholder="Correo Electrónico" 
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="input-group">
              <Lock className="input-icon" size={20} />
              <input 
                type="password" 
                name="password"
                className="login-input" 
                placeholder="Contraseña" 
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <Lock className="input-icon" size={20} />
              <input 
                type="password" 
                name="confirmPassword"
                className="login-input" 
                placeholder="Confirmar Contraseña" 
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="login-button">
              REGISTRARSE
            </button>
          </form>
          
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>¿Ya tienes una cuenta? </span>
            <button 
              onClick={() => navigate('/login')} 
              style={{ background: 'none', border: 'none', color: 'var(--primary-blue)', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}
            >
              Inicia Sesión
            </button>
          </div>
        </div>

        <button onClick={() => navigate('/')} className="back-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <ArrowLeft size={16} />
          Volver a la página principal
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
