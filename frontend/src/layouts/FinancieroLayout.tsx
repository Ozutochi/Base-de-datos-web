import React from 'react';
import { Outlet, NavLink, Navigate, useLocation } from 'react-router-dom';

const FinancieroLayout: React.FC = () => {
  const location = useLocation();

  if (location.pathname === '/dashboard/financiero' || location.pathname === '/dashboard/financiero/') {
    return <Navigate to="/dashboard/financiero/pagos" replace />;
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid #eef2f6', marginBottom: '2rem' }}>
        <NavLink 
          to="/dashboard/financiero/pagos"
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
          Pagos
        </NavLink>
        <NavLink 
          to="/dashboard/financiero/mensualidades"
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
          Mensualidades
        </NavLink>
        <NavLink 
          to="/dashboard/financiero/tarifas"
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
          Tarifas Base
        </NavLink>
        <NavLink 
          to="/dashboard/financiero/reportes"
          style={({ isActive }) => ({
            padding: '1rem 1.5rem',
            textDecoration: 'none',
            color: isActive ? '#ef4444' : '#666',
            fontWeight: isActive ? 600 : 500,
            borderBottom: isActive ? '3px solid #ef4444' : '3px solid transparent',
            marginBottom: '-2px',
            transition: 'all 0.2s ease'
          })}
        >
          Reportes de Morosidad
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default FinancieroLayout;
