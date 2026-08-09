import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import Modal from '../components/Modal';

interface Estudiante {
  id: number;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  fecha_ingreso: string;
  estado: string;
  representante_id?: number;
  categoria_id?: number;
}

const EstudiantesPage: React.FC = () => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [representantes, setRepresentantes] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    fecha_ingreso: new Date().toISOString().split('T')[0],
    representante_id: 1, // Mock
    categoria_id: 1, // Mock
    estado: 'Activo'
  });

  const fetchEstudiantes = async () => {
    try {
      setLoading(true);
      const [estudiantesRes, representantesRes, categoriasRes] = await Promise.all([
        api.get('/academico/estudiantes'),
        api.get('/usuarios?rol_id=1'),
        api.get('/academico/categorias')
      ]);
      setEstudiantes(estudiantesRes.data);
      setRepresentantes(representantesRes.data);
      setCategorias(categoriasRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error al cargar la lista de estudiantes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name.endsWith('_id') ? Number(value) : value });
  };

  const openModal = (estudiante?: Estudiante) => {
    if (estudiante) {
      setEditingId(estudiante.id);
      setFormData({
        nombre: estudiante.nombre,
        apellido: estudiante.apellido,
        fecha_nacimiento: estudiante.fecha_nacimiento.split('T')[0],
        fecha_ingreso: estudiante.fecha_ingreso.split('T')[0],
        representante_id: estudiante.representante_id || 1,
        categoria_id: estudiante.categoria_id || 1,
        estado: estudiante.estado
      });
    } else {
      setEditingId(null);
      setFormData({
        nombre: '',
        apellido: '',
        fecha_nacimiento: '',
        fecha_ingreso: new Date().toISOString().split('T')[0],
        representante_id: 1,
        categoria_id: 1,
        estado: 'Activo'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.patch(`/academico/estudiantes/${editingId}`, formData);
        toast.success('Estudiante actualizado exitosamente');
      } else {
        await api.post('/academico/estudiantes', formData);
        toast.success('Estudiante creado exitosamente');
      }
      setIsModalOpen(false);
      fetchEstudiantes();
    } catch (error: any) {
      console.error('Error saving estudiante:', error);
      toast.error(error.response?.data?.message || 'Error al guardar el estudiante');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este estudiante?')) {
      try {
        await api.delete(`/academico/estudiantes/${id}`);
        toast.success('Estudiante eliminado correctamente');
        fetchEstudiantes();
      } catch (error: any) {
        toast.error('Error al eliminar el estudiante');
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="page-title" style={{ margin: 0 }}>Gestión de Estudiantes</h2>
        <button className="btn-primary" onClick={() => openModal()}>
          <Plus size={20} />
          Nuevo Estudiante
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
                <th>Nombre Completo</th>
                <th>Fecha Nacimiento</th>
                <th>Ingreso</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>No hay estudiantes registrados</td>
                </tr>
              ) : (
                estudiantes.map((est) => (
                  <tr key={est.id}>
                    <td>#{est.id}</td>
                    <td style={{ fontWeight: 500 }}>{est.nombre} {est.apellido}</td>
                    <td>{new Date(est.fecha_nacimiento).toLocaleDateString()}</td>
                    <td>{new Date(est.fecha_ingreso).toLocaleDateString()}</td>
                    <td>
                      <span style={{ 
                        background: est.estado === 'Activo' ? '#d4edda' : '#f8d7da', 
                        color: est.estado === 'Activo' ? '#155724' : '#721c24',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        {est.estado}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="action-btn edit" onClick={() => openModal(est)} title="Editar">
                          <Edit2 size={18} />
                        </button>
                        <button className="action-btn delete" onClick={() => handleDelete(est.id)} title="Eliminar">
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

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingId ? 'Editar Estudiante' : 'Nuevo Estudiante'}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Nombre</label>
              <input type="text" name="nombre" className="form-input" value={formData.nombre} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Apellido</label>
              <input type="text" name="apellido" className="form-input" value={formData.apellido} onChange={handleInputChange} required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Fecha de Nacimiento</label>
              <input type="date" name="fecha_nacimiento" className="form-input" value={formData.fecha_nacimiento} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Fecha de Ingreso</label>
              <input type="date" name="fecha_ingreso" className="form-input" value={formData.fecha_ingreso} onChange={handleInputChange} required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Representante</label>
              <select name="representante_id" className="form-input" value={formData.representante_id} onChange={handleInputChange} required>
                <option value="">Seleccione un representante</option>
                {representantes.map(rep => (
                  <option key={rep.id} value={rep.id}>
                    {rep.nombre} {rep.apellido} ({rep.correo})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Categoría</label>
              <select name="categoria_id" className="form-input" value={formData.categoria_id} onChange={handleInputChange} required>
                <option value="">Seleccione una categoría</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
                {categorias.length === 0 && <option value="1">Categoría por Defecto (Sub-10)</option>}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Estado</label>
            <select name="estado" className="form-input" value={formData.estado} onChange={handleInputChange}>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="Lesionado">Lesionado</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontWeight: 600 }}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              {editingId ? 'Guardar Cambios' : 'Registrar Estudiante'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EstudiantesPage;
