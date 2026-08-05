import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import Modal from '../components/Modal';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
}

interface Categoria {
  id: number;
  nombre: string;
}

interface Asignacion {
  id: number;
  usuario_id: number;
  categoria_id: number;
  fecha_asignacion: string;
  usuario: Usuario;
  categoria: Categoria;
}

const AsignacionPersonalPage: React.FC = () => {
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);
  const [docentes, setDocentes] = useState<Usuario[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    usuario_id: '',
    categoria_id: '',
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [asignacionesRes, docentesRes, categoriasRes] = await Promise.all([
        api.get('/academico/personal'),
        api.get('/usuarios?rol_id=2'), // Docentes/Entrenadores
        api.get('/academico/categorias')
      ]);
      setAsignaciones(asignacionesRes.data);
      setDocentes(docentesRes.data);
      setCategorias(categoriasRes.data);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openModal = () => {
    setFormData({ usuario_id: '', categoria_id: '' });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.usuario_id || !formData.categoria_id) {
      toast.error('Por favor, selecciona un entrenador y una categoría');
      return;
    }
    
    try {
      await api.post('/academico/personal', {
        usuario_id: Number(formData.usuario_id),
        categoria_id: Number(formData.categoria_id)
      });
      toast.success('Asignación creada exitosamente');
      setIsModalOpen(false);
      fetchData();
    } catch (error: any) {
      console.error('Error saving asignacion:', error);
      toast.error(error.response?.data?.message || 'Error al guardar la asignación');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar esta asignación?')) {
      try {
        await api.delete(`/academico/personal/${id}`);
        toast.success('Asignación eliminada correctamente');
        fetchData();
      } catch (error: any) {
        toast.error('Error al eliminar la asignación');
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 className="page-title" style={{ margin: 0 }}>Asignación de Personal</h2>
          <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Vincula entrenadores con sus respectivas categorías.</p>
        </div>
        <button className="btn-primary" onClick={openModal}>
          <Plus size={20} />
          Asignar Entrenador
        </button>
      </div>

      <div className="data-table-container">
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Cargando datos...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Entrenador (Docente)</th>
                <th>Categoría Asignada</th>
                <th>Fecha de Asignación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {asignaciones.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>No hay asignaciones registradas</td>
                </tr>
              ) : (
                asignaciones.map((asig) => (
                  <tr key={asig.id}>
                    <td>#{asig.id}</td>
                    <td style={{ fontWeight: 500 }}>
                      {asig.usuario ? `${asig.usuario.nombre} ${asig.usuario.apellido}` : 'Desconocido'}
                    </td>
                    <td>
                      <span style={{ 
                        background: '#eef2f6', 
                        color: 'var(--primary-blue)',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        {asig.categoria ? asig.categoria.nombre : 'Desconocida'}
                      </span>
                    </td>
                    <td>{new Date(asig.fecha_asignacion).toLocaleDateString()}</td>
                    <td>
                      <button className="action-btn delete" onClick={() => handleDelete(asig.id)} title="Eliminar Asignación">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Asignar Entrenador a Categoría"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Seleccionar Entrenador</label>
            <select name="usuario_id" className="form-input" value={formData.usuario_id} onChange={handleInputChange} required>
              <option value="">-- Elige un Entrenador --</option>
              {docentes.map(d => (
                <option key={d.id} value={d.id}>{d.nombre} {d.apellido}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Seleccionar Categoría</label>
            <select name="categoria_id" className="form-input" value={formData.categoria_id} onChange={handleInputChange} required>
              <option value="">-- Elige una Categoría --</option>
              {categorias.map(c => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontWeight: 600 }}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              Crear Asignación
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AsignacionPersonalPage;
