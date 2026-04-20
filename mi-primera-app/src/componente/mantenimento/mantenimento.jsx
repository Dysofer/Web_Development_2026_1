import { useState } from 'react'
import './mantenimento.css'
import suzukiLogo from '../../assets/LOGO_SUZUKI.png'
import icoCarroPng from '../../assets/carro.png'
import icoMotoPng from '../../assets/moto.png'

const VehicleIcon = ({ tipo, size = 20 }) => (
  <img
    src={tipo === 'moto' ? icoMotoPng : icoCarroPng}
    alt={tipo}
    style={{ width: size, height: size, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.85 }}
  />
)

/* ─────────────── MODALES ─────────────── */

const Modal = ({ title, onClose, children }) => (
  <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
    <div className="modal">
      <div className="modal-header">
        <h3>{title}</h3>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
      {children}
    </div>
  </div>
)

const ModalDocumento = ({ onClose, onSave, vehicles, defaultVehicle }) => {
  const [form, setForm] = useState({ vehiculoPlaca: defaultVehicle || vehicles[0]?.placa || '', tipo: 'SOAT', nombre: '', fecha: '' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  return (
    <Modal title="Nuevo Documento" onClose={onClose}>
      {vehicles.length > 0 && (
        <div className="form-group">
          <label className="form-label">Vehículo</label>
          <select className="form-select" value={form.vehiculoPlaca} onChange={e => set('vehiculoPlaca', e.target.value)}>
            {vehicles.map(v => <option key={v.placa} value={v.placa}>{v.tipo === 'moto' ? '🏍' : '🚗'} {v.marca} {v.modelo} · {v.placa}</option>)}
          </select>
        </div>
      )}
      <div className="form-group">
        <label className="form-label">Tipo de Documento</label>
        <select className="form-select" value={form.tipo} onChange={e => set('tipo', e.target.value)}>
          {['SOAT', 'Seguro', 'Impuestos', 'Licencia', 'Otro'].map(t => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Nombre (opcional)</label>
        <input className="form-input" placeholder="SOAT 2025" value={form.nombre} onChange={e => set('nombre', e.target.value)} />
      </div>
      <div className="form-group">
        <label className="form-label">Fecha de Vencimiento</label>
        <input type="date" className="form-input" value={form.fecha} onChange={e => set('fecha', e.target.value)} />
      </div>
      <button className="btn-save" onClick={() => onSave({ ...form, nombre: form.nombre || form.tipo })}>
        Guardar Documento
      </button>
    </Modal>
  )
}

const ModalMantenimiento = ({ onClose, onSave, vehicles, defaultVehicle }) => {
  const [form, setForm] = useState({ vehiculoPlaca: defaultVehicle || vehicles[0]?.placa || '', tipo: '', desc: '', fecha: '', costo: '', km: '', kmProx: '' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  return (
    <Modal title="Nuevo Mantenimiento" onClose={onClose}>
      {vehicles.length > 0 && (
        <div className="form-group">
          <label className="form-label">Vehículo</label>
          <select className="form-select" value={form.vehiculoPlaca} onChange={e => set('vehiculoPlaca', e.target.value)}>
            {vehicles.map(v => <option key={v.placa} value={v.placa}>{v.tipo === 'moto' ? '🏍' : '🚗'} {v.marca} {v.modelo} · {v.placa}</option>)}
          </select>
        </div>
      )}
      <div className="form-group">
        <label className="form-label">Tipo de Servicio</label>
        <input className="form-input" placeholder="Ej: Cambio de aceite" value={form.tipo} onChange={e => set('tipo', e.target.value)} />
      </div>
      <div className="form-group">
        <label className="form-label">Descripción</label>
        <input className="form-input" placeholder="Detalles del servicio" value={form.desc} onChange={e => set('desc', e.target.value)} />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Fecha</label>
          <input type="date" className="form-input" value={form.fecha} onChange={e => set('fecha', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Costo ($)</label>
          <input type="number" className="form-input" placeholder="0" value={form.costo} onChange={e => set('costo', e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Km al servicio</label>
          <input type="number" className="form-input" placeholder="0" value={form.km} onChange={e => set('km', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Próximo (Km)</label>
          <input type="number" className="form-input" placeholder="0" value={form.kmProx} onChange={e => set('kmProx', e.target.value)} />
        </div>
      </div>
      <button className="btn-save" onClick={() => form.tipo && onSave(form)}>
        Guardar Mantenimiento
      </button>
    </Modal>
  )
}

const ModalGasto = ({ onClose, onSave, vehicles, defaultVehicle }) => {
  const [form, setForm] = useState({ vehiculoPlaca: defaultVehicle || vehicles[0]?.placa || '', cat: 'Combustible', desc: '', fecha: '', monto: '' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  return (
    <Modal title="Nuevo Gasto" onClose={onClose}>
      {vehicles.length > 0 && (
        <div className="form-group">
          <label className="form-label">Vehículo</label>
          <select className="form-select" value={form.vehiculoPlaca} onChange={e => set('vehiculoPlaca', e.target.value)}>
            {vehicles.map(v => <option key={v.placa} value={v.placa}>{v.tipo === 'moto' ? '🏍' : '🚗'} {v.marca} {v.modelo} · {v.placa}</option>)}
          </select>
        </div>
      )}
      <div className="form-group">
        <label className="form-label">Categoría</label>
        <select className="form-select" value={form.cat} onChange={e => set('cat', e.target.value)}>
          {['Combustible', 'Mantenimiento', 'Seguro', 'Impuestos', 'Otro'].map(t => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Descripción</label>
        <input className="form-input" placeholder="Ej: Gasolina extra" value={form.desc} onChange={e => set('desc', e.target.value)} />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Fecha</label>
          <input type="date" className="form-input" value={form.fecha} onChange={e => set('fecha', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Monto ($)</label>
          <input type="number" className="form-input" placeholder="0" value={form.monto} onChange={e => set('monto', e.target.value)} />
        </div>
      </div>
      <button className="btn-save" onClick={() => onSave({ ...form, desc: form.desc || form.cat })}>
        Guardar Gasto
      </button>
    </Modal>
  )
}

const ModalTaller = ({ onClose, onSave }) => {
  const [form, setForm] = useState({ nombre: '', dir: '', tel: '', contacto: '', esp: '', notas: '' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  return (
    <Modal title="Nuevo Taller" onClose={onClose}>
      <div className="form-group">
        <label className="form-label">Nombre del Taller</label>
        <input className="form-input" placeholder="Taller Los Amigos" value={form.nombre} onChange={e => set('nombre', e.target.value)} />
      </div>
      <div className="form-group">
        <label className="form-label">Dirección</label>
        <input className="form-input" placeholder="Cra 50 #30-20" value={form.dir} onChange={e => set('dir', e.target.value)} />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Teléfono</label>
          <input className="form-input" placeholder="+57 300 123 4567" value={form.tel} onChange={e => set('tel', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Contacto</label>
          <input className="form-input" placeholder="Nombre" value={form.contacto} onChange={e => set('contacto', e.target.value)} />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Especialidad</label>
        <input className="form-input" placeholder="Ej: Frenos, Motor, General" value={form.esp} onChange={e => set('esp', e.target.value)} />
      </div>
      <div className="form-group">
        <label className="form-label">Notas</label>
        <textarea className="form-textarea" placeholder="Observaciones adicionales" value={form.notas} onChange={e => set('notas', e.target.value)} />
      </div>
      <button className="btn-save" onClick={() => form.nombre && onSave(form)}>
        Guardar Taller
      </button>
    </Modal>
  )
}

/* ─── Catálogo de marcas y modelos ─── */
const CATALOGO = {
  carro: {
    Toyota:     ['Corolla', 'Camry', 'Hilux', 'RAV4', 'Fortuner', 'Yaris', 'Prado'],
    Chevrolet:  ['Spark', 'Onix', 'Tracker', 'Equinox', 'Captiva', 'Sail', 'Blazer'],
    Renault:    ['Logan', 'Sandero', 'Duster', 'Kwid', 'Stepway', 'Koleos', 'Clio'],
    Mazda:      ['Mazda2', 'Mazda3', 'Mazda6', 'CX-3', 'CX-5', 'CX-9', 'BT-50'],
    Hyundai:    ['Tucson', 'Santa Fe', 'i10', 'i20', 'Elantra', 'Creta', 'Ioniq'],
    Kia:        ['Picanto', 'Rio', 'Sportage', 'Sorento', 'Seltos', 'Stinger', 'Soul'],
    Ford:       ['Fiesta', 'Focus', 'Escape', 'Explorer', 'Mustang', 'Ranger', 'EcoSport'],
    Volkswagen: ['Polo', 'Golf', 'Jetta', 'Tiguan', 'Touareg', 'Passat', 'T-Cross'],
    BMW:        ['Serie 1', 'Serie 3', 'Serie 5', 'Serie 7', 'X1', 'X3', 'X5'],
    Mercedes:   ['Clase A', 'Clase C', 'Clase E', 'GLA', 'GLC', 'GLE', 'Sprinter'],
    Nissan:     ['March', 'Sentra', 'Versa', 'X-Trail', 'Qashqai', 'Frontier', 'Kicks'],
    Suzuki:     ['Swift', 'Vitara', 'Jimny', 'Baleno', 'Ertiga', 'S-Presso', 'Ignis'],
    Honda:      ['Civic', 'Accord', 'CR-V', 'HR-V', 'Pilot', 'Fit', 'WR-V'],
    Audi:       ['A1', 'A3', 'A4', 'A6', 'Q3', 'Q5', 'Q7'],
    Jeep:       ['Wrangler', 'Cherokee', 'Grand Cherokee', 'Compass', 'Renegade'],
    Otro:       ['Otro modelo'],
  },
  moto: {
    Honda:      ['CB190R', 'CB300R', 'CBR600RR', 'CRF300L', 'XR150L', 'CB500F', 'Wave'],
    Yamaha:     ['FZ25', 'MT-03', 'R3', 'XTZ150', 'XTZ250', 'NMAX', 'Crypton'],
    Suzuki:     ['GN125', 'GS150', 'GSX-R150', 'V-Strom 650', 'Gixxer', 'Burgman'],
    Kawasaki:   ['Ninja 300', 'Ninja 400', 'Z400', 'Versys 300', 'KLX150', 'Z650'],
    KTM:        ['Duke 200', 'Duke 390', 'RC390', 'Adventure 390', 'EXC 300'],
    BMW:        ['G 310 R', 'G 310 GS', 'F 850 GS', 'S 1000 RR', 'R 1250 GS'],
    'Royal Enfield': ['Meteor 350', 'Classic 350', 'Bullet 350', 'Himalayan', 'Interceptor 650'],
    AKT:        ['TTR 200', 'NKD 125', 'Dynamic 125', 'TT 180 R', 'CR5 200'],
    Auteco:     ['Pulsar NS200', 'Pulsar RS200', 'Discover 125', 'Platina 110'],
    TVS:        ['Apache RTR 200', 'Apache RTR 160', 'Star City', 'Ntorq 125'],
    Otro:       ['Otro modelo'],
  },
}

const ModalVehiculo = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    tipo: 'carro', placa: '', marca: '', modelo: '', anio: '', km: '0'
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const marcas = Object.keys(CATALOGO[form.tipo])
  const modelos = form.marca ? (CATALOGO[form.tipo][form.marca] || []) : []

  const handleTipo = (tipo) => {
    setForm(f => ({ ...f, tipo, marca: '', modelo: '' }))
  }
  const handleMarca = (marca) => {
    setForm(f => ({ ...f, marca, modelo: '' }))
  }

  const anioActual = new Date().getFullYear()
  const anios = Array.from({ length: 30 }, (_, i) => anioActual - i)

  return (
    <Modal title="Nuevo Vehículo" onClose={onClose}>

      {/* Tipo */}
      <div className="form-group">
        <label className="form-label">Tipo de Vehículo</label>
        <div className="tipo-selector">
          <button
            type="button"
            className={`tipo-btn ${form.tipo === 'carro' ? 'active' : ''}`}
            onClick={() => handleTipo('carro')}
          >
            <VehicleIcon tipo="carro" size={18} /> Carro
          </button>
          <button
            type="button"
            className={`tipo-btn ${form.tipo === 'moto' ? 'active' : ''}`}
            onClick={() => handleTipo('moto')}
          >
            <VehicleIcon tipo="moto" size={18} /> Moto
          </button>
        </div>
      </div>

      {/* Placa */}
      <div className="form-group">
        <label className="form-label">Placa</label>
        <input
          className="form-input"
          placeholder="ABC-123"
          value={form.placa}
          onChange={e => set('placa', e.target.value.toUpperCase())}
        />
      </div>

      {/* Marca */}
      <div className="form-group">
        <label className="form-label">Marca</label>
        <select className="form-select" value={form.marca} onChange={e => handleMarca(e.target.value)}>
          <option value="">— Selecciona marca —</option>
          {marcas.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      {/* Modelo */}
      <div className="form-group">
        <label className="form-label">Modelo</label>
        <select
          className="form-select"
          value={form.modelo}
          onChange={e => set('modelo', e.target.value)}
          disabled={!form.marca}
        >
          <option value="">— Selecciona modelo —</option>
          {modelos.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      {/* Año y Km */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Año</label>
          <select className="form-select" value={form.anio} onChange={e => set('anio', e.target.value)}>
            <option value="">— Año —</option>
            {anios.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Kilometraje</label>
          <input
            type="number"
            className="form-input"
            placeholder="0"
            value={form.km}
            onChange={e => set('km', e.target.value)}
          />
        </div>
      </div>

      <button
        className="btn-save"
        onClick={() => form.placa && form.marca && form.modelo && onSave(form)}
      >
        Guardar Vehículo
      </button>
    </Modal>
  )
}

/* ─────────────── PANTALLAS ─────────────── */

const DOC_ICONS = { SOAT: '📋', Seguro: '🛡', Impuestos: '🏛', Licencia: '🪪', Otro: '📄' }
const GASTO_ICONS = { Combustible: '⛽', Mantenimiento: '🔧', Seguro: '🛡', Impuestos: '🏛', Otro: '💸' }

const EmptyState = ({ icon, title, sub }) => (
  <div className="empty-state">
    <div className="empty-icon">{icon}</div>
    <h3>{title}</h3>
    {sub && <p>{sub}</p>}
  </div>
)

const BottomNav = ({ active, onNavigate }) => {
  const tabs = [
    {
      id: 'dashboard', label: 'Inicio',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
    },
    {
      id: 'docs', label: 'Docs',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>
    },
    {
      id: 'mant', label: 'Manto.',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
    },
    {
      id: 'gastos', label: 'Gastos',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 000 4h4a2 2 0 010 4H8"/><line x1="12" y1="6" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="18"/></svg>
    },
    {
      id: 'more', label: 'Más',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    },
  ]
  return (
    <nav className="bottom-nav">
      {tabs.map(t => (
        <button key={t.id} className={`nav-item ${active === t.id ? 'active' : ''}`} onClick={() => onNavigate(t.id)}>
          <span className="nav-icon">{t.icon}</span>
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  )
}

/* Dashboard */
const IcoKm = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 8v4l2.5 2.5"/>
    <path d="M6.3 6.3l1.4 1.4"/>
  </svg>
)
const IcoDocs = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="9" y1="13" x2="15" y2="13"/>
    <line x1="9" y1="17" x2="13" y2="17"/>
  </svg>
)
const IcoMant = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
  </svg>
)
const IcoGastos = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M16 8h-6a2 2 0 000 4h4a2 2 0 010 4H8"/>
    <line x1="12" y1="6" x2="12" y2="8"/>
    <line x1="12" y1="16" x2="12" y2="18"/>
  </svg>
)

const Dashboard = ({ docs, mant, gastos, vehicles, activeVehicle, onSetActive, onNavigate, onOpenVehicle }) => {
  const totalGastos = gastos.reduce((s, g) => s + Number(g.monto || 0), 0)
  const kmActual = activeVehicle ? Number(activeVehicle.km).toLocaleString() : '0'
  const docsVehicle = activeVehicle ? docs.filter(d => d.vehiculoPlaca === activeVehicle.placa).length : docs.length
  const mantVehicle = activeVehicle ? mant.filter(m => m.vehiculoPlaca === activeVehicle.placa).length : mant.length
  const gastosVehicle = activeVehicle ? gastos.filter(g => g.vehiculoPlaca === activeVehicle.placa).reduce((s, g) => s + Number(g.monto || 0), 0) : totalGastos

  return (
    <div className="screen">
      <div className="top-bar">
        <div>
          <h2>Mantenimiento Vehicular</h2>
          <p>{vehicles.length === 0 ? 'Configura tu vehículo' : `${vehicles.length} vehículo${vehicles.length > 1 ? 's' : ''} registrado${vehicles.length > 1 ? 's' : ''}`}</p>
        </div>
        <button className="icon-btn icon-btn-logo" onClick={onOpenVehicle} title="Agregar vehículo">
          <img src={suzukiLogo} alt="Logo" />
        </button>
      </div>
      <div className="screen-content">

        {vehicles.length > 0 && (
          <div className="vehicle-selector-bar">
            <label className="form-label" style={{ marginBottom: '6px', display: 'block' }}>Vehículo activo</label>
            <select
              className="form-select"
              value={activeVehicle?.placa || ''}
              onChange={e => onSetActive(e.target.value)}
            >
              {vehicles.map(v => (
                <option key={v.placa} value={v.placa}>
                  {v.tipo === 'moto' ? '🏍' : '🚗'} {v.marca} {v.modelo} · {v.placa}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-svg"><IcoKm /></span>
            <div className="stat-label">Kilometraje</div>
            <div className="stat-value">{kmActual}</div>
          </div>
          <div className="stat-card">
            <span className="stat-svg"><IcoDocs /></span>
            <div className="stat-label">Documentos</div>
            <div className="stat-value">{docsVehicle}</div>
          </div>
          <div className="stat-card">
            <span className="stat-svg"><IcoMant /></span>
            <div className="stat-label">Mantenimientos</div>
            <div className="stat-value">{mantVehicle}</div>
          </div>
          <div className="stat-card">
            <span className="stat-svg"><IcoGastos /></span>
            <div className="stat-label">Gastos Total</div>
            <div className="stat-value">${gastosVehicle.toLocaleString()}</div>
          </div>
        </div>
        <div className="section-title">Acceso Rápido</div>
        <div className="quick-list">
          <div className="quick-item" onClick={() => onNavigate('docs')}>
            <div className="quick-icon blue-bg"><IcoDocs /></div>
            <div className="quick-text"><strong>Documentos</strong><span>SOAT, seguros, impuestos, licencia</span></div>
            <span className="chevron">›</span>
          </div>
          <div className="quick-item" onClick={() => onNavigate('mant')}>
            <div className="quick-icon orange-bg"><IcoMant /></div>
            <div className="quick-text"><strong>Mantenimiento</strong><span>Historial de servicios</span></div>
            <span className="chevron">›</span>
          </div>
          <div className="quick-item" onClick={() => onNavigate('gastos')}>
            <div className="quick-icon green-bg"><IcoGastos /></div>
            <div className="quick-text"><strong>Gastos</strong><span>Control de gastos y multas</span></div>
            <span className="chevron">›</span>
          </div>
        </div>
      </div>
      <BottomNav active="dashboard" onNavigate={onNavigate} />
    </div>
  )
}

/* Documentos */
const Documentos = ({ docs, onNavigate, onAdd }) => (
  <div className="screen">
    <div className="top-bar">
      <div><h2>Documentos</h2><p>Gestiona tus documentos vehiculares</p></div>
      <button className="icon-btn accent" onClick={onAdd}>+ Agregar</button>
    </div>
    <div className="screen-content">
      {docs.length === 0
        ? <EmptyState icon="📋" title="No hay documentos registrados" sub="Agrega tu SOAT, seguro o licencia" />
        : <div className="item-list">
            {docs.map((d, i) => (
              <div key={i} className="item-card">
                <div className="item-icon blue-bg">{DOC_ICONS[d.tipo] || '📄'}</div>
                <div className="item-body">
                  <strong>{d.nombre}</strong>
                  <span>{d.tipo}{d.fecha ? ` · Vence: ${d.fecha}` : ''}{d.vehiculoPlaca ? ` · ${d.vehiculoPlaca}` : ''}</span>
                </div>
                <span className="badge badge-ok">Activo</span>
              </div>
            ))}
          </div>
      }
    </div>
    <BottomNav active="docs" onNavigate={onNavigate} />
  </div>
)

/* Mantenimiento */
const Mantenimientos = ({ mant, onNavigate, onAdd }) => (
  <div className="screen">
    <div className="top-bar">
      <div><h2>Mantenimiento</h2><p>Historial y registro de servicios</p></div>
      <button className="icon-btn accent" onClick={onAdd}>+ Agregar</button>
    </div>
    <div className="screen-content">
      {mant.length === 0
        ? <EmptyState icon="🔧" title="Sin mantenimientos registrados" sub="Registra cambios de aceite, frenos, etc." />
        : <div className="item-list">
            {mant.map((m, i) => (
              <div key={i} className="item-card">
                <div className="item-icon orange-bg">🔧</div>
                <div className="item-body">
                  <strong>{m.tipo}</strong>
                  <span>{m.fecha || 'Sin fecha'}{m.km ? ` · ${Number(m.km).toLocaleString()} km` : ''}{m.costo ? ` · $${Number(m.costo).toLocaleString()}` : ''}{m.vehiculoPlaca ? ` · ${m.vehiculoPlaca}` : ''}</span>
                </div>
                <span className="badge badge-warn">Hecho</span>
              </div>
            ))}
          </div>
      }
    </div>
    <BottomNav active="mant" onNavigate={onNavigate} />
  </div>
)

/* Gastos */
const Gastos = ({ gastos, onNavigate, onAdd }) => {
  const total = gastos.reduce((s, g) => s + Number(g.monto || 0), 0)
  return (
    <div className="screen">
      <div className="top-bar">
        <div><h2>Gastos</h2><p>Total: ${total.toLocaleString()}</p></div>
        <button className="icon-btn accent" onClick={onAdd}>+ Agregar</button>
      </div>
      <div className="screen-content">
        {gastos.length === 0
          ? <EmptyState icon="💰" title="Sin gastos registrados" sub="Registra combustible, multas y más" />
          : <div className="item-list">
              {gastos.map((g, i) => (
                <div key={i} className="item-card">
                  <div className="item-icon green-bg">{GASTO_ICONS[g.cat] || '💸'}</div>
                  <div className="item-body">
                    <strong>{g.desc}</strong>
                    <span>{g.cat} · {g.fecha || 'Sin fecha'}{g.vehiculoPlaca ? ` · ${g.vehiculoPlaca}` : ''}</span>
                  </div>
                  <span className="badge badge-blue">${Number(g.monto).toLocaleString()}</span>
                </div>
              ))}
            </div>
        }
      </div>
      <BottomNav active="gastos" onNavigate={onNavigate} />
    </div>
  )
}

/* Talleres */
const Talleres = ({ talleres, onNavigate, onAdd }) => (
  <div className="screen">
    <div className="top-bar">
      <div><h2>Talleres</h2><p>Tus talleres de confianza</p></div>
      <button className="icon-btn accent" onClick={onAdd}>+ Agregar</button>
    </div>
    <div className="screen-content">
      {talleres.length === 0
        ? <EmptyState icon="🏪" title="Sin talleres registrados" sub="Agrega tus talleres de confianza" />
        : <div className="item-list">
            {talleres.map((t, i) => (
              <div key={i} className="item-card">
                <div className="item-icon blue-bg">🏪</div>
                <div className="item-body">
                  <strong>{t.nombre}</strong>
                  <span>{t.esp || t.dir || 'Taller'}{t.tel ? ` · ${t.tel}` : ''}</span>
                </div>
                <span className="badge badge-ok">📞</span>
              </div>
            ))}
          </div>
      }
    </div>
    <BottomNav active="more" onNavigate={onNavigate} />
  </div>
)

/* Mantenimiento IA */
const MantenimientoIA = ({ vehicles, activeVehicle, onSetActive, mant, docs, gastos, onNavigate }) => {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const v = activeVehicle || vehicles[0] || null

  const generate = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY

    if (!apiKey) {
      setError('No se encontró la API key. Agrega VITE_GEMINI_API_KEY en tu archivo .env')
      setLoading(false)
      return
    }

    const vehicleInfo = v
      ? `Vehículo: ${v.marca} ${v.modelo} ${v.anio}, Placa: ${v.placa}, Kilometraje: ${Number(v.km).toLocaleString()} km`
      : 'No hay vehículo registrado.'

    const mantVehicle = v ? mant.filter(m => m.vehiculoPlaca === v.placa) : mant
    const docsVehicle = v ? docs.filter(d => d.vehiculoPlaca === v.placa) : docs

    const mantInfo = mantVehicle.length > 0
      ? mantVehicle.map(m => `- ${m.tipo} (${m.fecha || 'sin fecha'}, ${m.km ? m.km + ' km' : 'km no registrado'})`).join('\n')
      : 'Sin mantenimientos registrados.'

    const docsInfo = docsVehicle.length > 0
      ? docsVehicle.map(d => `- ${d.nombre}, vence: ${d.fecha || 'sin fecha'}`).join('\n')
      : 'Sin documentos registrados.'

    const prompt = `Eres un mecánico experto. Con base en estos datos, da 1 o 2 recomendaciones de mantenimiento preventivo, cortas y directas. Sin introducciones, solo las recomendaciones en español, máximo 3 oraciones.

${vehicleInfo}
Mantenimientos: ${mantInfo}
Documentos: ${docsInfo}`

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
          }),
        }
      )

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error?.message || `Error ${res.status}`)
      }

      const data = await res.json()
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sin respuesta.'
      setResult(text)
    } catch (e) {
      setError(`Error al conectar con IA: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="screen">
      <div className="top-bar">
        <div><h2>Mantenimiento Preventivo</h2><p>Recomendaciones con IA</p></div>
      </div>
      <div className="screen-content">

        {vehicles.length > 0 && (
          <div className="vehicle-selector-bar">
            <label className="form-label" style={{ marginBottom: '6px', display: 'block' }}>Vehículo a analizar</label>
            <select
              className="form-select"
              value={v?.placa || ''}
              onChange={e => { onSetActive(e.target.value); setResult(null); setError(null) }}
            >
              {vehicles.map(veh => (
                <option key={veh.placa} value={veh.placa}>
                  {veh.tipo === 'moto' ? '🏍' : '🚗'} {veh.marca} {veh.modelo} · {veh.placa}
                </option>
              ))}
            </select>
          </div>
        )}

        <button className="ia-btn" onClick={generate} disabled={loading}>
          {loading
            ? <><span className="ia-spinner" />  Analizando tu vehículo...</>
            : <>✨ Generar Recomendaciones con IA</>
          }
        </button>

        {error && (
          <div className="ia-error">
            <strong>⚠ Error</strong>
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div className="ia-result">
            <div className="ia-tip">
              <strong>💡 Recomendaciones para {v?.marca} {v?.modelo}</strong>
              <span>{result}</span>
            </div>
          </div>
        )}

        {!result && !error && !loading && (
          <EmptyState
            icon="✨"
            title="Sin recomendaciones aún"
            sub={v ? 'Toca el botón para analizar tu vehículo' : 'Primero registra tu vehículo en Perfil'}
          />
        )}
      </div>
      <BottomNav active="more" onNavigate={onNavigate} />
    </div>
  )
}

/* Perfil */
const Perfil = ({ vehicles, onAddVehicle, onNavigate }) => (
  <div className="screen">
    <div className="top-bar">
      <div><h2>Perfil</h2><p>Propietario y vehículos</p></div>
    </div>
    <div className="screen-content">
      <div className="section-title">Propietario</div>
      <div className="profile-card">
        <div className="profile-row"><span className="key">Nombre</span><span className="val">Juan Pérez</span></div>
        <div className="profile-row"><span className="key">Teléfono</span><span className="val">+57 300 123 4567</span></div>
        <div className="profile-row"><span className="key">Email</span><span className="val">juan@email.com</span></div>
      </div>
      <div className="section-title" style={{ marginTop: '20px' }}>Vehículos</div>
      {vehicles.length === 0
        ? <EmptyState icon="🚗" title="Sin vehículos registrados" />
        : vehicles.map((v, i) => (
            <div key={i} className="vehicle-chip">
              <span className="vc-icon"><VehicleIcon tipo={v.tipo} size={22} /></span>
              <div>
                <strong>{v.marca} {v.modelo} {v.anio}</strong>
                <span>{v.placa} · {Number(v.km).toLocaleString()} km</span>
              </div>
            </div>
          ))
      }
      <button className="btn-save" style={{ marginTop: '16px' }} onClick={onAddVehicle}>
        + Agregar Vehículo
      </button>
    </div>
    <BottomNav active="more" onNavigate={onNavigate} />
  </div>
)

/* More Sheet - bottom sheet modal, not a screen */
const MoreSheet = ({ onNavigate, onLogout, onClose }) => (
  <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
    <div className="modal" style={{ borderRadius: '24px 24px 0 0' }}>
      <div className="modal-header">
        <h3>Opciones</h3>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
      <div className="more-list">
        <div className="more-item" onClick={() => { onClose(); onNavigate('ia') }}>
          <span className="more-icon">✨</span><span>Mantenimiento IA</span><span className="chevron">›</span>
        </div>
        <div className="more-item" onClick={() => { onClose(); onNavigate('talleres') }}>
          <span className="more-icon">🏪</span><span>Talleres</span><span className="chevron">›</span>
        </div>
        <div className="more-item" onClick={() => { onClose(); onNavigate('perfil') }}>
          <span className="more-icon">👤</span><span>Perfil y Vehículos</span><span className="chevron">›</span>
        </div>
        <div className="divider" />
        <div className="more-item danger" onClick={onLogout}>
          <span className="more-icon">→</span><span>Cerrar Sesión</span>
        </div>
      </div>
    </div>
  </div>
)

/* ─────────────── COMPONENTE PRINCIPAL ─────────────── */

const Mantenimento = ({ user, onLogout }) => {
  const [screen, setScreen] = useState('dashboard')
  const [modal, setModal] = useState(null)
  const [showMore, setShowMore] = useState(false)

  const [docs, setDocs] = useState(() => JSON.parse(localStorage.getItem('ad_docs') || '[]'))
  const [mant, setMant] = useState(() => JSON.parse(localStorage.getItem('ad_mant') || '[]'))
  const [gastos, setGastos] = useState(() => JSON.parse(localStorage.getItem('ad_gastos') || '[]'))
  const [talleres, setTalleres] = useState(() => JSON.parse(localStorage.getItem('ad_talleres') || '[]'))
  const [vehicles, setVehicles] = useState(() => JSON.parse(localStorage.getItem('ad_vehicles') || '[]'))
  const [activeVehiclePlaca, setActiveVehiclePlaca] = useState(() => localStorage.getItem('ad_active') || '')

  const activeVehicle = vehicles.find(v => v.placa === activeVehiclePlaca) || vehicles[0] || null

  const setActive = (placa) => {
    setActiveVehiclePlaca(placa)
    localStorage.setItem('ad_active', placa)
  }

  const navigate = (s) => {
    if (s === 'more') { setShowMore(true); return }
    setScreen(s)
  }
  const openModal = (m) => setModal(m)
  const closeModal = () => setModal(null)

  const saveDoc = (d) => { setDocs(prev => { const n = [...prev, d]; localStorage.setItem('ad_docs', JSON.stringify(n)); return n }); closeModal() }
  const saveMant = (m) => { setMant(prev => { const n = [...prev, m]; localStorage.setItem('ad_mant', JSON.stringify(n)); return n }); closeModal() }
  const saveGasto = (g) => { setGastos(prev => { const n = [...prev, g]; localStorage.setItem('ad_gastos', JSON.stringify(n)); return n }); closeModal() }
  const saveTaller = (t) => { setTalleres(prev => { const n = [...prev, t]; localStorage.setItem('ad_talleres', JSON.stringify(n)); return n }); closeModal() }
  const saveVehicle = (v) => {
    setVehicles(prev => {
      const n = [...prev, v]
      localStorage.setItem('ad_vehicles', JSON.stringify(n))
      return n
    })
    setActive(v.placa)
    closeModal()
  }

  const screens = {
    dashboard: <Dashboard docs={docs} mant={mant} gastos={gastos} vehicles={vehicles} activeVehicle={activeVehicle} onSetActive={setActive} onNavigate={navigate} onOpenVehicle={() => openModal('vehicle')} />,
    docs:      <Documentos docs={docs} onNavigate={navigate} onAdd={() => openModal('doc')} />,
    mant:      <Mantenimientos mant={mant} onNavigate={navigate} onAdd={() => openModal('mant')} />,
    gastos:    <Gastos gastos={gastos} onNavigate={navigate} onAdd={() => openModal('gasto')} />,
    talleres:  <Talleres talleres={talleres} onNavigate={navigate} onAdd={() => openModal('taller')} />,
    ia:        <MantenimientoIA vehicles={vehicles} activeVehicle={activeVehicle} onSetActive={setActive} mant={mant} docs={docs} gastos={gastos} onNavigate={navigate} />,
    perfil:    <Perfil vehicles={vehicles} onAddVehicle={() => openModal('vehicle')} onNavigate={navigate} />,
  }

  return (
    <div className="app-wrapper">
      <div className="phone-shell">
        {screens[screen] || screens.dashboard}

        {modal === 'doc'     && <ModalDocumento    onClose={closeModal} onSave={saveDoc}    vehicles={vehicles} defaultVehicle={activeVehicle?.placa} />}
        {modal === 'mant'    && <ModalMantenimiento onClose={closeModal} onSave={saveMant}   vehicles={vehicles} defaultVehicle={activeVehicle?.placa} />}
        {modal === 'gasto'   && <ModalGasto         onClose={closeModal} onSave={saveGasto}  vehicles={vehicles} defaultVehicle={activeVehicle?.placa} />}
        {modal === 'taller'  && <ModalTaller        onClose={closeModal} onSave={saveTaller} />}
        {modal === 'vehicle' && <ModalVehiculo      onClose={closeModal} onSave={saveVehicle} />}

        {showMore && (
          <MoreSheet
            onClose={() => setShowMore(false)}
            onNavigate={navigate}
            onLogout={onLogout}
          />
        )}
      </div>
    </div>
  )
}

export default Mantenimento