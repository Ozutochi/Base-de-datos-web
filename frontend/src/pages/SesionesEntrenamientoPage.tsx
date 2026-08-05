import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import Modal from '../components/Modal';

interface Categoria {
  id: number;
  nombre: string;
}

interface Sesion {
  id: number;
  categoria_id: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  lugar_cancha: string;
  categoria: Categoria;
}

const SesionesEntrenamientoPage: React.FC = () => {
  const [sesiones, setSesiones] = useState<Sesion[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    categoria_id: '',
    fecha: '',
    hora_inicio: '',
    hora_fin: '',
    lugar_cancha: ''
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [sesionesRes, categoriasRes] = await Promise.all([
        api.get('/deportivo/sesiones'),
        api.get('/academico/categorias')
      ]);
      setSesiones(sesionesRes.data);
      setCategorias(categoriasRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error al cargar entrenamientos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openModal = (sesion?: Sesion) => {
    if (sesion) {
      setEditingId(sesion.id);
      setFormData({
        categoria_id: sesion.categoria_id.toString(),
        fecha: new Date(sesion.fecha).toISOString().split('T')[0],
        hora_inicio: sesion.hora_inicio,
        hora_fin: sesion.hora_fin,
        lugar_cancha: sesion.lugar_cancha || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        categoria_id: '',
        fecha: '',
        hora_inicio: '',
        hora_fin: '',
        lugar_cancha: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoria_id) {
      toast.error('Debes seleccionar una categoría');
      return;
    }
    try {
      const payload = {
        ...formData,
        categoria_id: Number(formData.categoria_id)
      };
      
      if (editingId) {
        await api.patch(`/deportivo/sesiones/${editingId}`, payload);
        toast.success('Sesión actualizada exitosamente');
      } else {
        await api.post('/deportivo/sesiones', payload);
        toast.success('Sesión creada exitosamente');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error: any) {
      console.error('Error saving sesion:', error);
      toast.error(error.response?.data?.message || 'Error al guardar la sesión');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este entrenamiento?')) {
      try {
        await api.delete(`/deportivo/sesiones/${id}`);
        toast.success('Entrenamiento eliminado');
        fetchData();
      } catch (error: any) {
        toast.error('Error al eliminar');
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="page-title" style={{ margin: 0 }}>Entrenamientos</h2>
        <button className="btn-primary" onClick={() => openModal()}>
          <Plus size={20} />
          Nuevo Entrenamiento
        </button>
      </div>

      <div className="data-table-container">
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Cargando datos...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Fecha y Hora</th>
                <th>Categoría</th>
                <th>Lugar</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sesiones.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>No hay entrenamientos registrados</td>
                </tr>
              ) : (
                sesiones.map((sesion) => (
                  <tr key={sesion.id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{new Date(sesion.fecha).toLocaleDateString()}</div>
                      <div style={{ fontSize: '0.85rem', color: '#666' }}>{sesion.hora_inicio} - {sesion.hora_fin}</div>
                    </td>
                    <td>{sesion.categoria ? sesion.categoria.nombre : 'N/A'}</td>
                    <td>{sesion.lugar_cancha}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="action-btn edit" onClick={() => openModal(sesion)} title="Editar">
                          <Edit2 size={18} />
                        </button>
                        <button className="action-btn delete" onClick={() => handleDelete(sesion.id)} title="Eliminar">
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Editar Entrenamiento' : 'Nuevo Entrenamiento'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Categoría</label>
            <select name="categoria_id" className="form-input" value={formData.categoria_id} onChange={handleInputChange} required>
              <option value="">-- Seleccionar Categoría --</option>
              {categorias.map(c => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Fecha</label>
              <input type="date" name="fecha" className="form-input" value={formData.fecha} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Hora Inicio</label>
              <input type="time" name="hora_inicio" className="form-input" value={formData.hora_inicio} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Hora Fin</label>
              <input type="time" name="hora_fin" className="form-input" value={formData.hora_fin} onChange={handleInputChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Lugar (Cancha)</label>
            <input type="text" name="lugar_cancha" className="form-input" value={formData.lugar_cancha} onChange={handleInputChange} required />
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

export default SesionesEntrenamientoPage;
