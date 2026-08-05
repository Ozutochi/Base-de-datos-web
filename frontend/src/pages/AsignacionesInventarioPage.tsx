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

interface Articulo {
  id: number;
  nombre_articulo: string;
  tipo_articulo: string;
}

interface Asignacion {
  id: number;
  estudiante_id: number;
  inventario_id: number;
  fecha_asignacion: string;
  fecha_devolucion: string | null;
  estado: string;
  estudiante: Estudiante;
  inventario: Articulo;
}

const AsignacionesInventarioPage: React.FC = () => {
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    estudiante_id: '',
    inventario_id: '',
    fecha_asignacion: '',
    fecha_devolucion: '',
    estado: 'Asignado'
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [asigRes, estRes, artRes] = await Promise.all([
        api.get('/inventario/asignaciones'),
        api.get('/academico/estudiantes'),
        api.get('/inventario/articulos')
      ]);
      setAsignaciones(asigRes.data);
      setEstudiantes(estRes.data);
      setArticulos(artRes.data);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openModal = (asignacion?: Asignacion) => {
    if (asignacion) {
      setEditingId(asignacion.id);
      setFormData({
        estudiante_id: asignacion.estudiante_id.toString(),
        inventario_id: asignacion.inventario_id.toString(),
        fecha_asignacion: new Date(asignacion.fecha_asignacion).toISOString().split('T')[0],
        fecha_devolucion: asignacion.fecha_devolucion ? new Date(asignacion.fecha_devolucion).toISOString().split('T')[0] : '',
        estado: asignacion.estado
      });
    } else {
      setEditingId(null);
      setFormData({
        estudiante_id: '',
        inventario_id: '',
        fecha_asignacion: new Date().toISOString().split('T')[0],
        fecha_devolucion: '',
        estado: 'Asignado'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        ...formData,
        estudiante_id: Number(formData.estudiante_id),
        inventario_id: Number(formData.inventario_id),
        fecha_devolucion: formData.fecha_devolucion ? formData.fecha_devolucion : null
      };
      
      if (editingId) {
        await api.patch(`/inventario/asignaciones/${editingId}`, payload);
        toast.success('Asignación actualizada');
      } else {
        await api.post('/inventario/asignaciones', payload);
        toast.success('Equipamiento asignado');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error: any) {
      console.error('Error saving:', error);
      toast.error(error.response?.data?.message || 'Error al guardar');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este registro?')) {
      try {
        await api.delete(`/inventario/asignaciones/${id}`);
        toast.success('Eliminado');
        fetchData();
      } catch (error: any) {
        toast.error('Error al eliminar');
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="page-title" style={{ margin: 0 }}>Equipamiento Asignado</h2>
        <button className="btn-primary" onClick={() => openModal()}>
          <Plus size={20} />
          Prestar Equipo
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
                <th>Artículo Prestado</th>
                <th>Fecha Préstamo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {asignaciones.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>No hay préstamos registrados</td>
                </tr>
              ) : (
                asignaciones.map((a) => (
                  <tr key={a.id}>
                    <td style={{ fontWeight: 500 }}>{a.estudiante ? `${a.estudiante.nombre} ${a.estudiante.apellido}` : 'N/A'}</td>
                    <td>{a.inventario ? `${a.inventario.nombre_articulo} (${a.inventario.tipo_articulo})` : 'N/A'}</td>
                    <td>
                      <div>{new Date(a.fecha_asignacion).toLocaleDateString()}</div>
                      {a.fecha_devolucion && <div style={{ fontSize: '0.85rem', color: '#666' }}>Devuelto: {new Date(a.fecha_devolucion).toLocaleDateString()}</div>}
                    </td>
                    <td>
                      <span style={{ 
                        background: a.estado === 'Devuelto' ? '#d4edda' : '#fff3cd', 
                        color: a.estado === 'Devuelto' ? '#155724' : '#856404',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        {a.estado}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="action-btn edit" onClick={() => openModal(a)} title="Editar">
                          <Edit2 size={18} />
                        </button>
                        <button className="action-btn delete" onClick={() => handleDelete(a.id)} title="Eliminar">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Editar Préstamo' : 'Prestar Equipo'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Estudiante</label>
            <select name="estudiante_id" className="form-input" value={formData.estudiante_id} onChange={handleInputChange} required>
              <option value="">-- Seleccionar --</option>
              {estudiantes.map(e => (
                <option key={e.id} value={e.id}>{e.nombre} {e.apellido}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Artículo</label>
            <select name="inventario_id" className="form-input" value={formData.inventario_id} onChange={handleInputChange} required>
              <option value="">-- Seleccionar --</option>
              {articulos.map(a => (
                <option key={a.id} value={a.id}>{a.nombre_articulo} ({a.tipo_articulo})</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Fecha de Asignación</label>
              <input type="date" name="fecha_asignacion" className="form-input" value={formData.fecha_asignacion} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Estado</label>
              <select name="estado" className="form-input" value={formData.estado} onChange={handleInputChange}>
                <option value="Asignado">Asignado</option>
                <option value="Devuelto">Devuelto</option>
              </select>
            </div>
          </div>

          {formData.estado === 'Devuelto' && (
            <div className="form-group">
              <label>Fecha de Devolución</label>
              <input type="date" name="fecha_devolucion" className="form-input" value={formData.fecha_devolucion} onChange={handleInputChange} required />
            </div>
          )}

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

export default AsignacionesInventarioPage;
