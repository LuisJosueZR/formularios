import { Link, NavLink, Outlet } from 'react-router-dom'

const linkStyle = ({ isActive }) => ({
  padding: '8px 16px',
  borderRadius: '6px',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '500',
  color: isActive ? 'white' : '#374151',
  backgroundColor: isActive ? '#2563eb' : 'transparent',
})

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* className="no-print" lo oculta al imprimir (usa la regla de impresión que ya agregamos) */}
      <nav
        className="no-print"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          backgroundColor: 'white',
          borderBottom: '1px solid #d1d5db',
        }}
      >
        <Link
          to="/"
          style={{ fontWeight: '700', marginRight: '16px', color: '#111827', textDecoration: 'none' }}
        >
          📚 Simulador Fiscal
        </Link>
        <NavLink to="/" end style={linkStyle}>Inicio</NavLink>
        <NavLink to="/formulario-iva" style={linkStyle}>Formulario IVA</NavLink>
        <NavLink to="/formulario-pac" style={linkStyle}>Formulario PAC</NavLink>
        <NavLink to="/calculadora-iva" style={linkStyle}>Calculadora IVA</NavLink>
      </nav>

    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px', backgroundColor: 'white' }}>
        {/* Disclaimer Principal - Header */}
      <div style={{ 
        backgroundColor: '#fef3c7', 
        border: '2px solid #f59e0b', 
        borderRadius: '8px', 
        padding: '16px 20px', 
        marginBottom: '24px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
          <span style={{ fontSize: '24px', flexShrink: 0 }}>⚠️</span>
          <div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: '#92400e' }}>
              AVISO EDUCATIVO
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#78350f', lineHeight: '1.5' }}>
              Este sitio es un <strong>simulador académico con fines didácticos</strong>. No es un sistema oficial, no pertenece ni está afiliado al Ministerio de Hacienda ni a la Dirección General de Impuestos Internos. <strong>No tiene validez legal ni administrativa.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Aviso de Datos */}
      <div style={{ 
        backgroundColor: '#dbeafe', 
        border: '1px solid #3b82f6', 
        borderRadius: '6px', 
        padding: '12px 16px', 
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>🔒</span>
          <p style={{ margin: 0, fontSize: '13px', color: '#1e40af', fontWeight: '500' }}>
            <strong>No ingrese información real.</strong> Todos los datos utilizados deben ser ficticios o generados para fines educativos.
          </p>
        </div>
      </div>
    </div>








      
      <main style={{ padding: '24px 0' }}>
        <Outlet />
      </main>
    </div>
  )
}