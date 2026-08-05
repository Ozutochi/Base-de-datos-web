import React, { useState, useEffect } from 'react';
import { Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import Modal from '../components/Modal';

interface Estudiante {
  id: number;
  nombre: string;
  apellido: string;
}

interface FichaMedica {
  id: number;
  tipo_sangre: string;
  alergias: string;
  condiciones_preexistentes: string;
  medicacion_actual: string;
  contacto_emergencia_nombre: string;
  contacto_emergencia_telefono: string;
  fecha_actualizacion: string;
  estudiante: Estudiante;
}

const FichasMedicasPage: React.FC = () => {
  const [fichas, setFichas] = useState<FichaMedica[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedStudentName, setSelectedStudentName] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    tipo_sangre: '',
    alergias: '',
    condiciones_preexistentes: '',
    medicacion_actual: '',
    contacto_emergencia_nombre: '',
    contacto_emergencia_telefono: ''
  });

  const fetchFichas = async () => {
    try {
      setLoading(true);
      const response = await api.get('/academico/fichas-medicas');
      setFichas(response.data);
    } catch (error) {
      console.error('Error fetching fichas:', error);
      toast.error('Error al cargar las fichas médicas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFichas();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openModal = (ficha: FichaMedica) => {
    setEditingId(ficha.id);
    setSelectedStudentName(`${ficha.estudiante?.nombre || ''} ${ficha.estudiante?.apellido || ''}`);
    setFormData({
      tipo_sangre: ficha.tipo_sangre || '',
      alergias: ficha.alergias || '',
      condiciones_preexistentes: ficha.condiciones_preexistentes || '',
      medicacion_actual: ficha.medicacion_actual || '',
      contacto_emergencia_nombre: ficha.contacto_emergencia_nombre || '',
      contacto_emergencia_telefono: ficha.contacto_emergencia_telefono || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.patch(`/academico/fichas-medicas/${editingId}`, formData);
        toast.success('Ficha médica actualizada exitosamente');
        setIsModalOpen(false);
        fetchFichas();
      }
    } catch (error: any) {
      console.error('Error saving ficha:', error);
      toast.error(error.response?.data?.message || 'Error al actualizar la ficha médica');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 className="page-title" style={{ margin: 0 }}>Fichas Médicas</h2>
          <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
            Las fichas médicas se generan automáticamente al inscribir un estudiante. Aquí puedes actualizarlas.
          </p>
        </div>
      </div>

      <div className="data-table-container">
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Cargando datos...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>Tipo de Sangre</th>
                <th>Alergias</th>
                <th>Contacto Emergencia</th>
                <th>Última Actualización</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {fichas.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>No hay fichas médicas registradas</td>
                </tr>
              ) : (
                fichas.map((ficha) => (
                  <tr key={ficha.id}>
                    <td style={{ fontWeight: 500 }}>
                      {ficha.estudiante ? `${ficha.estudiante.nombre} ${ficha.estudiante.apellido}` : 'Desconocido'}
                    </td>
                    <td>
                      <span style={{ 
                        background: '#eef2f6', 
                        color: 'var(--primary-blue)',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        {ficha.tipo_sangre || 'N/A'}
                      </span>
                    </td>
                    <td>{ficha.alergias ? 'Sí' : 'Ninguna'}</td>
                    <td>
                      {ficha.contacto_emergencia_nombre ? 
                        `${ficha.contacto_emergencia_nombre} (${ficha.contacto_emergencia_telefono})` : 
                        'No definido'}
                    </td>
                    <td>{new Date(ficha.fecha_actualizacion).toLocaleDateString()}</td>
                    <td>
                      <button className="action-btn edit" onClick={() => openModal(ficha)} title="Actualizar Ficha">
                        <Edit2 size={18} />
                      </button>
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
        title={`Ficha Médica: ${selectedStudentName}`}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tipo de Sangre</label>
            <input type="text" name="tipo_sangre" className="form-input" value={formData.tipo_sangre} onChange={handleInputChange} placeholder="Ej. O+, A-, N/A" required />
          </div>

          <div className="form-group">
            <label>Alergias</label>
            <textarea name="alergias" className="form-input" value={formData.alergias} onChange={handleInputChange} placeholder="Describa alergias o escriba 'Ninguna'" rows={2} />
          </div>

          <div className="form-group">
            <label>Condiciones Preexistentes</label>
            <textarea name="condiciones_preexistentes" className="form-input" value={formData.condiciones_preexistentes} onChange={handleInputChange} placeholder="Asma, problemas cardíacos, etc. o 'Ninguna'" rows={2} />
          </div>

          <div className="form-group">
            <label>Medicación Actual</label>
            <textarea name="medicacion_actual" className="form-input" value={formData.medicacion_actual} onChange={handleInputChange} placeholder="Medicamentos actuales o 'Ninguna'" rows={2} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <div className="form-group">
              <label>Contacto de Emergencia</label>
              <input type="text" name="contacto_emergencia_nombre" className="form-input" value={formData.contacto_emergencia_nombre} onChange={handleInputChange} placeholder="Nombre completo" required />
            </div>
            <div className="form-group">
              <label>Teléfono de Emergencia</label>
              <input type="text" name="contacto_emergencia_telefono" className="form-input" value={formData.contacto_emergencia_telefono} onChange={handleInputChange} placeholder="Teléfono" required />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontWeight: 600 }}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              Guardar Actualización
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FichasMedicasPage;
