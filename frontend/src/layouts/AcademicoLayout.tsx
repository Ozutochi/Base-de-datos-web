import React from 'react';
import { Outlet, NavLink, Navigate, useLocation } from 'react-router-dom';

const AcademicoLayout: React.FC = () => {
  const location = useLocation();

  // Redirigir la ruta base a categorias
  if (location.pathname === '/dashboard/academico' || location.pathname === '/dashboard/academico/') {
    return <Navigate to="/dashboard/academico/categorias" replace />;
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid #eef2f6', marginBottom: '2rem' }}>
        <NavLink 
          to="/dashboard/academico/categorias"
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
          Categorías
        </NavLink>
        <NavLink 
          to="/dashboard/academico/fichas-medicas"
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
          Fichas Médicas
        </NavLink>
        <NavLink 
          to="/dashboard/academico/asignacion"
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
          Asignación de Personal
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default AcademicoLayout;
