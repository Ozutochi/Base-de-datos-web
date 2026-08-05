import React, { useState, useEffect } from 'react';
import { Users, DollarSign, Package, AlertTriangle, Calendar, CreditCard } from 'lucide-react';
import api from '../services/api';

interface DashboardMetrics {
  totalEstudiantes: number;
  totalIngresosMes: number;
  equiposPrestados: number;
  inventarioCritico: number;
  proximosPartidos: Array<{
    id: number;
    fecha: string;
    hora: string;
    equipo_rival: string;
    lugar_cancha: string;
    categoria: {
      nombre: string;
    };
  }>;
  deudasPendientes: Array<{
    id: number;
    mes: number;
    anio: number;
    monto_adeudado: string;
    moneda: string;
    estudiante: {
      nombre: string;
      apellido: string;
    };
  }>;
}

const DashboardHome: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await api.get('/dashboard/metrics');
        setMetrics(response.data);
      } catch (error) {
        console.error('Error fetching dashboard metrics', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Cargando métricas...</div>;
  }

  if (!metrics) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#d9534f' }}>Error al cargar las métricas. Intente recargar.</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1 className="page-title" style={{ marginBottom: '0.5rem' }}>Dashboard Principal</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Resumen general de Academia Pro</p>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Card 1: Estudiantes */}
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#e0f2fe', color: '#0ea5e9', padding: '1rem', borderRadius: '12px' }}>
            <Users size={28} />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Estudiantes Activos</p>
            <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#1e293b' }}>{metrics.totalEstudiantes}</h2>
          </div>
        </div>

        {/* Card 2: Ingresos del mes */}
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#dcfce7', color: '#22c55e', padding: '1rem', borderRadius: '12px' }}>
            <DollarSign size={28} />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Ingresos Aprobados (Mes)</p>
            <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#1e293b' }}>${metrics.totalIngresosMes.toFixed(2)}</h2>
          </div>
        </div>

        {/* Card 3: Equipos en Préstamo */}
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#fef3c7', color: '#f59e0b', padding: '1rem', borderRadius: '12px' }}>
            <Package size={28} />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Equipos Prestados</p>
            <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#1e293b' }}>{metrics.equiposPrestados}</h2>
          </div>
        </div>

        {/* Card 4: Inventario Crítico */}
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#fee2e2', color: '#ef4444', padding: '1rem', borderRadius: '12px' }}>
            <AlertTriangle size={28} />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Inventario a Revisar</p>
            <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#1e293b' }}>{metrics.inventarioCritico}</h2>
          </div>
        </div>
      </div>

      {/* Secciones Visuales (Listas) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
        
        {/* Próximos Partidos */}
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0, color: '#333' }}>
            <Calendar size={20} color="#0ea5e9" /> Próximos Partidos
          </h3>
          <div style={{ marginTop: '1.5rem' }}>
            {metrics.proximosPartidos.length === 0 ? (
              <p style={{ color: '#999', fontSize: '0.9rem' }}>No hay partidos programados.</p>
            ) : (
              metrics.proximosPartidos.map(partido => (
                <div key={partido.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid #eee' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', color: '#1e293b' }}>vs {partido.equipo_rival}</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>{partido.categoria?.nombre} • {partido.lugar_cancha}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold', color: 'var(--primary-blue)' }}>{new Date(partido.fecha).toLocaleDateString()}</div>
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>{partido.hora.substring(0, 5)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Deudas Pendientes */}
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0, color: '#333' }}>
            <CreditCard size={20} color="#ef4444" /> Cuentas por Cobrar (Deudas)
          </h3>
          <div style={{ marginTop: '1.5rem' }}>
            {metrics.deudasPendientes.length === 0 ? (
              <p style={{ color: '#999', fontSize: '0.9rem' }}>No hay deudas pendientes registradas.</p>
            ) : (
              metrics.deudasPendientes.map(deuda => (
                <div key={deuda.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid #eee' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', color: '#1e293b' }}>{deuda.estudiante?.nombre} {deuda.estudiante?.apellido}</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>Mensualidad: {deuda.mes}/{deuda.anio}</p>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontWeight: 'bold', color: '#ef4444' }}>{deuda.monto_adeudado} {deuda.moneda}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;
