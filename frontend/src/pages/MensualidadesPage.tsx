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

interface Tarifa {
  id: number;
  monto: string;
  moneda: string;
  fecha_vigencia: string;
}

interface Mensualidad {
  id: number;
  estudiante_id: number;
  tarifa_id: number;
  mes: number;
  anio: number;
  monto_adeudado: string;
  moneda: string;
  estado: string;
  estudiante: Estudiante;
  tarifa: Tarifa;
}

const MensualidadesPage: React.FC = () => {
  const [mensualidades, setMensualidades] = useState<Mensualidad[]>([]);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [tarifas, setTarifas] = useState<Tarifa[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    estudiante_id: '',
    tarifa_id: '',
    mes: new Date().getMonth() + 1,
    anio: new Date().getFullYear(),
    monto_adeudado: '',
    moneda: 'USD',
    estado: 'Pendiente'
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [mensualidadesRes, estudiantesRes, tarifasRes] = await Promise.all([
        api.get('/financiero/mensualidades'),
        api.get('/academico/estudiantes'),
        api.get('/financiero/tarifas')
      ]);
      setMensualidades(mensualidadesRes.data);
      setEstudiantes(estudiantesRes.data);
      setTarifas(tarifasRes.data);
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

  const openModal = (mensualidad?: Mensualidad) => {
    if (mensualidad) {
      setEditingId(mensualidad.id);
      setFormData({
        estudiante_id: mensualidad.estudiante_id.toString(),
        tarifa_id: mensualidad.tarifa_id.toString(),
        mes: mensualidad.mes,
        anio: mensualidad.anio,
        monto_adeudado: mensualidad.monto_adeudado.toString(),
        moneda: mensualidad.moneda,
        estado: mensualidad.estado
      });
    } else {
      setEditingId(null);
      setFormData({
        estudiante_id: '',
        tarifa_id: '',
        mes: new Date().getMonth() + 1,
        anio: new Date().getFullYear(),
        monto_adeudado: '',
        moneda: 'USD',
        estado: 'Pendiente'
      });
    }
    setIsModalOpen(true);
  };

  const handleTarifaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tarifaId = e.target.value;
    const selectedTarifa = tarifas.find(t => t.id.toString() === tarifaId);
    setFormData({
      ...formData,
      tarifa_id: tarifaId,
      monto_adeudado: selectedTarifa ? selectedTarifa.monto.toString() : '',
      moneda: selectedTarifa ? selectedTarifa.moneda : 'USD'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        estudiante_id: Number(formData.estudiante_id),
        tarifa_id: Number(formData.tarifa_id),
        mes: Number(formData.mes),
        anio: Number(formData.anio),
        monto_adeudado: Number(formData.monto_adeudado)
      };
      
      if (editingId) {
        await api.patch(`/financiero/mensualidades/${editingId}`, payload);
        toast.success('Deuda actualizada');
      } else {
        await api.post('/financiero/mensualidades', payload);
        toast.success('Deuda generada');
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
        await api.delete(`/financiero/mensualidades/${id}`);
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
        <h2 className="page-title" style={{ margin: 0 }}>Cuentas por Cobrar (Mensualidades)</h2>
        <button className="btn-primary" onClick={() => openModal()}>
          <Plus size={20} />
          Generar Deuda
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
                <th>Periodo</th>
                <th>Deuda (Monto)</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mensualidades.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>No hay registros</td>
                </tr>
              ) : (
                mensualidades.map((m) => (
                  <tr key={m.id}>
                    <td style={{ fontWeight: 500 }}>{m.estudiante ? `${m.estudiante.nombre} ${m.estudiante.apellido}` : 'N/A'}</td>
                    <td>{m.mes}/{m.anio}</td>
                    <td style={{ fontWeight: 'bold' }}>{m.monto_adeudado} {m.moneda}</td>
                    <td>
                      <span style={{ 
                        background: m.estado === 'Pagada' ? '#d4edda' : (m.estado === 'Vencida' ? '#f8d7da' : '#fff3cd'), 
                        color: m.estado === 'Pagada' ? '#155724' : (m.estado === 'Vencida' ? '#721c24' : '#856404'),
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        {m.estado}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="action-btn edit" onClick={() => openModal(m)} title="Editar">
                          <Edit2 size={18} />
                        </button>
                        <button className="action-btn delete" onClick={() => handleDelete(m.id)} title="Eliminar">
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Editar Deuda' : 'Generar Deuda'}>
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
            <label>Tarifa a Cobrar</label>
            <select name="tarifa_id" className="form-input" value={formData.tarifa_id} onChange={handleTarifaChange} required>
              <option value="">-- Seleccionar --</option>
              {tarifas.map(t => (
                <option key={t.id} value={t.id}>{t.monto} {t.moneda} (Vigente: {new Date(t.fecha_vigencia).toLocaleDateString()})</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Monto Adeudado</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="number" step="0.01" name="monto_adeudado" className="form-input" value={formData.monto_adeudado} onChange={handleInputChange} required />
                <select name="moneda" className="form-input" value={formData.moneda} onChange={handleInputChange} style={{ width: '80px' }}>
                  <option value="USD">USD</option>
                  <option value="VES">VES</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Estado</label>
              <select name="estado" className="form-input" value={formData.estado} onChange={handleInputChange}>
                <option value="Pendiente">Pendiente</option>
                <option value="Pagada">Pagada</option>
                <option value="Vencida">Vencida</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Mes (1-12)</label>
              <input type="number" min="1" max="12" name="mes" className="form-input" value={formData.mes} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Año (Ej. 2026)</label>
              <input type="number" name="anio" className="form-input" value={formData.anio} onChange={handleInputChange} required />
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

export default MensualidadesPage;
