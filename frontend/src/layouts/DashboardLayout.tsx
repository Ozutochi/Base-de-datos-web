import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Trophy, 
  Wallet, 
  Package, 
  LogOut, 
  Search 
} from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Resumen', icon: <LayoutDashboard size={20} />, end: true },
    { path: '/dashboard/usuarios', label: 'Usuarios', icon: <Users size={20} /> },
    { path: '/dashboard/academico', label: 'Académico', icon: <GraduationCap size={20} /> },
    { path: '/dashboard/deportivo', label: 'Deportivo', icon: <Trophy size={20} /> },
    { path: '/dashboard/financiero', label: 'Financiero', icon: <Wallet size={20} /> },
    { path: '/dashboard/inventario', label: 'Inventario', icon: <Package size={20} /> },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <Shield size={32} color="white" />
          <div>
            <h1 style={{ lineHeight: 1 }}>ACADEMIA</h1>
            <span style={{ fontSize: '0.8rem', opacity: 0.8, fontWeight: 300, letterSpacing: '2px' }}>PANEL DE CONTROL</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink 
              key={item.path}
              to={item.path} 
              end={item.end}
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        {/* Top Header */}
        <header className="dashboard-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#666' }}>
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Buscar..." 
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '1rem', width: '300px' }} 
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-blue)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                AD
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-dark)' }}>Administrador</p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-light)' }}>admin@academia.pro</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
