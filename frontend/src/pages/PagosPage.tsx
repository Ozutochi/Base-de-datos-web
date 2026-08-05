import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import Modal from '../components/Modal';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
}

interface Mensualidad {
  id: number;
  mes: number;
  anio: number;
  monto_adeudado: string;
  moneda: string;
}

interface Pago {
  id: number;
  representante_id: number;
  mensualidad_id: number;
  monto_pagado: string;
  moneda: string;
  tasa_cambio: string;
  metodo_pago: string;
  numero_referencia: string;
  numero_cuenta: string;
  fecha_pago: string;
  estado_pago: string;
  representante: Usuario;
  mensualidad: Mensualidad;
}

const PagosPage: React.FC = () => {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [representantes, setRepresentantes] = useState<Usuario[]>([]);
  const [mensualidades, setMensualidades] = useState<Mensualidad[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    representante_id: '',
    mensualidad_id: '',
    monto_pagado: '',
    moneda: 'USD',
    tasa_cambio: '1.00',
    metodo_pago: 'Transferencia',
    numero_referencia: '',
    numero_cuenta: '',
    fecha_pago: '',
    estado_pago: 'En Revisión'
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [pagosRes, repRes, menRes] = await Promise.all([
        api.get('/financiero/pagos'),
        api.get('/usuarios?rol_id=1'), // Representantes
        api.get('/financiero/mensualidades')
      ]);
      setPagos(pagosRes.data);
      setRepresentantes(repRes.data);
      setMensualidades(menRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error al cargar pagos');
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

  const openModal = (pago?: Pago) => {
    if (pago) {
      setEditingId(pago.id);
      setFormData({
        representante_id: pago.representante_id.toString(),
        mensualidad_id: pago.mensualidad_id.toString(),
        monto_pagado: pago.monto_pagado.toString(),
        moneda: pago.moneda,
        tasa_cambio: pago.tasa_cambio.toString(),
        metodo_pago: pago.metodo_pago,
        numero_referencia: pago.numero_referencia,
        numero_cuenta: pago.numero_cuenta,
        fecha_pago: new Date(pago.fecha_pago).toISOString().split('T')[0],
        estado_pago: pago.estado_pago
      });
    } else {
      setEditingId(null);
      setFormData({
        representante_id: '',
        mensualidad_id: '',
        monto_pagado: '',
        moneda: 'USD',
        tasa_cambio: '1.00',
        metodo_pago: 'Transferencia',
        numero_referencia: '',
        numero_cuenta: '',
        fecha_pago: '',
        estado_pago: 'En Revisión'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        representante_id: Number(formData.representante_id),
        mensualidad_id: Number(formData.mensualidad_id),
        monto_pagado: Number(formData.monto_pagado),
        tasa_cambio: Number(formData.tasa_cambio)
      };
      
      if (editingId) {
        await api.patch(`/financiero/pagos/${editingId}`, payload);
        toast.success('Pago actualizado');
      } else {
        await api.post('/financiero/pagos', payload);
        toast.success('Pago registrado');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error: any) {
      console.error('Error saving:', error);
      toast.error(error.response?.data?.message || 'Error al guardar');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este pago?')) {
      try {
        await api.delete(`/financiero/pagos/${id}`);
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
        <h2 className="page-title" style={{ margin: 0 }}>Registro de Pagos</h2>
        <button className="btn-primary" onClick={() => openModal()}>
          <Plus size={20} />
          Registrar Pago
        </button>
      </div>

      <div className="data-table-container">
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Cargando datos...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Fecha / Ref</th>
                <th>Representante</th>
                <th>Concepto (Mes)</th>
                <th>Monto Pagado</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pagos.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>No hay pagos registrados</td>
                </tr>
              ) : (
                pagos.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{new Date(p.fecha_pago).toLocaleDateString()}</div>
                      <div style={{ fontSize: '0.85rem', color: '#666' }}>Ref: {p.numero_referencia}</div>
                    </td>
                    <td>{p.representante ? `${p.representante.nombre} ${p.representante.apellido}` : 'N/A'}</td>
                    <td>{p.mensualidad ? `${p.mensualidad.mes}/${p.mensualidad.anio}` : 'N/A'}</td>
                    <td style={{ fontWeight: 'bold', color: 'var(--primary-blue)' }}>
                      {p.monto_pagado} {p.moneda}
                    </td>
                    <td>
                      <span style={{ 
                        background: p.estado_pago === 'Aprobado' ? '#d4edda' : (p.estado_pago === 'Rechazado' ? '#f8d7da' : '#eef2f6'), 
                        color: p.estado_pago === 'Aprobado' ? '#155724' : (p.estado_pago === 'Rechazado' ? '#721c24' : '#0056b3'),
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        {p.estado_pago}
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Editar Pago' : 'Registrar Pago'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Representante</label>
            <select name="representante_id" className="form-input" value={formData.representante_id} onChange={handleInputChange} required>
              <option value="">-- Seleccionar --</option>
              {representantes.map(r => (
                <option key={r.id} value={r.id}>{r.nombre} {r.apellido}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Mensualidad/Deuda a Pagar</label>
            <select name="mensualidad_id" className="form-input" value={formData.mensualidad_id} onChange={handleInputChange} required>
              <option value="">-- Seleccionar --</option>
              {mensualidades.map(m => (
                <option key={m.id} value={m.id}>{m.mes}/{m.anio} - Deuda: {m.monto_adeudado} {m.moneda}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Monto Pagado</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="number" step="0.01" name="monto_pagado" className="form-input" value={formData.monto_pagado} onChange={handleInputChange} required />
                <select name="moneda" className="form-input" value={formData.moneda} onChange={handleInputChange} style={{ width: '80px' }}>
                  <option value="USD">USD</option>
                  <option value="VES">VES</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Tasa de Cambio</label>
              <input type="number" step="0.0001" name="tasa_cambio" className="form-input" value={formData.tasa_cambio} onChange={handleInputChange} required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Método de Pago</label>
              <select name="metodo_pago" className="form-input" value={formData.metodo_pago} onChange={handleInputChange}>
                <option value="Transferencia">Transferencia</option>
                <option value="Pago Movil">Pago Móvil</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Zelle">Zelle</option>
              </select>
            </div>
            <div className="form-group">
              <label>Fecha de Pago</label>
              <input type="date" name="fecha_pago" className="form-input" value={formData.fecha_pago} onChange={handleInputChange} required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Número de Referencia</label>
              <input type="text" name="numero_referencia" className="form-input" value={formData.numero_referencia} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Teléfono / Cuenta</label>
              <input type="text" name="numero_cuenta" className="form-input" value={formData.numero_cuenta} onChange={handleInputChange} />
            </div>
          </div>
          
          <div className="form-group">
            <label>Estado del Pago</label>
            <select name="estado_pago" className="form-input" value={formData.estado_pago} onChange={handleInputChange}>
              <option value="En Revisión">En Revisión</option>
              <option value="Aprobado">Aprobado</option>
              <option value="Rechazado">Rechazado</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">Guardar Pago</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PagosPage;
