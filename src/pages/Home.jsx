import { Link } from 'react-router-dom'

const cardStyle = {
  display: 'block',
  padding: '24px',
  backgroundColor: 'white',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  textDecoration: 'none',
  color: '#111827',
}

export default function Home() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
        Simulador Fiscal Educativo
      </h1>
      <p style={{ color: '#4b5563', marginBottom: '24px' }}>
        Herramientas con fines didácticos para practicar el llenado y cálculo de declaraciones.
        No es un sistema oficial ni tiene validez legal.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        <Link to="/formulario-iva" style={cardStyle}>
          <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>📝 Formulario de IVA</h2>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Practica el llenado de ventas, compras y la determinación del impuesto.
          </p>
        </Link>

        <Link to="/formulario-pac" style={cardStyle}>
          <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>📝 Formulario de PAC</h2>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Practica el llenado de ventas, compras y la determinación del impuesto.
          </p>
        </Link>
      </div>

    

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        <Link to="/formulario-iva" style={cardStyle}>
          <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>📝 Formulario de IVA</h2>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Practica el llenado de ventas, compras y la determinación del impuesto.
          </p>
        </Link>

        <Link to="/calculadora-iva" style={cardStyle}>
          <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>🧮 Calculadora de IVA</h2>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Calcula el 13% de IVA sobre un monto, o separa el IVA de un total.
          </p>
        </Link>
      </div>

{/* Footer Legal */}
      <div style={{ 
        backgroundColor: '#f3f4f6', 
        border: '1px solid #d1d5db', 
        borderRadius: '8px', 
        padding: '20px', 
        marginTop: '24px',
        textAlign: 'center'
      }}>
        <div style={{ 
          borderBottom: '2px solid #9ca3af', 
          paddingBottom: '12px', 
          marginBottom: '12px' 
        }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
            SIMULADOR EDUCATIVO
          </h4>
          <p style={{ margin: 0, fontSize: '12px', color: '#6b7280', lineHeight: '1.6' }}>
            Contenido desarrollado exclusivamente para prácticas estudiantiles.
          </p>
        </div>
        <p style={{ margin: 0, fontSize: '12px', color: '#6b7280', lineHeight: '1.5' }}>
          Los cálculos, formularios y resultados no sustituyen los procesos oficiales vigentes.<br />
          <strong>Para trámites legales, consulte únicamente las plataformas oficiales del Ministerio de Hacienda.</strong>
        </p>
        <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #d1d5db' }}>
          <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af' }}>
            © 2026 - Herramienta de Aprendizaje | Sin fines comerciales
          </p>
        </div>
      </div>

    </div>



  )
}