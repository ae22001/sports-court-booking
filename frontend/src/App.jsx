import React, { useState, useEffect } from 'react';
import axios from 'react-dom'; // Asegúrate de mantener tu importación estándar de axios
import axiosInstance from 'axios';

const BOOKINGS_URL = 'http://localhost:8081/api/v1/bookings';
const COURTS_URL = 'http://localhost:8081/api/v1/courts';

function App() {
  const [bookings, setBookings] = useState([]);
  const [courts, setCourts] = useState([]);

  // Inputs Formulario Reserva (Soporta Creación y Edición)
  const [bookingIdToEdit, setBookingIdToEdit] = useState(null);
  const [isEditingBooking, setIsEditingBooking] = useState(false);
  const [courtId, setCourtId] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // Inputs Formulario Cancha
  const [courtIdToEdit, setCourtIdToEdit] = useState(null);
  const [courtName, setCourtName] = useState('');
  const [courtType, setCourtType] = useState('Grama Sintética');
  const [courtPrice, setCourtPrice] = useState('');
  const [isEditingCourt, setIsEditingCourt] = useState(false);

  // Alertas e Indicadores de Éxito
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [courtSuccess, setCourtSuccess] = useState('');

  const loadData = async () => {
    try {
      const responseBookings = await axiosInstance.get(BOOKINGS_URL);
      if (responseBookings && Array.isArray(responseBookings.data)) {
        setBookings(responseBookings.data);
      } else {
        setBookings([]);
      }
    } catch (err) {
      setBookings([]);
    }

    try {
      const responseCourts = await axiosInstance.get(COURTS_URL);
      if (responseCourts && Array.isArray(responseCourts.data)) {
        setCourts(responseCourts.data);
      } else {
        setCourts([]);
      }
    } catch (err) {
      setCourts([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCourtSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess(''); setCourtSuccess('');

    const courtPayload = {
      name: courtName,
      type: courtType,
      pricePerHour: parseFloat(courtPrice),
      isAvailable: true
    };

    try {
      if (isEditingCourt) {
        await axiosInstance.put(`${COURTS_URL}/${courtIdToEdit}`, courtPayload);
        setCourtSuccess(`¡Cancha actualizada con éxito!`);
        cancelCourtEdit();
      } else {
        await axiosInstance.post(COURTS_URL, courtPayload);
        setCourtSuccess(`¡Cancha "${courtName}" guardada con éxito!`);
        setCourtName(''); setCourtPrice('');
      }
      loadData();
    } catch (err) {
      setError('Error al procesar la operación en la tabla de canchas.');
    }
  };

  const handleEditCourtClick = (court) => {
    setCourtIdToEdit(court.id);
    setCourtName(court.name);
    setCourtType(court.type || 'Grama Sintética');
    setCourtPrice(court.pricePerHour);
    setIsEditingCourt(true);
  };

  const cancelCourtEdit = () => {
    setCourtIdToEdit(null);
    setCourtName('');
    setCourtPrice('');
    setIsEditingCourt(false);
  };

  const handleDeleteCourt = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta cancha?')) {
      try {
        await axiosInstance.delete(`${COURTS_URL}/${id}`);
        setCourtSuccess('Cancha eliminada correctamente.');
        loadData();
      } catch (err) {
        setError('No se puede borrar la cancha debido a restricciones de integridad en la base de datos.');
      }
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess(''); setCourtSuccess('');

    if (!courtId) {
      setError('Por favor, selecciona una cancha válida.');
      return;
    }

    const formattedStart = `${date}T${startTime}:00`;
    const formattedEnd = `${date}T${endTime}:00`;

    const bookingPayload = {
      userId: 1,
      courtId: parseInt(courtId),
      startTime: formattedStart,
      endTime: formattedEnd
    };

    try {
      if (isEditingBooking) {
        await axiosInstance.put(`${BOOKINGS_URL}/${bookingIdToEdit}`, bookingPayload);
        setSuccess('¡Reserva modificada y actualizada con éxito!');
        cancelBookingEdit();
      } else {
        await axiosInstance.post(BOOKINGS_URL, bookingPayload);
        setSuccess('¡Reserva registrada con éxito!');
        setCourtId(''); setDate(''); setStartTime(''); setEndTime('');
      }
      loadData();
    } catch (err) {
      setError(err.response?.data || 'La cancha elegida ya se encuentra ocupada en ese rango horario.');
    }
  };

  const handleEditBookingClick = (booking) => {
    setError(''); setSuccess('');
    setBookingIdToEdit(booking.id);
    setCourtId(booking.court?.id || booking.courtId || '');

    if (booking.startTime) {
      const parts = booking.startTime.split('T');
      setDate(parts[0]);
      if (parts[1]) setStartTime(parts[1].substring(0, 5));
    }
    if (booking.endTime && booking.endTime.includes('T')) {
      setEndTime(booking.endTime.split('T')[1].substring(0, 5));
    }

    setIsEditingBooking(true);
  };

  const cancelBookingEdit = () => {
    setBookingIdToEdit(null);
    setCourtId(''); setDate(''); setStartTime(''); setEndTime('');
    setIsEditingBooking(false);
  };

  const handleCancelBooking = async (id) => {
    if (window.confirm('¿Seguro que deseas cancelar permanentemente esta reserva?')) {
      try {
        await axiosInstance.delete(`${BOOKINGS_URL}/${id}`);
        setSuccess('Reserva cancelada y removida con éxito.');
        loadData();
        if (isEditingBooking && bookingIdToEdit === id) cancelBookingEdit();
      } catch (err) {
        setError('No se pudo dar de baja el turno.');
      }
    }
  };

  const formatFecha = (fechaString) => {
    if (!fechaString) return '';
    try {
      return new Date(fechaString).toLocaleString('es-SV', { dateStyle: 'short', timeStyle: 'short' });
    } catch (e) {
      return fechaString;
    }
  };

  return (
      <div className="app-wrapper">
        <header className="main-header">
          <div className="header-container">
            <div className="logo">
              <div className="logo-text">
                <span>SPORTS COURT BOOKING</span>
                <small style={{ fontSize: '0.9rem', fontWeight: '400', opacity: 0.9 }}>
                  Sistema de reservas de canchas
                </small>
              </div>
            </div>
          </div>
        </header>

        <main className="main-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* TABLA DE GESTIÓN DE CANCHAS */}
            <section className="form-section">
              <div className="section-header">
                <h2>{isEditingCourt ? 'Modificar Cancha' : '1. Registrar Cancha'}</h2>
              </div>

              {courtSuccess && (
                  <div style={{ backgroundColor: '#ffffff', color: '#166534', padding: '0.65rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: '600' }}>
                    ⚽ {courtSuccess}
                  </div>
              )}

              <form onSubmit={handleCourtSubmit}>
                <div className="form-group">
                  <label>Nombre del Escenario</label>
                  <input type="text" placeholder="Ej: Cancha de Tenis" value={courtName} onChange={(e) => setCourtName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Tipo de Superficie</label>
                  <select value={courtType} onChange={(e) => setCourtType(e.target.value)} required>
                    <option value="Grama Sintética">Grama Sintética</option>
                    <option value="Básquetbol / Concreto">Básquetbol / Concreto</option>
                    <option value="Fútsal Rápido">Fútsal Rápido</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Precio por Hora ($)</label>
                  <input type="number" step="0.01" placeholder="30.00" value={courtPrice} onChange={(e) => setCourtPrice(e.target.value)} required />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-warning" style={{ fontWeight: '700' }}>
                    {isEditingCourt ? 'Actualizar Cancha' : 'Guardar Cancha'}
                  </button>
                  {isEditingCourt && (
                      <button type="button" className="btn btn-secondary" onClick={cancelCourtEdit}>
                        Cancelar
                      </button>
                  )}
                </div>
              </form>

              <div style={{ marginTop: '1.5rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#ffffff', display: 'block', marginBottom: '0.5rem' }}>Canchas Disponibles en el Sistema</label>
                {courts.length === 0 ? <small className="text-muted">No existen escenarios creados.</small> : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {courts.map(c => (
                          <li key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.4rem 0', fontSize: '0.85rem', borderBottom: '1px dashed #eee' }}>
                            <span><strong>{c.name}</strong> ({c.type} - ${c.pricePerHour}/hr)</span>
                            <div>
                              <button onClick={() => handleEditCourtClick(c)} style={{ backgroundColor: 'transparent', color: '#2563eb', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginRight: '0.5rem' }}>Editar</button>
                              <button onClick={() => handleDeleteCourt(c.id)} style={{ backgroundColor: 'transparent', color: '#dc2626', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Borrar</button>
                            </div>
                          </li>
                      ))}
                    </ul>
                )}
              </div>
            </section>

            {/* FORMULARIO DE RESERVA DE TURNOS (CREAR / EDITAR) */}
            <section className="form-section">
              <div className="section-header">
                <h2>{isEditingBooking ? 'Modificar Turno Seleccionado' : '2. Reservar Turno'}</h2>
              </div>

              {error && (
                  <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '0.65rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: '600' }}>
                    ⚠️ {error}
                  </div>
              )}
              {success && (
                  <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.65rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: '600' }}>
                    ✅ {success}
                  </div>
              )}

              <form onSubmit={handleBookingSubmit}>
                <div className="form-group">
                  <label>Seleccionar Cancha</label>
                  <select value={courtId} onChange={(e) => setCourtId(e.target.value)} required>
                    <option value="">-- Selecciona --</option>
                    {courts.map(court => (
                        <option key={court.id} value={court.id}>{court.name} (${court.pricePerHour}/hr)</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Fecha</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label>Hora Inicio</label>
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Hora Fin</label>
                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                  </div>
                </div>
                <div className="form-actions" style={{ marginTop: '0.5rem' }}>
                  <button type="submit" className={`btn ${isEditingBooking ? 'btn-warning' : 'btn-primary'}`} style={{ width: '100%', fontWeight: '700' }}>
                    {isEditingBooking ? '💾 Actualizar Cambios del Alquiler' : 'Agendar Nueva Reserva'}
                  </button>
                  {isEditingBooking && (
                      <button type="button" className="btn btn-secondary" style={{ width: '100%' }} onClick={cancelBookingEdit}>
                        Cancelar Edición
                      </button>
                  )}
                </div>
              </form>
            </section>
          </div>

          {/* HISTORIAL GENERAL DE RESERVAS */}
          <section className="list-section">
            <div className="section-header">
              <h2>Historial General de Reservas</h2>
              <span className="counter">Total: {bookings.length}</span>
            </div>

            {bookings.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">⚽</div>
                  <p>No se registran turnos agendados en la base de datos.</p>
                </div>
            ) : (
                <>
                  {/* RESPONSIVE CARDS (MOBILE) */}
                  <div className="cards-grid">
                    {bookings.map(b => (
                        <div key={b.id} className="court-card">
                          <div className="card-header-row">
                            <h3>
                              {b.court?.name || courts.find(c => c.id === b.courtId)?.name || `Escenario (ID: ${b.courtId})`}
                            </h3>
                            <span className="card-id">#{b.id}</span>
                          </div>
                          <div className="card-text"><strong>Inicio:</strong> {formatFecha(b.startTime)}</div>
                          <div className="card-text"><strong>Fin:</strong> {formatFecha(b.endTime)}</div>
                          <div className="card-actions" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.75rem' }}>
                            <button className="btn-action edit-action" style={{ backgroundColor: '#2563eb', color: '#0b0000', border: 'none', padding: '0.35rem', borderRadius: '0.25rem', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => handleEditBookingClick(b)}>Editar</button>
                            <button className="btn-action delete-action" onClick={() => handleCancelBooking(b.id)}>Eliminar</button>
                          </div>
                        </div>
                    ))}
                  </div>

                  {/* RESPONSIVE TABLE (DESKTOP) */}
                  <div className="table-container">
                    <table className="responsive-table">
                      <thead>
                      <tr>
                        <th>ID</th>
                        <th>Escenario</th>
                        <th>Hora Entrada</th>
                        <th>Hora Salida</th>
                        <th style={{ textAlign: 'right', paddingRight: '1.5rem' }}>Operación</th>
                      </tr>
                      </thead>
                      <tbody>
                      {bookings.map(b => (
                          <tr key={b.id}>
                            <td className="cell-id">#{b.id}</td>
                            <td className="cell-name">
                              {b.court?.name || courts.find(c => c.id === b.courtId)?.name || `Escenario (ID: ${b.courtId})`}
                            </td>
                            <td>{formatFecha(b.startTime)}</td>
                            <td>{formatFecha(b.endTime)}</td>
                            <td className="cell-actions" style={{ textAlign: 'right' }}>
                              <button className="table-btn" style={{ backgroundColor: '#2563eb', marginRight: '0.5rem' }} onClick={() => handleEditBookingClick(b)}>
                                Editar
                              </button>
                              <button className="table-btn table-btn-delete" onClick={() => handleCancelBooking(b.id)}>
                                Eliminar
                              </button>
                            </td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                </>
            )}
          </section>
        </main>
      </div>
  );
}

export default App;