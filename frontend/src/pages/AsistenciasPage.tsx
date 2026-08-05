import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import Modal from '../components/Modal';

interface Estudiante {
  id: number;
  nombre: string;
  apellido: string;
}

interface Sesion {
  id: number;
  fecha: string;
  objetivo_sesion: string;
}

interface Partido {
  id: number;
  fecha: string;
  equipo_rival: string;
}

interface Asistencia {
  id: number;
  estudiante_id: number;
  sesion_id?: number | null;
  partido_id?: number | null;
  estado_asistencia: string;
  observaciones: string;
  estudiante: Estudiante;
  sesion_entrenamiento?: Sesion;
  partido?: Partido;
}

const AsistenciasPage: React.FC = () => {
  const [asistencias, setAsistencias] = useState<Asistencia[]>([]);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [sesiones, setSesiones] = useState<Sesion[]>([]);
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    estudiante_id: '',
    tipo_evento: 'sesion', // UI state to decide if sesion or partido
    evento_id: '', // Will map to sesion_id or partido_id depending on tipo_evento
    estado_asistencia: 'Presente',
    observaciones: ''
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [asistenciasRes, estudiantesRes, sesionesRes, partidosRes] = await Promise.all([
        api.get('/deportivo/asistencias'),
        api.get('/academico/estudiantes'),
        api.get('/deportivo/sesiones'),
        api.get('/deportivo/partidos')
      ]);
      setAsistencias(asistenciasRes.data);
      setEstudiantes(estudiantesRes.data);
      setSesiones(sesionesRes.data);
      setPartidos(partidosRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newState = { ...prev, [name]: value };
      if (name === 'tipo_evento') {
        newState.evento_id = ''; // Reset event ID when switching type
      }
      return newState;
    });
  };

  const openModal = (asistencia?: Asistencia) => {
    if (asistencia) {
      setEditingId(asistencia.id);
      setFormData({
        estudiante_id: asistencia.estudiante_id.toString(),
        tipo_evento: asistencia.sesion_id ? 'sesion' : 'partido',
        evento_id: asistencia.sesion_id ? asistencia.sesion_id.toString() : (asistencia.partido_id ? asistencia.partido_id.toString() : ''),
        estado_asistencia: asistencia.estado_asistencia,
        observaciones: asistencia.observaciones || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        estudiante_id: '',
        tipo_evento: 'sesion',
        evento_id: '',
        estado_asistencia: 'Presente',
        observaciones: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.estudiante_id || !formData.evento_id) {
      toast.error('Debes seleccionar un estudiante y un evento');
      return;
    }
    try {
      const payload: any = {
        estudiante_id: Number(formData.estudiante_id),
        estado_asistencia: formData.estado_asistencia,
        observaciones: formData.observaciones
      };

      if (formData.tipo_evento === 'sesion') {
        payload.sesion_id = Number(formData.evento_id);
        payload.partido_id = null;
      } else {
        payload.partido_id = Number(formData.evento_id);
        payload.sesion_id = null;
      }
      
      if (editingId) {
        await api.patch(`/deportivo/asistencias/${editingId}`, payload);
        toast.success('Asistencia actualizada');
      } else {
        await api.post('/deportivo/asistencias', payload);
        toast.success('Asistencia registrada');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error: any) {
      console.error('Error saving asistencia:', error);
      toast.error(error.response?.data?.message || 'Error al guardar la asistencia');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este registro de asistencia?')) {
      try {
        await api.delete(`/deportivo/asistencias/${id}`);
        toast.success('Registro eliminado');
        fetchData();
      } catch (error: any) {
        toast.error('Error al eliminar');
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="page-title" style={{ margin: 0 }}>Asistencias</h2>
        <button className="btn-primary" onClick={() => openModal()}>
          <Plus size={20} />
          Registrar Asistencia
        </button>
      </div>

      <div className="data-table-container">
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Cargando datos...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>Evento</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {asistencias.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>No hay asistencias registradas</td>
                </tr>
              ) : (
                asistencias.map((asist) => {
                  const esSesion = !!asist.sesion_id;
                  const fecha = esSesion ? asist.sesion_entrenamiento?.fecha : asist.partido?.fecha;
                  const detalleEvento = esSesion ? `Entrenamiento: ${asist.sesion_entrenamiento?.objetivo_sesion || 'N/A'}` : `Partido vs ${asist.partido?.equipo_rival || 'N/A'}`;
                  
                  return (
                    <tr key={asist.id}>
                      <td style={{ fontWeight: 500 }}>
                        {asist.estudiante ? `${asist.estudiante.nombre} ${asist.estudiante.apellido}` : 'Desconocido'}
                      </td>
                      <td>
                        <span style={{ 
                          background: esSesion ? '#eef2f6' : '#fff3cd', 
                          color: esSesion ? 'var(--primary-blue)' : '#856404',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          marginRight: '8px'
                        }}>
                          {esSesion ? 'Sesión' : 'Partido'}
                        </span>
                        {detalleEvento}
                      </td>
                      <td>{fecha ? new Date(fecha).toLocaleDateString() : 'N/A'}</td>
                      <td>
                        <span style={{ 
                          background: asist.estado_asistencia === 'Presente' ? '#d4edda' : (asist.estado_asistencia === 'Ausente' ? '#f8d7da' : '#fff3cd'), 
                          color: asist.estado_asistencia === 'Presente' ? '#155724' : (asist.estado_asistencia === 'Ausente' ? '#721c24' : '#856404'),
                          padding: '4px 10px',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}>
                          {asist.estado_asistencia}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="action-btn edit" onClick={() => openModal(asist)} title="Editar">
                            <Edit2 size={18} />
                          </button>
                          <button className="action-btn delete" onClick={() => handleDelete(asist.id)} title="Eliminar">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Editar Asistencia' : 'Registrar Asistencia'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Estudiante</label>
            <select name="estudiante_id" className="form-input" value={formData.estudiante_id} onChange={handleInputChange} required>
              <option value="">-- Seleccionar Estudiante --</option>
              {estudiantes.map(e => (
                <option key={e.id} value={e.id}>{e.nombre} {e.apellido}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Tipo de Evento</label>
              <select name="tipo_evento" className="form-input" value={formData.tipo_evento} onChange={handleInputChange}>
                <option value="sesion">Entrenamiento</option>
                <option value="partido">Partido</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Seleccionar {formData.tipo_evento === 'sesion' ? 'Sesión' : 'Partido'}</label>
              <select name="evento_id" className="form-input" value={formData.evento_id} onChange={handleInputChange} required>
                <option value="">-- Seleccionar --</option>
                {formData.tipo_evento === 'sesion' ? (
                  sesiones.map(s => (
                    <option key={s.id} value={s.id}>{new Date(s.fecha).toLocaleDateString()} - {s.objetivo_sesion}</option>
                  ))
                ) : (
                  partidos.map(p => (
                    <option key={p.id} value={p.id}>{new Date(p.fecha).toLocaleDateString()} - vs {p.equipo_rival}</option>
                  ))
                )}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Estado de Asistencia</label>
            <select name="estado_asistencia" className="form-input" value={formData.estado_asistencia} onChange={handleInputChange}>
              <option value="Presente">Presente</option>
              <option value="Ausente">Ausente</option>
              <option value="Justificado">Justificado</option>
            </select>
          </div>

          <div className="form-group">
            <label>Observaciones (Opcional)</label>
            <textarea name="observaciones" className="form-input" value={formData.observaciones} onChange={handleInputChange} rows={2} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">Guardar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AsistenciasPage;
