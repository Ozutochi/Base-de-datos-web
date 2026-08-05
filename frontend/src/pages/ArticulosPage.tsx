import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import Modal from '../components/Modal';

interface Categoria {
  id: number;
  nombre: string;
}

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
}

interface Articulo {
  id: number;
  tipo_articulo: string;
  nombre_articulo: string;
  cantidad_disponible: number;
  estado_fisico: string;
  fecha_registro: string;
  categoria_id: number;
  responsable_id: number;
  categoria: Categoria;
  responsable: Usuario;
}

const ArticulosPage: React.FC = () => {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [entrenadores, setEntrenadores] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    tipo_articulo: 'Balon',
    nombre_articulo: '',
    cantidad_disponible: '',
    estado_fisico: 'Bueno',
    fecha_registro: '',
    categoria_id: '',
    responsable_id: ''
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [articulosRes, categoriasRes, entrenadoresRes] = await Promise.all([
        api.get('/inventario/articulos'),
        api.get('/academico/categorias'),
        api.get('/usuarios?rol_id=2') // Entrenadores como responsables
      ]);
      setArticulos(articulosRes.data);
      setCategorias(categoriasRes.data);
      setEntrenadores(entrenadoresRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error al cargar artículos');
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

  const openModal = (articulo?: Articulo) => {
    if (articulo) {
      setEditingId(articulo.id);
      setFormData({
        tipo_articulo: articulo.tipo_articulo,
        nombre_articulo: articulo.nombre_articulo,
        cantidad_disponible: articulo.cantidad_disponible.toString(),
        estado_fisico: articulo.estado_fisico,
        fecha_registro: new Date(articulo.fecha_registro).toISOString().split('T')[0],
        categoria_id: articulo.categoria_id?.toString() || '',
        responsable_id: articulo.responsable_id?.toString() || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        tipo_articulo: 'Balon',
        nombre_articulo: '',
        cantidad_disponible: '1',
        estado_fisico: 'Bueno',
        fecha_registro: new Date().toISOString().split('T')[0],
        categoria_id: '',
        responsable_id: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        ...formData,
        cantidad_disponible: Number(formData.cantidad_disponible),
        categoria_id: formData.categoria_id ? Number(formData.categoria_id) : null,
        responsable_id: formData.responsable_id ? Number(formData.responsable_id) : null
      };
      
      if (editingId) {
        await api.patch(`/inventario/articulos/${editingId}`, payload);
        toast.success('Artículo actualizado');
      } else {
        await api.post('/inventario/articulos', payload);
        toast.success('Artículo registrado');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error: any) {
      console.error('Error saving:', error);
      toast.error(error.response?.data?.message || 'Error al guardar');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este artículo?')) {
      try {
        await api.delete(`/inventario/articulos/${id}`);
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
        <h2 className="page-title" style={{ margin: 0 }}>Almacén y Equipamiento</h2>
        <button className="btn-primary" onClick={() => openModal()}>
          <Plus size={20} />
          Registrar Artículo
        </button>
      </div>

      <div className="data-table-container">
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Cargando datos...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Artículo</th>
                <th>Stock</th>
                <th>Estado Físico</th>
                <th>Categoría / Responsable</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {articulos.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>No hay artículos registrados</td>
                </tr>
              ) : (
                articulos.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{a.nombre_articulo}</div>
                      <div style={{ fontSize: '0.85rem', color: '#666' }}>Tipo: {a.tipo_articulo}</div>
                    </td>
                    <td style={{ fontWeight: 'bold' }}>{a.cantidad_disponible} unds.</td>
                    <td>
                      <span style={{ 
                        background: a.estado_fisico === 'Bueno' ? '#d4edda' : (a.estado_fisico === 'Malo' ? '#f8d7da' : '#fff3cd'), 
                        color: a.estado_fisico === 'Bueno' ? '#155724' : (a.estado_fisico === 'Malo' ? '#721c24' : '#856404'),
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        {a.estado_fisico}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.85rem' }}>Cat: {a.categoria ? a.categoria.nombre : 'General'}</div>
                      <div style={{ fontSize: '0.85rem' }}>Resp: {a.responsable ? `${a.responsable.nombre} ${a.responsable.apellido}` : 'N/A'}</div>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Editar Artículo' : 'Registrar Artículo'}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Tipo</label>
              <select name="tipo_articulo" className="form-input" value={formData.tipo_articulo} onChange={handleInputChange}>
                <option value="Balon">Balón</option>
                <option value="Cono">Cono</option>
                <option value="Peto">Peto</option>
                <option value="Uniforme">Uniforme</option>
                <option value="Medicina">Botiquín</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className="form-group">
              <label>Nombre Específico</label>
              <input type="text" name="nombre_articulo" className="form-input" value={formData.nombre_articulo} onChange={handleInputChange} required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Cantidad</label>
              <input type="number" name="cantidad_disponible" className="form-input" value={formData.cantidad_disponible} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Estado Físico</label>
              <select name="estado_fisico" className="form-input" value={formData.estado_fisico} onChange={handleInputChange}>
                <option value="Bueno">Bueno</option>
                <option value="Regular">Regular</option>
                <option value="Malo">Malo</option>
              </select>
            </div>
            <div className="form-group">
              <label>Fecha Ingreso</label>
              <input type="date" name="fecha_registro" className="form-input" value={formData.fecha_registro} onChange={handleInputChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Categoría Asignada (Opcional)</label>
            <select name="categoria_id" className="form-input" value={formData.categoria_id} onChange={handleInputChange}>
              <option value="">-- General --</option>
              {categorias.map(c => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Responsable de Cuidarlo (Opcional)</label>
            <select name="responsable_id" className="form-input" value={formData.responsable_id} onChange={handleInputChange}>
              <option value="">-- Sin Responsable --</option>
              {entrenadores.map(e => (
                <option key={e.id} value={e.id}>{e.nombre} {e.apellido}</option>
              ))}
            </select>
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

export default ArticulosPage;
