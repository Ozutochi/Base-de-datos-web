import React, { useState, useEffect } from 'react';
import { UserCheck, UserX, Clock, Search, Filter, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

const SolicitudesInscripcionPage: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState<string>('Todas');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Modal Rechazo
  const [solicitudToReject, setSolicitudToReject] = useState<any | null>(null);
  const [motivoRechazo, setMotivoRechazo] = useState<string>('');
  const [submittingAction, setSubmittingAction] = useState(false);

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    setLoading(true);
    try {
      const res = await api.get('/academico/solicitudes');
      setSolicitudes(res.data);
    } catch (error) {
      toast.error('Error al cargar las solicitudes de inscripción');
    } finally {
      setLoading(false);
    }
  };

  const handleAprobar = async (id: number) => {
    if (!window.confirm('¿Está seguro de aprobar esta solicitud? Se creará automáticamente el registro del estudiante.')) {
      return;
    }
    setSubmittingAction(true);
    try {
      await api.patch(`/academico/solicitudes/${id}/aprobar`);
      toast.success('Solicitud aprobada con éxito. El estudiante ha sido ingresado al sistema.');
      fetchSolicitudes();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al aprobar la solicitud');
    } finally {
      setSubmittingAction(false);
    }
  };

  const handleRechazarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!solicitudToReject) return;

    setSubmittingAction(true);
    try {
      await api.patch(`/academico/solicitudes/${solicitudToReject.id}/rechazar`, {
        motivo_rechazo: motivoRechazo,
      });
      toast.success('Solicitud rechazada.');
      setSolicitudToReject(null);
      setMotivoRechazo('');
      fetchSolicitudes();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al rechazar la solicitud');
    } finally {
      setSubmittingAction(false);
    }
  };

  const solicitudesFiltradas = solicitudes.filter((s) => {
    const coincideEstado = filtroEstado === 'Todas' || s.estado === filtroEstado;
    const nombreCompletoEstudiante = `${s.nombre_estudiante || ''} ${s.apellido_estudiante || ''}`.toLowerCase();
    const nombreRepresentante = `${s.representante?.nombre || ''} ${s.representante?.apellido || ''} ${s.representante?.correo || ''}`.toLowerCase();
    const coincideBusqueda =
      nombreCompletoEstudiante.includes(searchTerm.toLowerCase()) ||
      nombreRepresentante.includes(searchTerm.toLowerCase());
    return coincideEstado && coincideBusqueda;
  });

  const countPendientes = solicitudes.filter((s) => s.estado === 'Pendiente').length;
  const countAprobadas = solicitudes.filter((s) => s.estado === 'Aprobada').length;
  const countRechazadas = solicitudes.filter((s) => s.estado === 'Rechazada').length;

  return (
    <div style={{ padding: '0 0.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--text-dark)', margin: 0 }}>Solicitudes de Inscripción</h2>
          <p style={{ color: '#666', margin: '0.2rem 0 0 0', fontSize: '0.9rem' }}>
            Revisa y gestiona las solicitudes de ingreso enviadas por los representantes.
          </p>
        </div>
      </div>

      {/* Tarjetas de Resumen */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ background: 'white', padding: '1.2rem', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.04)', borderLeft: '4px solid #f59e0b', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Clock color="#f59e0b" size={32} />
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#333' }}>{countPendientes}</div>
            <div style={{ fontSize: '0.85rem', color: '#666' }}>Pendientes de Revisión</div>
          </div>
        </div>

        <div style={{ background: 'white', padding: '1.2rem', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.04)', borderLeft: '4px solid #10b981', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <CheckCircle color="#10b981" size={32} />
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#333' }}>{countAprobadas}</div>
            <div style={{ fontSize: '0.85rem', color: '#666' }}>Aprobadas</div>
          </div>
        </div>

        <div style={{ background: 'white', padding: '1.2rem', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.04)', borderLeft: '4px solid #ef4444', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <XCircle color="#ef4444" size={32} />
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#333' }}>{countRechazadas}</div>
            <div style={{ fontSize: '0.85rem', color: '#666' }}>Rechazadas</div>
          </div>
        </div>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div style={{ background: 'white', padding: '1rem 1.2rem', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.04)', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '250px' }}>
          <Search size={18} color="#999" />
          <input
            type="text"
            placeholder="Buscar por estudiante, representante o correo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '0.5rem 0.8rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '0.9rem' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={18} color="#666" />
          <span style={{ fontSize: '0.9rem', color: '#555', fontWeight: 500 }}>Estado:</span>
          {['Todas', 'Pendiente', 'Aprobada', 'Rechazada'].map((estado) => (
            <button
              key={estado}
              onClick={() => setFiltroEstado(estado)}
              style={{
                background: filtroEstado === estado ? 'var(--primary-blue)' : '#f1f5f9',
                color: filtroEstado === estado ? 'white' : '#475569',
                border: 'none',
                padding: '0.4rem 0.9rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: filtroEstado === estado ? 600 : 400,
              }}
            >
              {estado}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla de Solicitudes */}
      <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Cargando solicitudes...</div>
        ) : solicitudesFiltradas.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#999' }}>
            <AlertCircle size={40} style={{ margin: '0 auto 0.5rem auto', display: 'block', opacity: 0.5 }} />
            No se encontraron solicitudes con los criterios seleccionados.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  <th style={{ padding: '0.9rem 1rem' }}>ID</th>
                  <th style={{ padding: '0.9rem 1rem' }}>Estudiante</th>
                  <th style={{ padding: '0.9rem 1rem' }}>F. Nacimiento</th>
                  <th style={{ padding: '0.9rem 1rem' }}>Categoría</th>
                  <th style={{ padding: '0.9rem 1rem' }}>Representante</th>
                  <th style={{ padding: '0.9rem 1rem' }}>F. Solicitud</th>
                  <th style={{ padding: '0.9rem 1rem' }}>Estado</th>
                  <th style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {solicitudesFiltradas.map((s) => (
                  <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.9rem 1rem', fontWeight: 600, color: '#333' }}>#{s.id}</td>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <div style={{ fontWeight: 600, color: '#1e293b' }}>
                        {s.nombre_estudiante} {s.apellido_estudiante}
                      </div>
                      {s.observaciones && (
                        <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                          Obs: {s.observaciones}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '0.9rem 1rem', color: '#475569' }}>{s.fecha_nacimiento}</td>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                        {s.categoria?.nombre || s.categoria?.nombre_categoria || `ID ${s.categoria_id}`}
                      </span>
                    </td>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <div style={{ fontWeight: 500, color: '#334155' }}>
                        {s.representante ? `${s.representante.nombre} ${s.representante.apellido}` : 'Desconocido'}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{s.representante?.correo}</div>
                    </td>
                    <td style={{ padding: '0.9rem 1rem', color: '#64748b' }}>{s.fecha_solicitud}</td>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      {s.estado === 'Pendiente' && (
                        <span style={{ background: '#fef3c7', color: '#b45309', padding: '0.3rem 0.7rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Clock size={12} /> Pendiente
                        </span>
                      )}
                      {s.estado === 'Aprobada' && (
                        <span style={{ background: '#d1fae5', color: '#047857', padding: '0.3rem 0.7rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                          <CheckCircle size={12} /> Aprobada
                        </span>
                      )}
                      {s.estado === 'Rechazada' && (
                        <div>
                          <span style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.3rem 0.7rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                            <XCircle size={12} /> Rechazada
                          </span>
                          {s.motivo_rechazo && (
                            <div style={{ fontSize: '0.75rem', color: '#991b1b', marginTop: '4px' }}>
                              Motivo: {s.motivo_rechazo}
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>
                      {s.estado === 'Pendiente' ? (
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => handleAprobar(s.id)}
                            disabled={submittingAction}
                            style={{
                              background: '#10b981',
                              color: 'white',
                              border: 'none',
                              padding: '0.4rem 0.7rem',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                            }}
                          >
                            <UserCheck size={14} /> Aprobar
                          </button>
                          <button
                            onClick={() => {
                              setSolicitudToReject(s);
                              setMotivoRechazo('');
                            }}
                            disabled={submittingAction}
                            style={{
                              background: '#ef4444',
                              color: 'white',
                              border: 'none',
                              padding: '0.4rem 0.7rem',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                            }}
                          >
                            <UserX size={14} /> Rechazar
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Procesado ({s.fecha_respuesta || 'F. N/A'})</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Rechazar */}
      {solicitudToReject && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '1.8rem', borderRadius: '12px', width: '90%', maxWidth: '450px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h3 style={{ marginTop: 0, color: '#b91c1c', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserX size={20} /> Rechazar Solicitud #{solicitudToReject.id}
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#475569' }}>
              Estudiante: <strong>{solicitudToReject.nombre_estudiante} {solicitudToReject.apellido_estudiante}</strong>
            </p>
            <form onSubmit={handleRechazarSubmit}>
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                  Motivo de rechazo (opcional)
                </label>
                <textarea
                  rows={3}
                  value={motivoRechazo}
                  onChange={(e) => setMotivoRechazo(e.target.value)}
                  placeholder="Ej: Cupos agotados en esta categoría / Documentación incompleta"
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', resize: 'vertical' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem' }}>
                <button
                  type="button"
                  onClick={() => setSolicitudToReject(null)}
                  style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '0.6rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submittingAction}
                  style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.6rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
                >
                  Confirmar Rechazo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolicitudesInscripcionPage;
