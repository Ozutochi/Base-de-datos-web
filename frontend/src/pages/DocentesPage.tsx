import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import Modal from '../components/Modal';

interface Docente {
  id: number;
  nombre: string;
  apellido: string;
  cedula: string;
  correo: string;
  telefono: string;
  estado: string;
}

const DocentesPage: React.FC = () => {
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    correo: '',
    telefono: '',
    password_hash: '123456', // Contraseña por defecto temporal
    rol_id: 2, // 2 = Entrenador/Docente
    estado: 'Activo'
  });

  const fetchDocentes = async () => {
    try {
      setLoading(true);
      // Fetch usuarios con rol_id = 2 (Entrenador)
      const response = await api.get('/usuarios?rol_id=2');
      setDocentes(response.data);
    } catch (error) {
      console.error('Error fetching docentes:', error);
      toast.error('Error al cargar la lista de docentes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocentes();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openModal = (docente?: Docente) => {
    if (docente) {
      setEditingId(docente.id);
      setFormData({
        nombre: docente.nombre,
        apellido: docente.apellido,
        cedula: docente.cedula,
        correo: docente.correo,
        telefono: docente.telefono || '',
        password_hash: '123456',
        rol_id: 2,
        estado: docente.estado
      });
    } else {
      setEditingId(null);
      setFormData({
        nombre: '',
        apellido: '',
        cedula: '',
        correo: '',
        telefono: '',
        password_hash: '123456', // Default password
        rol_id: 2,
        estado: 'Activo'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.patch(`/usuarios/${editingId}`, formData);
        toast.success('Docente actualizado exitosamente');
      } else {
        await api.post('/usuarios', formData);
        toast.success('Docente creado exitosamente');
      }
      setIsModalOpen(false);
      fetchDocentes();
    } catch (error: any) {
      console.error('Error saving docente:', error);
      toast.error(error.response?.data?.message || 'Error al guardar el docente');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar a este docente/entrenador?')) {
      try {
        await api.delete(`/usuarios/${id}`);
        toast.success('Docente eliminado correctamente');
        fetchDocentes();
      } catch (error: any) {
        toast.error('Error al eliminar el docente. Puede estar asignado a alguna categoría.');
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="page-title" style={{ margin: 0 }}>Gestión de Docentes/Entrenadores</h2>
        <button className="btn-primary" onClick={() => openModal()}>
          <Plus size={20} />
          Nuevo Docente
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
                <th>Cédula</th>
                <th>Nombre Completo</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {docentes.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>No hay docentes registrados</td>
                </tr>
              ) : (
                docentes.map((doc) => (
                  <tr key={doc.id}>
                    <td>#{doc.id}</td>
                    <td>{doc.cedula}</td>
                    <td style={{ fontWeight: 500 }}>{doc.nombre} {doc.apellido}</td>
                    <td>{doc.correo}</td>
                    <td>{doc.telefono || 'N/A'}</td>
                    <td>
                      <span style={{ 
                        background: doc.estado === 'Activo' ? '#d4edda' : '#f8d7da', 
                        color: doc.estado === 'Activo' ? '#155724' : '#721c24',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        {doc.estado}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="action-btn edit" onClick={() => openModal(doc)} title="Editar">
                          <Edit2 size={18} />
                        </button>
                        <button className="action-btn delete" onClick={() => handleDelete(doc.id)} title="Eliminar">
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
        title={editingId ? 'Editar Docente' : 'Nuevo Docente'}
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
              <label>Cédula</label>
              <input type="text" name="cedula" className="form-input" value={formData.cedula} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input type="text" name="telefono" className="form-input" value={formData.telefono} onChange={handleInputChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Correo Electrónico</label>
            <input type="email" name="correo" className="form-input" value={formData.correo} onChange={handleInputChange} required />
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
              {editingId ? 'Guardar Cambios' : 'Registrar Docente'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DocentesPage;
