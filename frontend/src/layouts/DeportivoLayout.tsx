import React from 'react';
import { Outlet, NavLink, Navigate, useLocation } from 'react-router-dom';

const DeportivoLayout: React.FC = () => {
  const location = useLocation();

  if (location.pathname === '/dashboard/deportivo' || location.pathname === '/dashboard/deportivo/') {
    return <Navigate to="/dashboard/deportivo/sesiones" replace />;
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid #eef2f6', marginBottom: '2rem' }}>
        <NavLink 
          to="/dashboard/deportivo/sesiones"
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
          Entrenamientos
        </NavLink>
        <NavLink 
          to="/dashboard/deportivo/partidos"
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
          Partidos
        </NavLink>
        <NavLink 
          to="/dashboard/deportivo/asistencias"
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
          Asistencias
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default DeportivoLayout;
