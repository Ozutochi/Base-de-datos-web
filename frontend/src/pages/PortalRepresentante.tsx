import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, LogOut, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

const PortalRepresentante: React.FC = () => {
  const navigate = useNavigate();
  const [estudiantes, setEstudiantes] = useState<any[]>([]);
  const [selectedEstudianteId, setSelectedEstudianteId] = useState<string>('');
  const [mensualidades, setMensualidades] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : { nombre: 'Representante' };

  // Formulario de Pago
  const [mensualidadId, setMensualidadId] = useState('');
  const [monto, setMonto] = useState('');
  const [moneda, setMoneda] = useState('Bs');
  const [metodoPago, setMetodoPago] = useState('Pago Móvil');
  const [referencia, setReferencia] = useState('');
  const [banco, setBanco] = useState('');
  const [fechaPago, setFechaPago] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const fetchEstudiantes = async () => {
    try {
      const res = await api.get('/academico/estudiantes');
      // Filtrar para que solo vea a sus hijos usando el correo como identificador
      const misEstudiantes = res.data.filter((est: any) => est.representante?.correo === user.email);
      setEstudiantes(misEstudiantes);
    } catch (error) {
      toast.error('Error al cargar estudiantes');
    }
  };

  const handleEstudianteChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedEstudianteId(id);
    if (!id) {
      setMensualidades([]);
      return;
    }

    setLoading(true);
    try {
      // Fetch mensualidades for this student
      const res = await api.get(`/financiero/mensualidades`);
      const deudas = res.data.filter((m: any) => m.estudiante_id === Number(id) && (m.estado === 'Pendiente' || m.estado === 'Vencida'));
      setMensualidades(deudas);
    } catch (error) {
      toast.error('Error al cargar deudas');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPago = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mensualidadId || !monto || !referencia) {
      toast.error('Por favor complete todos los campos');
      return;
    }

    try {
      const payload = {
        mensualidad_id: Number(mensualidadId),
        monto_pagado: Number(monto),
        moneda,
        tasa_cambio: 1, // Simplified
        metodo_pago: metodoPago,
        numero_referencia: referencia,
        numero_cuenta: banco,
        fecha_pago: fechaPago,
        estado_pago: 'En Revisión' // The important part!
      };

      await api.post('/financiero/pagos', payload);
      toast.success('Pago reportado exitosamente. En espera de revisión.');
      
      // Clear form
      setMensualidadId('');
      setMonto('');
      setReferencia('');
      setBanco('');
      
      // Refresh deudas
      const res = await api.get(`/financiero/mensualidades`);
      const deudas = res.data.filter((m: any) => m.estudiante_id === Number(selectedEstudianteId) && (m.estado === 'Pendiente' || m.estado === 'Vencida'));
      setMensualidades(deudas);

    } catch (error) {
      console.error(error);
      toast.error('Error al registrar el pago');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'var(--font-body)' }}>
      {/* Navbar */}
      <header style={{ background: 'var(--primary-blue)', color: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield size={28} />
          <h1 style={{ margin: 0, fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>ACADEMIA - Portal Representante</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>Bienvenido(a), {user.nombre}</span>
          <button 
            onClick={() => navigate('/login')}
            style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <LogOut size={16} /> Salir
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' }}>
        <h2 style={{ color: 'var(--text-dark)', marginBottom: '1.5rem' }}>Gestión de Pagos y Mensualidades</h2>
        
        {/* Selección de Estudiante */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' }}>Selecciona a tu representado:</label>
          <select 
            value={selectedEstudianteId} 
            onChange={handleEstudianteChange}
            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
          >
            <option value="">-- Seleccionar Estudiante --</option>
            {estudiantes.map(est => (
              <option key={est.id} value={est.id}>{est.nombre} {est.apellido}</option>
            ))}
          </select>
        </div>

        {selectedEstudianteId && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            
            {/* Lista de Deudas */}
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                <AlertCircle color="#ef4444" /> Mensualidades Pendientes
              </h3>
              
              {loading ? <p>Cargando...</p> : mensualidades.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem 0', color: '#10b981' }}>
                  <CheckCircle size={40} style={{ margin: '0 auto 1rem auto', display: 'block' }} />
                  <p>¡Todo al día! No hay deudas pendientes.</p>
                </div>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {mensualidades.map(m => (
                    <li key={m.id} style={{ padding: '1rem 0', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong>Mes: {m.mes}/{m.anio}</strong>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>Estado: <span style={{ color: m.estado === 'Vencida' ? '#ef4444' : '#f59e0b' }}>{m.estado}</span></p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}>{m.monto_adeudado} {m.moneda}</span>
                        <div style={{ fontSize: '0.75rem', color: '#999' }}>ID: {m.id}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Formulario de Reporte de Pago */}
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                <CreditCard color="#0ea5e9" /> Reportar Pago
              </h3>
              
              <form onSubmit={handleSubmitPago} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                <div>
                  <label>Mensualidad a pagar (Seleccione ID)</label>
                  <select required value={mensualidadId} onChange={e => setMensualidadId(e.target.value)} style={{ width: '100%', padding: '0.6rem' }}>
                    <option value="">Seleccione...</option>
                    {mensualidades.map(m => (
                      <option key={m.id} value={m.id}>Mes {m.mes}/{m.anio} - {m.monto_adeudado} {m.moneda}</option>
                    ))}
                  </select>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label>Monto</label>
                    <input type="number" step="0.01" required value={monto} onChange={e => setMonto(e.target.value)} style={{ width: '100%', padding: '0.6rem' }} placeholder="Ej: 20" />
                  </div>
                  <div>
                    <label>Moneda</label>
                    <select required value={moneda} onChange={e => setMoneda(e.target.value)} style={{ width: '100%', padding: '0.6rem' }}>
                      <option value="Bs">Bolívares (Bs)</option>
                      <option value="USD">Dólares (USD)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label>Método de Pago</label>
                    <select required value={metodoPago} onChange={e => setMetodoPago(e.target.value)} style={{ width: '100%', padding: '0.6rem' }}>
                      <option value="Pago Móvil">Pago Móvil</option>
                      <option value="Transferencia">Transferencia</option>
                      <option value="Zelle">Zelle</option>
                      <option value="Efectivo">Efectivo</option>
                    </select>
                  </div>
                  <div>
                    <label>Fecha del Pago</label>
                    <input type="date" required value={fechaPago} onChange={e => setFechaPago(e.target.value)} style={{ width: '100%', padding: '0.6rem' }} />
                  </div>
                </div>

                <div>
                  <label>Número de Referencia / Comprobante</label>
                  <input type="text" required value={referencia} onChange={e => setReferencia(e.target.value)} style={{ width: '100%', padding: '0.6rem' }} placeholder="Ej: 123456789" />
                </div>
                
                <div>
                  <label>Banco de Origen (Opcional)</label>
                  <input type="text" value={banco} onChange={e => setBanco(e.target.value)} style={{ width: '100%', padding: '0.6rem' }} placeholder="Ej: Banesco" />
                </div>

                <button type="submit" style={{ background: 'var(--primary-blue)', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '1rem' }}>
                  ENVIAR PAGO PARA REVISIÓN
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PortalRepresentante;
