import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
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

import { Toaster } from 'react-hot-toast';
import './index.css';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<LandingPage />} />
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
