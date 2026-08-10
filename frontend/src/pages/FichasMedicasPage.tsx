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
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default FichasMedicasPage;
