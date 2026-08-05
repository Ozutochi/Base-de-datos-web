import React from 'react';
import { Outlet, NavLink, Navigate, useLocation } from 'react-router-dom';

const UsuariosLayout: React.FC = () => {
  const location = useLocation();

  // Redirigir la ruta base a estudiantes
  if (location.pathname === '/dashboard/usuarios' || location.pathname === '/dashboard/usuarios/') {
    return <Navigate to="/dashboard/usuarios/estudiantes" replace />;
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid #eef2f6', marginBottom: '2rem' }}>
        <NavLink 
          to="/dashboard/usuarios/estudiantes"
          style={({ isActive }) => ({
            padding: '1rem 1.5rem',
            textDecoration: 'none',
            color: isActive ? 'var(--primary-blue)' : '#666',
            fontWeight: isActive ? 600 : 500,
            borderBottom: isActive ? '3px solid var(--primary-blue)' : '3px solid transparent',
            marginBottom: '-2px',
            transition: 'all 0.2s ease'
          })}
        >
          Estudiantes
        </NavLink>
        <NavLink 
          to="/dashboard/usuarios/representantes"
          style={({ isActive }) => ({
            padding: '1rem 1.5rem',
            textDecoration: 'none',
            color: isActive ? 'var(--primary-blue)' : '#666',
            fontWeight: isActive ? 600 : 500,
            borderBottom: isActive ? '3px solid var(--primary-blue)' : '3px solid transparent',
            marginBottom: '-2px',
            transition: 'all 0.2s ease'
          })}
        >
          Representantes
        </NavLink>
        <NavLink 
          to="/dashboard/usuarios/docentes"
          style={({ isActive }) => ({
            padding: '1rem 1.5rem',
            textDecoration: 'none',
            color: isActive ? 'var(--primary-blue)' : '#666',
            fontWeight: isActive ? 600 : 500,
            borderBottom: isActive ? '3px solid var(--primary-blue)' : '3px solid transparent',
            marginBottom: '-2px',
            transition: 'all 0.2s ease'
          })}
        >
          Docentes
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default UsuariosLayout;
