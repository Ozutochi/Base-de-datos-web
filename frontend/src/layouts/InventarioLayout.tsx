import React from 'react';
import { Outlet, NavLink, Navigate, useLocation } from 'react-router-dom';

const InventarioLayout: React.FC = () => {
  const location = useLocation();

  if (location.pathname === '/dashboard/inventario' || location.pathname === '/dashboard/inventario/') {
    return <Navigate to="/dashboard/inventario/articulos" replace />;
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid #eef2f6', marginBottom: '2rem' }}>
        <NavLink 
          to="/dashboard/inventario/articulos"
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
          Artículos (Almacén)
        </NavLink>
        <NavLink 
          to="/dashboard/inventario/asignaciones"
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
          Equipamiento Asignado
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default InventarioLayout;
