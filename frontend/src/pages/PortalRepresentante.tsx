import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  LogOut, 
  CreditCard, 
  AlertCircle, 
  CheckCircle, 
  UserPlus, 
  Clock, 
  XCircle, 
  FileText, 
  History, 
  Search,
  Filter,
  Activity
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

const PortalRepresentante: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'pagos' | 'historial-pagos' | 'solicitudes'>('pagos');

  // Datos del Usuario logueado
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : { nombre: 'Representante', email: 'representante@academia.pro' };

  const initials = user.nombre
    ? user.nombre.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
    : 'RP';

  // --- SECCIÓN 1: PAGOS Y MENSUALIDADES ---
  const [estudiantes, setEstudiantes] = useState<any[]>([]);
  const [selectedEstudianteId, setSelectedEstudianteId] = useState<string>('');
  const [mensualidades, setMensualidades] = useState<any[]>([]);
  const [loadingPagos, setLoadingPagos] = useState(false);

  // Formulario de Pago
  const [mensualidadId, setMensualidadId] = useState('');
  const [monto, setMonto] = useState('');
  const [moneda, setMoneda] = useState('Bs');
  const [metodoPago, setMetodoPago] = useState('Pago Móvil');
  const [referencia, setReferencia] = useState('');
  const [banco, setBanco] = useState('');
  const [fechaPago, setFechaPago] = useState(new Date().toISOString().split('T')[0]);

  // Ficha Médica State (de origin/main)
  const [fichaFormData, setFichaFormData] = useState({
    tipo_sangre: '',
    alergias: '',
    condiciones_preexistentes: '',
    medicacion_actual: '',
    contacto_emergencia_nombre: '',
    contacto_emergencia_telefono: ''
  });
  const [savingFicha, setSavingFicha] = useState(false);
  const [isEditingFicha, setIsEditingFicha] = useState(false);

  // --- SECCIÓN 2: HISTORIAL DE PAGOS ---
  const [historialPagos, setHistorialPagos] = useState<any[]>([]);
  const [loadingHistorial, setLoadingHistorial] = useState(false);
  const [filtroEstadoPago, setFiltroEstadoPago] = useState<string>('Todos');
  const [searchHistorial, setSearchHistorial] = useState<string>('');

  // --- SECCIÓN 3: SOLICITUDES DE INSCRIPCIÓN ---
  const [representanteId, setRepresentanteId] = useState<number | null>(null);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [misSolicitudes, setMisSolicitudes] = useState<any[]>([]);
  const [loadingSolicitudes, setLoadingSolicitudes] = useState(false);

  // Formulario de Solicitud de Inscripción
  const [nombreEstudiante, setNombreEstudiante] = useState('');
  const [apellidoEstudiante, setApellidoEstudiante] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [submittingSolicitud, setSubmittingSolicitud] = useState(false);

  useEffect(() => {
    fetchEstudiantesYRepresentante();
    fetchCategorias();
  }, []);

  useEffect(() => {
    if (representanteId) {
      fetchMisSolicitudes(representanteId);
      fetchHistorialPagos(representanteId);
    }
  }, [representanteId]);

  const fetchEstudiantesYRepresentante = async () => {
    try {
      const resEst = await api.get('/academico/estudiantes');
      const misEstudiantes = resEst.data.filter((est: any) => est.representante?.correo === user.email);
      setEstudiantes(misEstudiantes);

      // Obtener el ID del representante en la base de datos
      if (misEstudiantes.length > 0 && misEstudiantes[0].representante_id) {
        setRepresentanteId(misEstudiantes[0].representante_id);
      } else {
        const resUsers = await api.get('/usuarios');
        const repUser = resUsers.data.find((u: any) => u.correo === user.email);
        if (repUser) {
          setRepresentanteId(repUser.id);
        }
      }
    } catch (error) {
      toast.error('Error al cargar la información del representante');
    }
  };

  const fetchCategorias = async () => {
    try {
      const res = await api.get('/academico/categorias');
      setCategorias(res.data);
    } catch (error) {
      toast.error('Error al cargar las categorías');
    }
  };

  const fetchMisSolicitudes = async (repId: number) => {
    setLoadingSolicitudes(true);
    try {
      const res = await api.get(`/academico/solicitudes?representante_id=${repId}`);
      setMisSolicitudes(res.data);
    } catch (error) {
      toast.error('Error al cargar solicitudes de inscripción');
    } finally {
      setLoadingSolicitudes(false);
    }
  };

  const fetchHistorialPagos = async (repId: number) => {
    setLoadingHistorial(true);
    try {
      const res = await api.get('/financiero/pagos');
      const misPagos = res.data.filter((p: any) => p.representante_id === repId || p.representante?.correo === user.email);
      setHistorialPagos(misPagos);
    } catch (error) {
      toast.error('Error al cargar el historial de pagos');
    } finally {
      setLoadingHistorial(false);
    }
  };

  const handleEstudianteChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedEstudianteId(id);
    if (!id) {
      setMensualidades([]);
      return;
    }

    setIsEditingFicha(false);

    // Cargar la Ficha Médica del estudiante seleccionado
    setEstudiantes(currentEstudiantes => {
      const estudiante = currentEstudiantes.find((est: any) => est.id === Number(id));
      if (estudiante && estudiante.ficha_medica) {
        setFichaFormData({
          tipo_sangre: estudiante.ficha_medica.tipo_sangre || '',
          alergias: estudiante.ficha_medica.alergias || '',
          condiciones_preexistentes: estudiante.ficha_medica.condiciones_preexistentes || '',
          medicacion_actual: estudiante.ficha_medica.medicacion_actual || '',
          contacto_emergencia_nombre: estudiante.ficha_medica.contacto_emergencia_nombre || '',
          contacto_emergencia_telefono: estudiante.ficha_medica.contacto_emergencia_telefono || ''
        });
      }
      return currentEstudiantes;
    });

    setLoadingPagos(true);
    try {
      const res = await api.get(`/financiero/mensualidades`);
      const deudas = res.data.filter((m: any) => m.estudiante_id === Number(id) && (m.estado === 'Pendiente' || m.estado === 'Vencida'));
      setMensualidades(deudas);
    } catch (error) {
      toast.error('Error al cargar deudas');
    } finally {
      setLoadingPagos(false);
    }
  };

  const handleSubmitPago = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mensualidadId || !monto || !referencia) {
      toast.error('Por favor complete todos los campos requeridos');
      return;
    }

    if (!representanteId) {
      toast.error('No se pudo verificar el ID del representante.');
      return;
    }

    try {
      const payload = {
        representante_id: representanteId,
        mensualidad_id: Number(mensualidadId),
        monto_pagado: Number(monto),
        moneda,
        tasa_cambio: 1,
        metodo_pago: metodoPago,
        numero_referencia: referencia,
        numero_cuenta: banco || 'N/A',
        fecha_pago: fechaPago,
        estado_pago: 'En Revisión',
      };

      await api.post('/financiero/pagos', payload);
      toast.success('Pago reportado exitosamente. En espera de revisión.');

      setMensualidadId('');
      setMonto('');
      setReferencia('');
      setBanco('');

      const res = await api.get(`/financiero/mensualidades`);
      const deudas = res.data.filter((m: any) => m.estudiante_id === Number(selectedEstudianteId) && (m.estado === 'Pendiente' || m.estado === 'Vencida'));
      setMensualidades(deudas);

      fetchHistorialPagos(representanteId);
    } catch (error) {
      console.error(error);
      toast.error('Error al registrar el pago');
    }
  };

  const handleFichaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const estudiante = estudiantes.find((est: any) => est.id === Number(selectedEstudianteId));
    if (!estudiante || !estudiante.ficha_medica) return;

    try {
      setSavingFicha(true);
      await api.patch(`/academico/fichas-medicas/${estudiante.ficha_medica.id}`, fichaFormData);
      toast.success('Ficha médica actualizada exitosamente');
      setIsEditingFicha(false);
      fetchEstudiantesYRepresentante();
    } catch (error) {
      toast.error('Error al actualizar la ficha médica');
    } finally {
      setSavingFicha(false);
    }
  };

  const handleFichaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFichaFormData({ ...fichaFormData, [name]: value });
  };

  const handleSubmitSolicitud = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreEstudiante || !apellidoEstudiante || !fechaNacimiento || !categoriaId) {
      toast.error('Por favor complete los campos obligatorios del estudiante');
      return;
    }

    // Validar edad mínima de 6 años
    const hoy = new Date();
    const nac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nac.getFullYear();
    const mes = hoy.getMonth() - nac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nac.getDate())) {
      edad--;
    }

    if (isNaN(nac.getTime()) || edad < 6) {
      toast.error('El estudiante debe tener al menos 6 años de edad cumplidos para solicitar su inscripción.');
      return;
    }

    if (!representanteId) {
      toast.error('No se pudo identificar su usuario representante en el sistema. Contacte al administrador.');
      return;
    }

    setSubmittingSolicitud(true);
    try {
      const payload = {
        representante_id: representanteId,
        categoria_id: Number(categoriaId),
        nombre_estudiante: nombreEstudiante,
        apellido_estudiante: apellidoEstudiante,
        fecha_nacimiento: fechaNacimiento,
        observaciones,
      };

      await api.post('/academico/solicitudes', payload);
      toast.success('Solicitud de inscripción enviada exitosamente. El administrador revisará la solicitud.');

      setNombreEstudiante('');
      setApellidoEstudiante('');
      setFechaNacimiento('');
      setCategoriaId('');
      setObservaciones('');

      fetchMisSolicitudes(representanteId);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error al enviar la solicitud de inscripción');
    } finally {
      setSubmittingSolicitud(false);
    }
  };

  const historialFiltrado = historialPagos.filter((p) => {
    const coincideEstado = filtroEstadoPago === 'Todos' || p.estado_pago === filtroEstadoPago;
    const ref = (p.numero_referencia || '').toLowerCase();
    const metodo = (p.metodo_pago || '').toLowerCase();
    const coincideBusqueda = ref.includes(searchHistorial.toLowerCase()) || metodo.includes(searchHistorial.toLowerCase());
    return coincideEstado && coincideBusqueda;
  });

  const fechaMaxima6Anios = new Date(new Date().setFullYear(new Date().getFullYear() - 6)).toISOString().split('T')[0];

  return (
    <div className="dashboard-container">
      {/* MENÚ LATERAL (SIDEBAR) */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <Shield size={32} color="white" />
          <div>
            <h1 style={{ lineHeight: 1 }}>ACADEMIA</h1>
            <span style={{ fontSize: '0.8rem', opacity: 0.8, fontWeight: 300, letterSpacing: '2px' }}>
              PORTAL REPRESENTANTE
            </span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            onClick={() => setActiveTab('pagos')}
            className={`sidebar-nav-item ${activeTab === 'pagos' ? 'active' : ''}`}
            style={{ border: 'none', width: '100%', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}
          >
            <CreditCard size={20} />
            Gestión de Pagos
          </button>

          <button
            onClick={() => {
              setActiveTab('historial-pagos');
              if (representanteId) fetchHistorialPagos(representanteId);
            }}
            className={`sidebar-nav-item ${activeTab === 'historial-pagos' ? 'active' : ''}`}
            style={{ border: 'none', width: '100%', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}
          >
            <History size={20} />
            Historial de Pagos
          </button>

          <button
            onClick={() => setActiveTab('solicitudes')}
            className={`sidebar-nav-item ${activeTab === 'solicitudes' ? 'active' : ''}`}
            style={{ border: 'none', width: '100%', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}
          >
            <UserPlus size={20} />
            Solicitud de Inscripción
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={() => navigate('/login')}>
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="dashboard-main">
        {/* TOP HEADER */}
        <header className="dashboard-header" style={{ justifyContent: 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-blue)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                }}
              >
                {initials}
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-dark)' }}>{user.nombre}</p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-light)' }}>{user.email}</p>
              </div>
            </div>
          </div>
        </header>

        {/* DYNAMIC CONTENT AREA */}
        <div className="dashboard-content">
          {/* OPCIÓN 1: GESTIÓN DE PAGOS Y DEUDAS */}
          {activeTab === 'pagos' && (
            <div>
              <div style={{ marginBottom: '1.8rem' }}>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--text-dark)', margin: 0, fontFamily: 'var(--font-heading)' }}>
                  Gestión de Pagos y Mensualidades
                </h2>
                <p style={{ color: 'var(--text-light)', margin: '0.3rem 0 0 0', fontSize: '0.95rem' }}>
                  Consulta las mensualidades de tus representados, actualiza su ficha médica y reporta nuevos pagos.
                </p>
              </div>

              {/* Selección de Estudiante */}
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.04)', marginBottom: '2rem', border: '1px solid #e2e8f0' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155' }}>Selecciona a tu representado:</label>
                <select
                  value={selectedEstudianteId}
                  onChange={handleEstudianteChange}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                >
                  <option value="">-- Seleccionar Estudiante --</option>
                  {estudiantes.map((est) => (
                    <option key={est.id} value={est.id}>
                      {est.nombre} {est.apellido}
                    </option>
                  ))}
                </select>
              </div>

              {selectedEstudianteId ? (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    {/* Lista de Deudas */}
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '1rem', color: '#1e293b' }}>
                        <AlertCircle color="#ef4444" /> Mensualidades Pendientes
                      </h3>

                      {loadingPagos ? (
                        <p style={{ color: '#64748b' }}>Cargando deudas...</p>
                      ) : mensualidades.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2.5rem 0', color: '#10b981' }}>
                          <CheckCircle size={45} style={{ margin: '0 auto 1rem auto', display: 'block' }} />
                          <p style={{ fontWeight: 600, margin: 0 }}>¡Todo al día! No hay deudas pendientes para este estudiante.</p>
                        </div>
                      ) : (
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {mensualidades.map((m) => (
                            <li key={m.id} style={{ padding: '1rem 0', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div>
                                <strong style={{ fontSize: '1rem', color: '#1e293b' }}>Mes: {m.mes}/{m.anio}</strong>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                                  Estado: <span style={{ color: m.estado === 'Vencida' ? '#ef4444' : '#f59e0b', fontWeight: 600 }}>{m.estado}</span>
                                </p>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#0f172a' }}>
                                  {m.monto_adeudado} {m.moneda}
                                </span>
                                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>ID: #{m.id}</div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Formulario de Reporte de Pago */}
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '1rem', color: 'var(--primary-blue)' }}>
                        <CreditCard color="#0ea5e9" /> Reportar Pago
                      </h3>

                      <form onSubmit={handleSubmitPago} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                            Mensualidad a pagar (Seleccione ID) *
                          </label>
                          <select required value={mensualidadId} onChange={(e) => setMensualidadId(e.target.value)} style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}>
                            <option value="">Seleccione mensualidad...</option>
                            {mensualidades.map((m) => (
                              <option key={m.id} value={m.id}>
                                Mes {m.mes}/{m.anio} - {m.monto_adeudado} {m.moneda}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>Monto *</label>
                            <input type="number" step="0.01" required value={monto} onChange={(e) => setMonto(e.target.value)} style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} placeholder="Ej: 20" />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>Moneda *</label>
                            <select required value={moneda} onChange={(e) => setMoneda(e.target.value)} style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}>
                              <option value="Bs">Bolívares (Bs)</option>
                              <option value="USD">Dólares (USD)</option>
                            </select>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>Método de Pago *</label>
                            <select required value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)} style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}>
                              <option value="Pago Móvil">Pago Móvil</option>
                              <option value="Transferencia">Transferencia</option>
                              <option value="Zelle">Zelle</option>
                              <option value="Efectivo">Efectivo</option>
                            </select>
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>Fecha del Pago *</label>
                            <input type="date" required value={fechaPago} onChange={(e) => setFechaPago(e.target.value)} style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>Número de Referencia / Comprobante *</label>
                          <input type="text" required value={referencia} onChange={(e) => setReferencia(e.target.value)} style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} placeholder="Ej: 123456789" />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>Banco de Origen (Opcional)</label>
                          <input type="text" value={banco} onChange={(e) => setBanco(e.target.value)} style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} placeholder="Ej: Banesco" />
                        </div>

                        <button type="submit" style={{ background: 'var(--primary-blue)', color: 'white', border: 'none', padding: '0.85rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                          ENVIAR PAGO PARA REVISIÓN
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Ficha Médica del Estudiante */}
                  <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, color: '#1e293b' }}>
                        <Activity color="#8b5cf6" /> Ficha Médica del Estudiante
                      </h3>
                      {!isEditingFicha && (
                        <button onClick={() => setIsEditingFicha(true)} style={{ background: 'var(--primary-blue)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                          Editar Ficha
                        </button>
                      )}
                    </div>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Por favor, mantenga actualizada la información médica de su representado para emergencias o actividades deportivas.</p>

                    {!isEditingFicha ? (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', fontWeight: 600, marginBottom: '0.2rem' }}>Tipo de Sangre</span>
                          <span style={{ fontWeight: 500, color: '#1e293b' }}>{fichaFormData.tipo_sangre || 'N/A'}</span>
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', fontWeight: 600, marginBottom: '0.2rem' }}>Alergias</span>
                          <span style={{ fontWeight: 500, color: '#1e293b' }}>{fichaFormData.alergias || 'Ninguna'}</span>
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', fontWeight: 600, marginBottom: '0.2rem' }}>Condiciones Preexistentes</span>
                          <span style={{ fontWeight: 500, color: '#1e293b' }}>{fichaFormData.condiciones_preexistentes || 'Ninguna'}</span>
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', fontWeight: 600, marginBottom: '0.2rem' }}>Medicación Actual</span>
                          <span style={{ fontWeight: 500, color: '#1e293b' }}>{fichaFormData.medicacion_actual || 'Ninguna'}</span>
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', fontWeight: 600, marginBottom: '0.2rem' }}>Contacto de Emergencia</span>
                          <span style={{ fontWeight: 500, color: '#1e293b' }}>{fichaFormData.contacto_emergencia_nombre || 'No especificado'}</span>
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', fontWeight: 600, marginBottom: '0.2rem' }}>Teléfono de Emergencia</span>
                          <span style={{ fontWeight: 500, color: '#1e293b' }}>{fichaFormData.contacto_emergencia_telefono || 'No especificado'}</span>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleFichaSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ fontWeight: 600, fontSize: '0.85rem', color: '#334155' }}>Tipo de Sangre *</label>
                            <input type="text" name="tipo_sangre" value={fichaFormData.tipo_sangre} onChange={handleFichaChange} placeholder="Ej. O+, A-, N/A" required style={{ padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ fontWeight: 600, fontSize: '0.85rem', color: '#334155' }}>Alergias</label>
                            <input type="text" name="alergias" value={fichaFormData.alergias} onChange={handleFichaChange} placeholder="Ninguna" style={{ padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ fontWeight: 600, fontSize: '0.85rem', color: '#334155' }}>Condiciones Preexistentes</label>
                            <input type="text" name="condiciones_preexistentes" value={fichaFormData.condiciones_preexistentes} onChange={handleFichaChange} placeholder="Ninguna" style={{ padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ fontWeight: 600, fontSize: '0.85rem', color: '#334155' }}>Medicación Actual</label>
                            <input type="text" name="medicacion_actual" value={fichaFormData.medicacion_actual} onChange={handleFichaChange} placeholder="Ninguna" style={{ padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ fontWeight: 600, fontSize: '0.85rem', color: '#334155' }}>Contacto de Emergencia (Nombre) *</label>
                            <input type="text" name="contacto_emergencia_nombre" value={fichaFormData.contacto_emergencia_nombre} onChange={handleFichaChange} required style={{ padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ fontWeight: 600, fontSize: '0.85rem', color: '#334155' }}>Teléfono de Emergencia *</label>
                            <input type="text" name="contacto_emergencia_telefono" value={fichaFormData.contacto_emergencia_telefono} onChange={handleFichaChange} required style={{ padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
                          </div>
                        </div>

                        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                          <button type="button" onClick={() => setIsEditingFicha(false)} disabled={savingFicha} style={{ background: 'transparent', color: '#64748b', border: 'none', padding: '0.8rem 1.5rem', cursor: savingFicha ? 'not-allowed' : 'pointer', fontWeight: 600 }}>
                            Cancelar
                          </button>
                          <button type="submit" disabled={savingFicha} style={{ background: 'var(--primary-blue)', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: savingFicha ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}>
                            {savingFicha ? 'GUARDANDO...' : 'GUARDAR FICHA MÉDICA'}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </>
              ) : (
                <div style={{ background: 'white', padding: '3rem', borderRadius: '12px', textAlign: 'center', color: '#64748b', border: '1px solid #e2e8f0' }}>
                  <p style={{ margin: 0, fontSize: '1rem' }}>Por favor seleccione un estudiante para consultar sus mensualidades pendientes y reportar pagos.</p>
                </div>
              )}
            </div>
          )}

          {/* OPCIÓN 2: HISTORIAL DE PAGOS REALIZADOS */}
          {activeTab === 'historial-pagos' && (
            <div>
              <div style={{ marginBottom: '1.8rem' }}>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--text-dark)', margin: 0, fontFamily: 'var(--font-heading)' }}>
                  Historial de Pagos Realizados
                </h2>
                <p style={{ color: 'var(--text-light)', margin: '0.3rem 0 0 0', fontSize: '0.95rem' }}>
                  Revisa el estado de todos los reportes de pago que has enviado a la administración.
                </p>
              </div>

              {/* Filtros de Historial */}
              <div style={{ background: 'white', padding: '1rem 1.2rem', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.04)', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '220px' }}>
                  <Search size={18} color="#94a3b8" />
                  <input
                    type="text"
                    placeholder="Buscar por referencia o método..."
                    value={searchHistorial}
                    onChange={(e) => setSearchHistorial(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem 0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Filter size={18} color="#64748b" />
                  <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>Estado:</span>
                  {['Todos', 'En Revisión', 'Aprobado', 'Rechazado'].map((estado) => (
                    <button
                      key={estado}
                      onClick={() => setFiltroEstadoPago(estado)}
                      style={{
                        background: filtroEstadoPago === estado ? 'var(--primary-blue)' : '#f1f5f9',
                        color: filtroEstadoPago === estado ? 'white' : '#475569',
                        border: 'none',
                        padding: '0.4rem 0.85rem',
                        borderRadius: '20px',
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        fontWeight: filtroEstadoPago === estado ? 600 : 400,
                      }}
                    >
                      {estado}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tabla de Historial */}
              <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.04)', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                {loadingHistorial ? (
                  <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>Cargando historial de pagos...</div>
                ) : historialFiltrado.length === 0 ? (
                  <div style={{ padding: '3.5rem', textAlign: 'center', color: '#94a3b8' }}>
                    <History size={45} style={{ margin: '0 auto 0.8rem auto', display: 'block', opacity: 0.4 }} />
                    No se encontraron pagos registrados con los criterios seleccionados.
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                          <th style={{ padding: '0.9rem 1rem' }}>ID Pago</th>
                          <th style={{ padding: '0.9rem 1rem' }}>Estudiante / Mensualidad</th>
                          <th style={{ padding: '0.9rem 1rem' }}>Fecha Pago</th>
                          <th style={{ padding: '0.9rem 1rem' }}>Monto</th>
                          <th style={{ padding: '0.9rem 1rem' }}>Método / Referencia</th>
                          <th style={{ padding: '0.9rem 1rem' }}>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historialFiltrado.map((p) => (
                          <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '0.9rem 1rem', fontWeight: 600, color: '#0f172a' }}>#{p.id}</td>
                            <td style={{ padding: '0.9rem 1rem' }}>
                              <div style={{ fontWeight: 600, color: '#1e293b' }}>
                                {p.mensualidad?.estudiante ? `${p.mensualidad.estudiante.nombre} ${p.mensualidad.estudiante.apellido}` : `Mensualidad #${p.mensualidad_id}`}
                              </div>
                              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                                Mes: {p.mensualidad?.mes}/{p.mensualidad?.anio}
                              </div>
                            </td>
                            <td style={{ padding: '0.9rem 1rem', color: '#475569' }}>{p.fecha_pago}</td>
                            <td style={{ padding: '0.9rem 1rem', fontWeight: 'bold', color: '#0f172a' }}>
                              {p.monto_pagado} {p.moneda}
                            </td>
                            <td style={{ padding: '0.9rem 1rem' }}>
                              <div style={{ fontWeight: 500, color: '#334155' }}>{p.metodo_pago}</div>
                              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                                Ref: {p.numero_referencia} {p.numero_cuenta !== 'N/A' && `(${p.numero_cuenta})`}
                              </div>
                            </td>
                            <td style={{ padding: '0.9rem 1rem' }}>
                              {p.estado_pago === 'En Revisión' && (
                                <span style={{ background: '#fef3c7', color: '#b45309', padding: '0.3rem 0.75rem', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                                  <Clock size={12} /> En Revisión
                                </span>
                              )}
                              {p.estado_pago === 'Aprobado' && (
                                <span style={{ background: '#d1fae5', color: '#047857', padding: '0.3rem 0.75rem', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                                  <CheckCircle size={12} /> Aprobado
                                </span>
                              )}
                              {p.estado_pago === 'Rechazado' && (
                                <span style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.3rem 0.75rem', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                                  <XCircle size={12} /> Rechazado
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* OPCIÓN 3: SOLICITUD DE INSCRIPCIÓN DE ESTUDIANTE */}
          {activeTab === 'solicitudes' && (
            <div>
              <div style={{ marginBottom: '1.8rem' }}>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--text-dark)', margin: 0, fontFamily: 'var(--font-heading)' }}>
                  Solicitudes de Inscripción
                </h2>
                <p style={{ color: 'var(--text-light)', margin: '0.3rem 0 0 0', fontSize: '0.95rem' }}>
                  Envía una solicitud de inscripción para registrar a un nuevo estudiante en la academia.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem' }}>
                {/* Formulario Nueva Solicitud */}
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.04)', height: 'fit-content', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '1rem', color: 'var(--primary-blue)' }}>
                    <UserPlus size={22} /> Solicitar Nueva Inscripción
                  </h3>

                  <form onSubmit={handleSubmitSolicitud} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                        Nombre del Estudiante *
                      </label>
                      <input
                        type="text"
                        required
                        value={nombreEstudiante}
                        onChange={(e) => setNombreEstudiante(e.target.value)}
                        placeholder="Ej: Carlos"
                        style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                        Apellido del Estudiante *
                      </label>
                      <input
                        type="text"
                        required
                        value={apellidoEstudiante}
                        onChange={(e) => setApellidoEstudiante(e.target.value)}
                        placeholder="Ej: Mendoza"
                        style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                        Fecha de Nacimiento * (Mínimo 6 años)
                      </label>
                      <input
                        type="date"
                        required
                        max={fechaMaxima6Anios}
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                        style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                        Categoría Solicitada *
                      </label>
                      <select
                        required
                        value={categoriaId}
                        onChange={(e) => setCategoriaId(e.target.value)}
                        style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                      >
                        <option value="">-- Seleccionar Categoría --</option>
                        {categorias.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.nombre || cat.nombre_categoria} ({cat.edad_minima} - {cat.edad_maxima} años)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                        Observaciones / Notas Adicionales
                      </label>
                      <textarea
                        rows={3}
                        value={observaciones}
                        onChange={(e) => setObservaciones(e.target.value)}
                        placeholder="Ej: Experiencia previa en otra academia, posición preferida..."
                        style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', resize: 'vertical' }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submittingSolicitud}
                      style={{
                        background: 'var(--primary-blue)',
                        color: 'white',
                        border: 'none',
                        padding: '0.85rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '0.95rem',
                        marginTop: '0.5rem',
                      }}
                    >
                      {submittingSolicitud ? 'ENVIANDO...' : 'ENVIAR SOLICITUD DE INSCRIPCIÓN'}
                    </button>
                  </form>
                </div>

                {/* Lista de Solicitudes Enviadas */}
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '1rem', color: '#1e293b' }}>
                    <FileText size={22} color="#0284c7" /> Historial de Mis Solicitudes
                  </h3>

                  {loadingSolicitudes ? (
                    <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem 0' }}>Cargando solicitudes...</p>
                  ) : misSolicitudes.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#64748b' }}>
                      <Clock size={40} style={{ margin: '0 auto 0.8rem auto', display: 'block', opacity: 0.4 }} />
                      <p style={{ margin: 0 }}>Aún no has enviado solicitudes de inscripción.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                      {misSolicitudes.map((s) => (
                        <div
                          key={s.id}
                          style={{
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            padding: '1rem',
                            background: s.estado === 'Aprobada' ? '#f0fdf4' : s.estado === 'Rechazada' ? '#fef2f2' : '#fffbe6',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                            <div>
                              <strong style={{ fontSize: '1.05rem', color: '#1e293b' }}>
                                {s.nombre_estudiante} {s.apellido_estudiante}
                              </strong>
                              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                F. Nacimiento: {s.fecha_nacimiento} | Solicitado: {s.fecha_solicitud}
                              </div>
                            </div>

                            <div>
                              {s.estado === 'Pendiente' && (
                                <span style={{ background: '#fef3c7', color: '#b45309', padding: '0.25rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                                  <Clock size={12} /> Pendiente
                                </span>
                              )}
                              {s.estado === 'Aprobada' && (
                                <span style={{ background: '#d1fae5', color: '#047857', padding: '0.25rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                                  <CheckCircle size={12} /> Aprobada
                                </span>
                              )}
                              {s.estado === 'Rechazada' && (
                                <span style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.25rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                                  <XCircle size={12} /> Rechazada
                                </span>
                              )}
                            </div>
                          </div>

                          <div style={{ fontSize: '0.85rem', color: '#334155', marginBottom: '0.3rem' }}>
                            <strong>Categoría:</strong> {s.categoria?.nombre || s.categoria?.nombre_categoria || `ID ${s.categoria_id}`}
                          </div>

                          {s.observaciones && (
                            <div style={{ fontSize: '0.8rem', color: '#475569', fontStyle: 'italic', background: 'rgba(255,255,255,0.7)', padding: '0.4rem', borderRadius: '4px', marginTop: '0.4rem' }}>
                              "{s.observaciones}"
                            </div>
                          )}

                          {s.estado === 'Rechazada' && s.motivo_rechazo && (
                            <div style={{ fontSize: '0.8rem', color: '#991b1b', marginTop: '0.5rem', fontWeight: 500, background: '#fee2e2', padding: '0.5rem', borderRadius: '4px' }}>
                              <strong>Motivo de rechazo:</strong> {s.motivo_rechazo}
                            </div>
                          )}

                          {s.estado === 'Aprobada' && (
                            <div style={{ fontSize: '0.8rem', color: '#047857', marginTop: '0.5rem', fontWeight: 500 }}>
                              ¡Estudiante inscrito con éxito! Ya puedes consultarlo en la gestión de pagos.
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PortalRepresentante;
