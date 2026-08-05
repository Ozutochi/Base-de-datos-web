import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import Modal from '../components/Modal';

interface Categoria {
  id: number;
  nombre: string;
  tipo_modalidad: string;
  edad_minima: number;
  edad_maxima: number;
  estado: string;
}

const CategoriasPage: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    nombre: '',
    tipo_modalidad: 'Fútbol Base',
    edad_minima: 6,
    edad_maxima: 8,
    estado: 'Activo'
  });

  const fetchCategorias = async () => {
    try {
      setLoading(true);
      const response = await api.get('/academico/categorias');
      setCategorias(response.data);
    } catch (error) {
      console.error('Error fetching categorias:', error);
      toast.error('Error al cargar la lista de categorías');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: name.includes('edad') ? Number(value) : value 
    });
  };

  const openModal = (categoria?: Categoria) => {
    if (categoria) {
      setEditingId(categoria.id);
      setFormData({
        nombre: categoria.nombre,
        tipo_modalidad: categoria.tipo_modalidad,
        edad_minima: categoria.edad_minima,
        edad_maxima: categoria.edad_maxima,
        estado: categoria.estado
      });
    } else {
      setEditingId(null);
      setFormData({
        nombre: '',
        tipo_modalidad: 'Fútbol Base',
        edad_minima: 6,
        edad_maxima: 8,
        estado: 'Activo'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.patch(`/academico/categorias/${editingId}`, formData);
        toast.success('Categoría actualizada exitosamente');
      } else {
        await api.post('/academico/categorias', formData);
        toast.success('Categoría creada exitosamente');
      }
      setIsModalOpen(false);
      fetchCategorias();
    } catch (error: any) {
      console.error('Error saving categoria:', error);
      toast.error(error.response?.data?.message || 'Error al guardar la categoría');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar esta categoría? Si tiene estudiantes asignados, la acción fallará por seguridad.')) {
      try {
        await api.delete(`/academico/categorias/${id}`);
        toast.success('Categoría eliminada correctamente');
        fetchCategorias();
      } catch (error: any) {
        toast.error('Error al eliminar la categoría. Probablemente tenga estudiantes asignados.');
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="page-title" style={{ margin: 0 }}>Gestión de Categorías</h2>
        <button className="btn-primary" onClick={() => openModal()}>
          <Plus size={20} />
          Nueva Categoría
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
                <th>Nombre</th>
                <th>Modalidad</th>
                <th>Rango de Edad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>No hay categorías registradas</td>
                </tr>
              ) : (
                categorias.map((cat) => (
                  <tr key={cat.id}>
                    <td>#{cat.id}</td>
                    <td style={{ fontWeight: 500 }}>{cat.nombre}</td>
                    <td>{cat.tipo_modalidad}</td>
                    <td>{cat.edad_minima} a {cat.edad_maxima} años</td>
                    <td>
                      <span style={{ 
                        background: cat.estado === 'Activo' ? '#d4edda' : '#f8d7da', 
                        color: cat.estado === 'Activo' ? '#155724' : '#721c24',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        {cat.estado}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="action-btn edit" onClick={() => openModal(cat)} title="Editar">
                          <Edit2 size={18} />
                        </button>
                        <button className="action-btn delete" onClick={() => handleDelete(cat.id)} title="Eliminar">
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
        title={editingId ? 'Editar Categoría' : 'Nueva Categoría'}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre de la Categoría (Ej. Sub-12)</label>
            <input type="text" name="nombre" className="form-input" value={formData.nombre} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label>Modalidad</label>
            <select name="tipo_modalidad" className="form-input" value={formData.tipo_modalidad} onChange={handleInputChange} required>
              <option value="Fútbol Base">Fútbol Base</option>
              <option value="Juvenil">Juvenil</option>
              <option value="Femenino">Femenino</option>
              <option value="Amateur">Amateur</option>
              <option value="Profesional">Profesional</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Edad Mínima</label>
              <input type="number" name="edad_minima" className="form-input" value={formData.edad_minima} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Edad Máxima</label>
              <input type="number" name="edad_maxima" className="form-input" value={formData.edad_maxima} onChange={handleInputChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Estado</label>
            <select name="estado" className="form-input" value={formData.estado} onChange={handleInputChange}>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontWeight: 600 }}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              {editingId ? 'Guardar Cambios' : 'Registrar Categoría'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CategoriasPage;
