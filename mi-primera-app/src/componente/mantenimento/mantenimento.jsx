import { useState } from 'react'
import './mantenimento.css'
import suzukiLogo from '../../assets/LOGO_SUZUKI.png'

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

const ModalDocumento = ({ onClose, onSave }) => {
  const [form, setForm] = useState({ tipo: 'SOAT', nombre: '', fecha: '' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  return (
    <Modal title="Nuevo Documento" onClose={onClose}>
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

const ModalMantenimiento = ({ onClose, onSave }) => {
  const [form, setForm] = useState({ tipo: '', desc: '', fecha: '', costo: '', km: '', kmProx: '' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  return (
    <Modal title="Nuevo Mantenimiento" onClose={onClose}>
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

const ModalGasto = ({ onClose, onSave }) => {
  const [form, setForm] = useState({ cat: 'Combustible', desc: '', fecha: '', monto: '' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  return (
    <Modal title="Nuevo Gasto" onClose={onClose}>
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

const ModalVehiculo = ({ onClose, onSave }) => {
  const [form, setForm] = useState({ placa: '', marca: '', modelo: '', anio: '', km: '0' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  return (
    <Modal title="Nuevo Vehículo" onClose={onClose}>
      <div className="form-group">
        <label className="form-label">Placa</label>
        <input className="form-input" placeholder="ABC-123" value={form.placa} onChange={e => set('placa', e.target.value)} />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Marca</label>
          <input className="form-input" placeholder="Toyota" value={form.marca} onChange={e => set('marca', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Modelo</label>
          <input className="form-input" placeholder="Corolla" value={form.modelo} onChange={e => set('modelo', e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Año</label>
          <input type="number" className="form-input" placeholder="2024" value={form.anio} onChange={e => set('anio', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Kilometraje</label>
          <input type="number" className="form-input" placeholder="0" value={form.km} onChange={e => set('km', e.target.value)} />
        </div>
      </div>
      <button className="btn-save" onClick={() => form.placa && onSave(form)}>
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

const Dashboard = ({ docs, mant, gastos, vehicles, onNavigate, onOpenVehicle }) => {
  const totalGastos = gastos.reduce((s, g) => s + Number(g.monto || 0), 0)
  const kmActual = vehicles[0] ? Number(vehicles[0].km).toLocaleString() : '0'
  return (
    <div className="screen">
      <div className="top-bar">
        <div>
          <h2>Mantenimiento Vehicular</h2>
          <p>{vehicles[0] ? `${vehicles[0].marca} ${vehicles[0].modelo} · ${vehicles[0].placa}` : 'Configura tu vehículo'}</p>
        </div>
        <button className="icon-btn icon-btn-logo" onClick={onOpenVehicle} title="Agregar vehículo">
          <img src={suzukiLogo} alt="Logo" />
        </button>
      </div>
      <div className="screen-content">
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-svg"><IcoKm /></span>
            <div className="stat-label">Kilometraje</div>
            <div className="stat-value">{kmActual}</div>
          </div>
          <div className="stat-card">
            <span className="stat-svg"><IcoDocs /></span>
            <div className="stat-label">Documentos</div>
            <div className="stat-value">{docs.length}</div>
          </div>
          <div className="stat-card">
            <span className="stat-svg"><IcoMant /></span>
            <div className="stat-label">Mantenimientos</div>
            <div className="stat-value">{mant.length}</div>
          </div>
          <div className="stat-card">
            <span className="stat-svg"><IcoGastos /></span>
            <div className="stat-label">Gastos Total</div>
            <div className="stat-value">${totalGastos.toLocaleString()}</div>
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
                  <span>{d.tipo}{d.fecha ? ` · Vence: ${d.fecha}` : ''}</span>
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
                  <span>{m.fecha || 'Sin fecha'}{m.km ? ` · ${Number(m.km).toLocaleString()} km` : ''}{m.costo ? ` · $${Number(m.costo).toLocaleString()}` : ''}</span>
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
                    <span>{g.cat} · {g.fecha || 'Sin fecha'}</span>
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
const MantenimientoIA = ({ vehicles, mant, onNavigate }) => {
  const [result, setResult] = useState(null)
  const generate = () => {
    const v = vehicles[0]
    const name = v ? `${v.marca} ${v.modelo} (${v.anio})` : 'tu vehículo'
    const km = v ? Number(v.km) : 0
    const nextOil = Math.ceil((km || 1) / 5000) * 5000
    setResult({
      text: `Con base en el historial de ${name}, se detectaron ${mant.length} servicio(s) registrado(s). Se recomienda verificar el estado de los frenos, nivel de fluidos y revisar las correas de distribución si supera los 80.000 km.`,
      tip: v && km > 0
        ? `Cambio de aceite cada 5.000 km. Próximo a los ${nextOil.toLocaleString()} km.`
        : 'Registra tu vehículo y kilometraje para recomendaciones precisas.',
    })
  }
  return (
    <div className="screen">
      <div className="top-bar">
        <div><h2>Mantenimiento Preventivo</h2><p>Recomendaciones basadas en IA</p></div>
      </div>
      <div className="screen-content">
        <button className="ia-btn" onClick={generate}>✨ Generar Recomendaciones con IA</button>
        {result
          ? <div className="ia-result">
              <p>{result.text}</p>
              <div className="ia-tip"><strong>💡 Próximo servicio recomendado</strong><span>{result.tip}</span></div>
            </div>
          : <EmptyState icon="✨" title="Sin recomendaciones aún" sub="Toca el botón para generar recomendaciones de mantenimiento basadas en tu vehículo" />
        }
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
              <span className="vc-icon">🚗</span>
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

  const [docs, setDocs] = useState([])
  const [mant, setMant] = useState([])
  const [gastos, setGastos] = useState([])
  const [talleres, setTalleres] = useState([])
  const [vehicles, setVehicles] = useState([])

  const navigate = (s) => {
    if (s === 'more') { setShowMore(true); return }
    setScreen(s)
  }
  const openModal = (m) => setModal(m)
  const closeModal = () => setModal(null)

  const saveDoc = (d) => { setDocs(prev => [...prev, d]); closeModal() }
  const saveMant = (m) => { setMant(prev => [...prev, m]); closeModal() }
  const saveGasto = (g) => { setGastos(prev => [...prev, g]); closeModal() }
  const saveTaller = (t) => { setTalleres(prev => [...prev, t]); closeModal() }
  const saveVehicle = (v) => { setVehicles([v]); closeModal() }

  const screens = {
    dashboard: <Dashboard docs={docs} mant={mant} gastos={gastos} vehicles={vehicles} onNavigate={navigate} onOpenVehicle={() => openModal('vehicle')} />,
    docs:      <Documentos docs={docs} onNavigate={navigate} onAdd={() => openModal('doc')} />,
    mant:      <Mantenimientos mant={mant} onNavigate={navigate} onAdd={() => openModal('mant')} />,
    gastos:    <Gastos gastos={gastos} onNavigate={navigate} onAdd={() => openModal('gasto')} />,
    talleres:  <Talleres talleres={talleres} onNavigate={navigate} onAdd={() => openModal('taller')} />,
    ia:        <MantenimientoIA vehicles={vehicles} mant={mant} onNavigate={navigate} />,
    perfil:    <Perfil vehicles={vehicles} onAddVehicle={() => openModal('vehicle')} onNavigate={navigate} />,
  }

  return (
    <div className="app-wrapper">
      <div className="phone-shell">
        {screens[screen] || screens.dashboard}

        {modal === 'doc'     && <ModalDocumento    onClose={closeModal} onSave={saveDoc} />}
        {modal === 'mant'    && <ModalMantenimiento onClose={closeModal} onSave={saveMant} />}
        {modal === 'gasto'   && <ModalGasto         onClose={closeModal} onSave={saveGasto} />}
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