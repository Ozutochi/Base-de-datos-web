import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Shield } from 'lucide-react';
import haalandImg from '../assets/haaland.png';
import api from '../services/api';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    rol: 'administrador'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    
    // Guardar usuario simulado en localStorage (Usamos V3 para el login MVP y limpiar memoria)
    const users = JSON.parse(localStorage.getItem('mockUsersV3') || '[]');
    users.push({ nombre: formData.nombre, email: formData.email, rol: formData.rol });
    localStorage.setItem('mockUsersV3', JSON.stringify(users));

    // Guardar en la base de datos real para que aparezcan en los módulos
    try {
      const parts = formData.nombre.trim().split(' ');
      const nombre = parts[0];
      const apellido = parts.slice(1).join(' ') || 'N/A';
      
      await api.post('/usuarios', {
        nombre,
        apellido,
        cedula: 'V-' + Math.floor(Math.random() * 100000000), // Cédula autogenerada
        correo: formData.email,
        telefono: '',
        password_hash: formData.password,
        rol_id: formData.rol === 'representante' ? 1 : 2, // 1 es Representante en BD
        estado: 'Activo'
      });
    } catch (error) {
      console.error('Error guardando usuario en BD:', error);
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

            <div className="input-group">
              <select 
                name="rol"
                className="login-input" 
                style={{ appearance: 'auto', paddingLeft: '1.2rem', color: '#666' }}
                value={formData.rol}
                onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
              >
                <option value="administrador">Registrar como Administrador</option>
                <option value="representante">Registrar como Representante</option>
              </select>
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
      </div>
    </div>
  );
};

export default RegisterPage;
