import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import Modal from '../components/Modal';

interface Categoria {
  id: number;
  nombre: string;
}

interface Tarifa {
  id: number;
  categoria_id: number;
  monto: string;
  moneda: string;
  fecha_vigencia: string;
  categoria: Categoria;
}

const TarifasPage: React.FC = () => {
  const [tarifas, setTarifas] = useState<Tarifa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    categoria_id: '',
    monto: '',
    moneda: 'USD',
    fecha_vigencia: ''
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tarifasRes, categoriasRes] = await Promise.all([
        api.get('/financiero/tarifas'),
        api.get('/academico/categorias')
      ]);
      setTarifas(tarifasRes.data);
      setCategorias(categoriasRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error al cargar tarifas');
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

  const openModal = (tarifa?: Tarifa) => {
    if (tarifa) {
      setEditingId(tarifa.id);
      setFormData({
        categoria_id: tarifa.categoria_id.toString(),
        monto: tarifa.monto.toString(),
        moneda: tarifa.moneda,
        fecha_vigencia: new Date(tarifa.fecha_vigencia).toISOString().split('T')[0]
      });
    } else {
      setEditingId(null);
      setFormData({
        categoria_id: '',
        monto: '',
        moneda: 'USD',
        fecha_vigencia: new Date().toISOString().split('T')[0]
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
        categoria_id: Number(formData.categoria_id),
        monto: Number(formData.monto)
      };
      
      if (editingId) {
        await api.patch(`/financiero/tarifas/${editingId}`, payload);
        toast.success('Tarifa actualizada exitosamente');
      } else {
        await api.post('/financiero/tarifas', payload);
        toast.success('Tarifa creada exitosamente');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error: any) {
      console.error('Error saving tarifa:', error);
      toast.error(error.response?.data?.message || 'Error al guardar la tarifa');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar esta tarifa?')) {
      try {
        await api.delete(`/financiero/tarifas/${id}`);
        toast.success('Tarifa eliminada');
        fetchData();
      } catch (error: any) {
        toast.error('Error al eliminar');
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="page-title" style={{ margin: 0 }}>Tarifas Base</h2>
        <button className="btn-primary" onClick={() => openModal()}>
          <Plus size={20} />
          Nueva Tarifa
        </button>
      </div>

      <div className="data-table-container">
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Cargando datos...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Categoría</th>
                <th>Vigencia</th>
                <th>Monto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tarifas.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>No hay tarifas registradas</td>
                </tr>
              ) : (
                tarifas.map((t) => (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 500 }}>{t.categoria ? t.categoria.nombre : 'N/A'}</td>
                    <td>{new Date(t.fecha_vigencia).toLocaleDateString()}</td>
                    <td style={{ fontWeight: 'bold', color: 'var(--primary-blue)' }}>{t.monto} {t.moneda}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="action-btn edit" onClick={() => openModal(t)} title="Editar">
                          <Edit2 size={18} />
                        </button>
                        <button className="action-btn delete" onClick={() => handleDelete(t.id)} title="Eliminar">
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Editar Tarifa' : 'Nueva Tarifa'}>
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Fecha de Vigencia</label>
              <input type="date" name="fecha_vigencia" className="form-input" value={formData.fecha_vigencia} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Monto</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="number" step="0.01" name="monto" className="form-input" value={formData.monto} onChange={handleInputChange} required />
                <select name="moneda" className="form-input" value={formData.moneda} onChange={handleInputChange} style={{ width: '80px' }}>
                  <option value="USD">USD</option>
                  <option value="VES">VES</option>
                </select>
              </div>
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

export default TarifasPage;
