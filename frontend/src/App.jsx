import { useState } from 'react';

function App() {
  // 1. Mock Data Inicial (Simulación de GET)
  const [mockCourts, setMockCourts] = useState([
    { id: 1, name: "Estadio Cuscatlán (Auxiliar)", type: "Grama Natural", pricePerHour: 45.00 },
    { id: 2, name: "Fusalmo Central", type: "Grama Sintética", pricePerHour: 25.00 },
    { id: 3, name: "Gimnasio Nacional - Duela", type: "Duela (Tabloncillo)", pricePerHour: 35.00 }
  ]);

  // Estados para controlar los campos del formulario
  const [courtId, setCourtId] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('Grama Sintética');
  const [pricePerHour, setPricePerHour] = useState('');

  // Estado para saber si estamos editando (Modo PUT) o creando (Modo POST)
  const [isEditing, setIsEditing] = useState(false);

  // 2. Operación: CREAR o EDITAR (Simulación POST / PUT)
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const priceParsed = parseFloat(pricePerHour);

    if (isEditing) {
      // Simulación PUT
      setMockCourts(mockCourts.map(court => 
        court.id === parseInt(courtId) 
          ? { id: parseInt(courtId), name, type, pricePerHour: priceParsed } 
          : court
      ));
      alert(`[Simulación PUT] Registro con ID ${courtId} modificado exitosamente.`);
    } else {
      // Simulación POST
      const newId = mockCourts.length > 0 ? Math.max(...mockCourts.map(c => c.id)) + 1 : 1;
      const newCourt = { id: newId, name, type, pricePerHour: priceParsed };
      setMockCourts([...mockCourts, newCourt]);
      alert(`[Simulación POST] Nueva cancha registrada con ID asignado: ${newId}.`);
    }

    resetForm();
  };

  // 3. Preparar Interfaz para Edición (Cambio visual a modo PUT)
  const prepareEdit = (court) => {
    setCourtId(court.id);
    setName(court.name);
    setType(court.type);
    setPricePerHour(court.pricePerHour);
    setIsEditing(true);

    // Scroll suave hacia el formulario en pantallas móviles
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 4. Operación: ELIMINAR
  const deleteItem = (id) => {
    if (window.confirm(`¿Estás seguro de que deseas simular el DELETE para el registro #${id}?`)) {
      setMockCourts(mockCourts.filter(court => court.id !== id));
      alert(`[Simulación DELETE] Registro #${id} removido.`);
      
      // Si estábamos editando la cancha que se eliminó, limpiamos el formulario
      if (courtId === id) {
        resetForm();
      }
    }
  };

  // Limpiar el estado del formulario
  const resetForm = () => {
    setCourtId('');
    setName('');
    setType('Grama Sintética');
    setPricePerHour('');
    setIsEditing(false);
  };

  return (
    <div className="app-wrapper">
      {/* CABECERA */}
     <header className="main-header">
  <div className="header-container">
    <h1 className="logo">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 100 60" 
        style={{ width: '65px', height: '45px', fill: 'none', stroke: '#ffffff', strokeWidth: '2.5', strokeLinejoin: 'round' }}
      >
        {/* Postes y red trasera de la portería */}
        <rect x="10" y="10" width="80" height="45" rx="2" />
        <path d="M 10 10 L 25 25 L 75 25 L 90 10" strokeWidth="1.5" strokeDasharray="3,3" />
        <path d="M 25 25 L 25 55 M 75 25 L 75 55" strokeWidth="1.5" strokeDasharray="3,3" />
        {/* Red cuadriculada */}
        <path d="M 20 10 L 20 55 M 30 10 L 30 55 M 40 10 L 40 55 M 50 10 L 50 55 M 60 10 L 60 55 M 70 10 L 70 55 M 80 10 L 80 55" strokeWidth="1" opacity="0.4" />
        <path d="M 10 20 L 90 20 M 10 30 L 90 30 M 10 40 L 90 40 M 10 50 L 90 50" strokeWidth="1" opacity="0.4" />
        {/* Balón de fútbol en el ángulo inferior izquierdo */}
        <circle cx="28" cy="43" r="7" fill="#ffffff" stroke="#15803d" strokeWidth="1.5" />
        <circle cx="28" cy="43" r="2" fill="#15803d" />
        <path d="M 28 41 L 28 36 M 28 45 L 28 50 M 26 43 L 21 43 M 30 43 L 35 43" stroke="#15803d" strokeWidth="1" />
      </svg>
      
      {/* Texto estructurado en dos líneas */}
      <div className="logo-text">
        <span>Sports</span>
        <span style={{ fontWeight: '400', opacity: '0.95' }}>court Booking</span>
      </div>
    </h1>
    
  </div>
</header>

      {/* CONTENEDOR PRINCIPAL */}
      <main className="main-content">
        
        {/* SECCIÓN FORMULARIO */}
        <section className="form-section">
          <div className="section-header">
            <h2>{isEditing ? "Modificar Cancha" : "Registrar Nueva Cancha"}</h2>
            
        
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="court-name">Nombre de la Cancha</label>
              <input 
                type="text" 
                id="court-name" 
                required 
                placeholder="Ej: Cancha Central Los Próceres"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="court-type">Tipo de Superficie</label>
              <select 
                id="court-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Grama Sintética">Grama Sintética</option>
                <option value="Grama Natural">Grama Natural</option>
                <option value="Cemento">Cemento</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="court-price">Precio por Hora ($)</label>
              <input 
                type="number" 
                step="0.01" 
                id="court-price" 
                required 
                placeholder="0.00"
                value={pricePerHour}
                onChange={(e) => setPricePerHour(e.target.value)}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className={`btn ${isEditing ? 'btn-warning' : 'btn-primary'}`}>
                {isEditing ? "Actualizar Registro" : "Guardar Registro"}
              </button>
              {isEditing && (
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancelar Edición
                </button>
              )}
            </div>
          </form>
        </section>

        {/* SECCIÓN LISTADO */}
        <section className="list-section">
          <div className="section-header">
            <h2>Listado de Reservas</h2>
            <span className="counter">{mockCourts.length} registro(s) cargado(s)</span>
          </div>

          {/* Estado vacío simulado */}
          {mockCourts.length === 0 ? (
            <div className="empty-state">
              <p className="empty-icon">📋</p>
              <p>No hay canchas registradas.</p>
            </div>
          ) : (
            <>
              {/* VISTA MOBILE: Tarjetas apiladas (Controlado por CSS) */}
              <div className="cards-grid">
                {mockCourts.map(court => (
                  <div className="court-card" key={court.id}>
                    <div className="card-body">
                      <div className="card-header-row">
                        <h3>{court.name}</h3>
                        <span className="card-id">ID: {court.id}</span>
                      </div>
                      <p className="card-text"><strong>Superficie:</strong> {court.type}</p>
                      <p className="card-price">${court.pricePerHour.toFixed(2)} / hr</p>
                    </div>
                    <div className="card-actions">
                      <button onClick={() => prepareEdit(court)} className="btn-action edit-action">
                        Editar 
                      </button>
                      <button onClick={() => deleteItem(court.id)} className="btn-action delete-action">
                        Eliminar 
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* VISTA DESKTOP: Tabla estructurada (Controlado por CSS) */}
              <div className="table-container">
                <table className="responsive-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Superficie</th>
                      <th>Precio / Hora</th>
                      <th className="text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockCourts.map(court => (
                      <tr key={court.id}>
                        <td className="cell-id">#{court.id}</td>
                        <td className="cell-name">{court.name}</td>
                        <td>{court.type}</td>
                        <td className="cell-price">${court.pricePerHour.toFixed(2)}</td>
                        <td className="cell-actions">
                          <button onClick={() => prepareEdit(court)} className="table-btn table-btn-edit">
                            Editar
                          </button>
                          <button onClick={() => deleteItem(court.id)} className="table-btn table-btn-delete">
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

      {/* FOOTER */}
      <footer className="main-footer">
        Cancha SV Prototipo • Cumplimiento de Requerimientos de Interfaz (React)
      </footer>
    </div>
  );
}

export default App;