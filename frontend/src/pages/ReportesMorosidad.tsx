import React, { useState, useEffect } from 'react';
import { FileText, Search, AlertOctagon, Filter } from 'lucide-react';
import api from '../services/api';

const ReportesMorosidad: React.FC = () => {
  const [mensualidades, setMensualidades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [mesFiltro, setMesFiltro] = useState<string>('');
  const [anioFiltro, setAnioFiltro] = useState<string>(new Date().getFullYear().toString());
  const [tipoFiltro, setTipoFiltro] = useState<'MES_ESPECIFICO' | 'MAS_DE_2_MESES'>('MES_ESPECIFICO');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Pedimos todas las mensualidades y hacemos el cálculo aquí (MVP mode)
      const res = await api.get('/financiero/mensualidades');
      // Filtramos solo las que son deuda
      const deudas = res.data.filter((m: any) => m.estado === 'Pendiente' || m.estado === 'Vencida');
      setMensualidades(deudas);
    } catch (error) {
      console.error('Error fetching deudas', error);
    } finally {
      setLoading(false);
    }
  };

  // Procesar Reportes
  let resultados: any[] = [];

  if (tipoFiltro === 'MES_ESPECIFICO') {
    resultados = mensualidades.filter(m => {
      if (mesFiltro && m.mes !== Number(mesFiltro)) return false;
      if (anioFiltro && m.anio !== Number(anioFiltro)) return false;
      return true;
    });
  } else if (tipoFiltro === 'MAS_DE_2_MESES') {
    // Agrupar deudas por estudiante
    const deudasPorEstudiante: Record<number, any[]> = {};
    mensualidades.forEach(m => {
      const eId = m.estudiante_id;
      if (!deudasPorEstudiante[eId]) deudasPorEstudiante[eId] = [];
      deudasPorEstudiante[eId].push(m);
    });

    // Filtrar los que tengan >= 2 deudas
    for (const [eId, deudas] of Object.entries(deudasPorEstudiante)) {
      if (deudas.length >= 2) {
        resultados.push(...deudas);
      }
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="page-title">Reportes de Morosidad</h1>
          <p style={{ color: '#666' }}>Generación rápida de reportes exigidos por dirección</p>
        </div>
      </div>

      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0, marginBottom: '1rem', color: '#1e293b' }}>
          <Filter size={20} /> Parámetros del Reporte
        </h3>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '0.3rem' }}>Tipo de Reporte</label>
            <select 
              value={tipoFiltro} 
              onChange={e => setTipoFiltro(e.target.value as any)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #ddd' }}
            >
              <option value="MES_ESPECIFICO">Deudores de un Mes Específico</option>
              <option value="MAS_DE_2_MESES">Deudores Críticos (2 o más meses vencidos)</option>
            </select>
          </div>

          {tipoFiltro === 'MES_ESPECIFICO' && (
            <>
              <div style={{ flex: 1, minWidth: '150px' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '0.3rem' }}>Mes a consultar</label>
                <select 
                  value={mesFiltro} 
                  onChange={e => setMesFiltro(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #ddd' }}
                >
                  <option value="">Todos los meses</option>
                  <option value="1">Enero</option>
                  <option value="2">Febrero</option>
                  <option value="3">Marzo</option>
                  <option value="4">Abril</option>
                  <option value="5">Mayo</option>
                  <option value="6">Junio</option>
                  <option value="7">Julio</option>
                  <option value="8">Agosto</option>
                  <option value="9">Septiembre</option>
                  <option value="10">Octubre</option>
                  <option value="11">Noviembre</option>
                  <option value="12">Diciembre</option>
                </select>
              </div>
              <div style={{ flex: 1, minWidth: '150px' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '0.3rem' }}>Año</label>
                <input 
                  type="number" 
                  value={anioFiltro} 
                  onChange={e => setAnioFiltro(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #ddd' }}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, color: '#1e293b' }}>Resultados del Reporte ({resultados.length} registros)</h3>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fef3c7', color: '#d97706', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 600 }}>
            <FileText size={18} /> Exportar PDF
          </button>
        </div>

        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#666' }}>Calculando reporte...</div>
        ) : resultados.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#10b981' }}>
            <AlertOctagon size={48} style={{ margin: '0 auto 1rem auto', display: 'block', opacity: 0.5 }} />
            <p style={{ fontSize: '1.1rem' }}>No se encontraron deudores con estos parámetros.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Estudiante</th>
                  <th>Cédula</th>
                  <th>Mensualidad</th>
                  <th>Monto Deuda</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((m) => (
                  <tr key={m.id}>
                    <td style={{ fontWeight: 600 }}>{m.estudiante?.nombre} {m.estudiante?.apellido}</td>
                    <td>{m.estudiante?.cedula}</td>
                    <td>Mes {m.mes} - {m.anio}</td>
                    <td style={{ fontWeight: 'bold', color: '#ef4444' }}>{m.monto_adeudado} {m.moneda}</td>
                    <td>
                      <span style={{ 
                        padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600,
                        backgroundColor: m.estado === 'Vencida' ? '#fee2e2' : '#fef3c7',
                        color: m.estado === 'Vencida' ? '#ef4444' : '#d97706'
                      }}>
                        {m.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default ReportesMorosidad;
