import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './layouts/DashboardLayout';
import PortalRepresentante from './pages/PortalRepresentante';
import UsuariosLayout from './layouts/UsuariosLayout';
import DashboardHome from './pages/DashboardHome';
import EstudiantesPage from './pages/EstudiantesPage';
import RepresentantesPage from './pages/RepresentantesPage';
import DocentesPage from './pages/DocentesPage';
import AcademicoLayout from './layouts/AcademicoLayout';
import CategoriasPage from './pages/CategoriasPage';
import FichasMedicasPage from './pages/FichasMedicasPage';
import AsignacionPersonalPage from './pages/AsignacionPersonalPage';
import SolicitudesInscripcionPage from './pages/SolicitudesInscripcionPage';

import DeportivoLayout from './layouts/DeportivoLayout';
import SesionesEntrenamientoPage from './pages/SesionesEntrenamientoPage';
import PartidosPage from './pages/PartidosPage';
import AsistenciasPage from './pages/AsistenciasPage';

import FinancieroLayout from './layouts/FinancieroLayout';
import PagosPage from './pages/PagosPage';
import MensualidadesPage from './pages/MensualidadesPage';
import TarifasPage from './pages/TarifasPage';
import ReportesMorosidad from './pages/ReportesMorosidad';

import InventarioLayout from './layouts/InventarioLayout';
import ArticulosPage from './pages/ArticulosPage';
import AsignacionesInventarioPage from './pages/AsignacionesInventarioPage';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';

const routeTitles: Record<string, string> = {
  '/login': 'Iniciar Sesión',
  '/register': 'Registro',
  '/portal-representante': 'Portal Representante',
  '/dashboard': 'Dashboard',
  '/dashboard/usuarios/estudiantes': 'Estudiantes',
  '/dashboard/usuarios/representantes': 'Representantes',
  '/dashboard/usuarios/docentes': 'Docentes',
  '/dashboard/academico/categorias': 'Categorías',
  '/dashboard/academico/fichas-medicas': 'Fichas Médicas',
  '/dashboard/academico/asignacion': 'Asignación de Personal',
  '/dashboard/academico/solicitudes': 'Solicitudes de Inscripción',
  '/dashboard/deportivo/sesiones': 'Sesiones de Entrenamiento',
  '/dashboard/deportivo/partidos': 'Partidos',
  '/dashboard/deportivo/asistencias': 'Asistencias',
  '/dashboard/financiero/pagos': 'Pagos',
  '/dashboard/financiero/mensualidades': 'Mensualidades',
  '/dashboard/financiero/tarifas': 'Tarifas',
  '/dashboard/financiero/reportes': 'Reportes de Morosidad',
  '/dashboard/inventario/articulos': 'Artículos de Inventario',
  '/dashboard/inventario/asignaciones': 'Asignaciones de Inventario',
};

function TitleManager() {
  const location = useLocation();

  useEffect(() => {
    const title = routeTitles[location.pathname] || 'Sistema';
    document.title = `ACADEMIA || ${title}`;
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <TitleManager />
      <Toaster position="top-right" />
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/portal-representante" element={<PortalRepresentante />} />
        
        {/* Rutas Privadas (Dashboard) */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          
          {/* Módulo Usuarios (Pestañas) */}
          <Route path="usuarios" element={<UsuariosLayout />}>
            <Route path="estudiantes" element={<EstudiantesPage />} />
            <Route path="representantes" element={<RepresentantesPage />} />
            <Route path="docentes" element={<DocentesPage />} />
          </Route>
          {/* Módulo Académico (Pestañas) */}
          <Route path="academico" element={<AcademicoLayout />}>
            <Route path="categorias" element={<CategoriasPage />} />
            <Route path="fichas-medicas" element={<FichasMedicasPage />} />
            <Route path="asignacion" element={<AsignacionPersonalPage />} />
            <Route path="solicitudes" element={<SolicitudesInscripcionPage />} />
          </Route>
          {/* Módulo Deportivo (Pestañas) */}
          <Route path="deportivo" element={<DeportivoLayout />}>
            <Route path="sesiones" element={<SesionesEntrenamientoPage />} />
            <Route path="partidos" element={<PartidosPage />} />
            <Route path="asistencias" element={<AsistenciasPage />} />
          </Route>
          
          {/* Módulo Financiero (Pestañas) */}
          <Route path="financiero" element={<FinancieroLayout />}>
            <Route path="pagos" element={<PagosPage />} />
            <Route path="mensualidades" element={<MensualidadesPage />} />
            <Route path="tarifas" element={<TarifasPage />} />
            <Route path="reportes" element={<ReportesMorosidad />} />
          </Route>
          
          {/* Módulo Inventario (Pestañas) */}
          <Route path="inventario" element={<InventarioLayout />}>
            <Route path="articulos" element={<ArticulosPage />} />
            <Route path="asignaciones" element={<AsignacionesInventarioPage />} />
          </Route>
          
          {/* Aquí irán las futuras rutas de los módulos */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
