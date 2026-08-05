import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import Modal from '../components/Modal';

interface Categoria {
  id: number;
  nombre: string;
}

interface Partido {
  id: number;
  categoria_id: number;
  equipo_rival: string;
  fecha: string;
  hora: string;
  lugar_cancha: string;
  goles_nuestros?: number;
  goles_rival?: number;
  estado_partido: string;
  categoria: Categoria;
}

const PartidosPage: React.FC = () => {
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    categoria_id: '',
    equipo_rival: '',
    fecha: '',
    hora: '',
    lugar_cancha: '',
    goles_nuestros: '',
    goles_rival: '',
    estado_partido: 'Programado'
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [partidosRes, categoriasRes] = await Promise.all([
        api.get('/deportivo/partidos'),
        api.get('/academico/categorias')
      ]);
      setPartidos(partidosRes.data);
      setCategorias(categoriasRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error al cargar partidos');
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

  const openModal = (partido?: Partido) => {
    if (partido) {
      setEditingId(partido.id);
      setFormData({
        categoria_id: partido.categoria_id.toString(),
        equipo_rival: partido.equipo_rival,
        fecha: new Date(partido.fecha).toISOString().split('T')[0],
        hora: partido.hora,
        lugar_cancha: partido.lugar_cancha || '',
        goles_nuestros: partido.goles_nuestros?.toString() || '',
        goles_rival: partido.goles_rival?.toString() || '',
        estado_partido: partido.estado_partido
      });
    } else {
      setEditingId(null);
      setFormData({
        categoria_id: '',
        equipo_rival: '',
        fecha: '',
        hora: '',
        lugar_cancha: '',
        goles_nuestros: '',
        goles_rival: '',
        estado_partido: 'Programado'
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
      const payload: any = {
        ...formData,
        categoria_id: Number(formData.categoria_id),
        goles_nuestros: formData.goles_nuestros === '' ? null : Number(formData.goles_nuestros),
        goles_rival: formData.goles_rival === '' ? null : Number(formData.goles_rival)
      };
      
      if (editingId) {
        await api.patch(`/deportivo/partidos/${editingId}`, payload);
        toast.success('Partido actualizado exitosamente');
      } else {
        await api.post('/deportivo/partidos', payload);
        toast.success('Partido creado exitosamente');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error: any) {
      console.error('Error saving partido:', error);
      toast.error(error.response?.data?.message || 'Error al guardar el partido');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este partido?')) {
      try {
        await api.delete(`/deportivo/partidos/${id}`);
        toast.success('Partido eliminado');
        fetchData();
      } catch (error: any) {
        toast.error('Error al eliminar');
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="page-title" style={{ margin: 0 }}>Partidos</h2>
        <button className="btn-primary" onClick={() => openModal()}>
          <Plus size={20} />
          Nuevo Partido
        </button>
      </div>

      <div className="data-table-container">
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Cargando datos...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Encuentro</th>
                <th>Categoría</th>
                <th>Resultado</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {partidos.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>No hay partidos registrados</td>
                </tr>
              ) : (
                partidos.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{new Date(p.fecha).toLocaleDateString()}</div>
                      <div style={{ fontSize: '0.85rem', color: '#666' }}>{p.hora} | {p.lugar_cancha}</div>
                    </td>
                    <td><strong>Academia Pro</strong> vs {p.equipo_rival}</td>
                    <td>{p.categoria ? p.categoria.nombre : 'N/A'}</td>
                    <td style={{ fontWeight: 'bold' }}>
                      {p.goles_nuestros !== null && p.goles_rival !== null ? `${p.goles_nuestros} - ${p.goles_rival}` : '-'}
                    </td>
                    <td>
                      <span style={{ 
                        background: p.estado_partido === 'Jugado' ? '#d4edda' : (p.estado_partido === 'Suspendido' ? '#f8d7da' : '#fff3cd'), 
                        color: p.estado_partido === 'Jugado' ? '#155724' : (p.estado_partido === 'Suspendido' ? '#721c24' : '#856404'),
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        {p.estado_partido}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="action-btn edit" onClick={() => openModal(p)} title="Editar">
                          <Edit2 size={18} />
                        </button>
                        <button className="action-btn delete" onClick={() => handleDelete(p.id)} title="Eliminar">
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Editar Partido' : 'Nuevo Partido'}>
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

          <div className="form-group">
            <label>Equipo Rival</label>
            <input type="text" name="equipo_rival" className="form-input" value={formData.equipo_rival} onChange={handleInputChange} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Fecha</label>
              <input type="date" name="fecha" className="form-input" value={formData.fecha} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Hora</label>
              <input type="time" name="hora" className="form-input" value={formData.hora} onChange={handleInputChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Lugar</label>
            <input type="text" name="lugar_cancha" className="form-input" value={formData.lugar_cancha} onChange={handleInputChange} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Goles Nuestros</label>
              <input type="number" name="goles_nuestros" className="form-input" value={formData.goles_nuestros} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Goles Rival</label>
              <input type="number" name="goles_rival" className="form-input" value={formData.goles_rival} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Estado</label>
              <select name="estado_partido" className="form-input" value={formData.estado_partido} onChange={handleInputChange}>
                <option value="Programado">Programado</option>
                <option value="Jugado">Jugado</option>
                <option value="Suspendido">Suspendido</option>
              </select>
            </div>
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

export default PartidosPage;
