import { useState } from 'react'

const TASA = 0.13
const redondear = (n) => Math.round((n + Number.EPSILON) * 100) / 100
const formato = (n) =>
  n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export default function CalculadoraIVA() {
  const [monto, setMonto] = useState('')
  const [modo, setModo] = useState('sinIva') // 'sinIva' = el monto no incluye IVA

  const valor = parseFloat(monto) || 0
  let base, iva, total

  if (modo === 'sinIva') {
    base = valor
    iva = redondear(valor * TASA)
    total = redondear(base + iva)
  } else {
    total = valor
    base = redondear(valor / (1 + TASA))
    iva = redondear(total - base)
  }

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '24px', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '8px' }}>
      <h1 style={{ fontSize: '22px', marginBottom: '16px' }}>Calculadora de IVA (13%)</h1>

      <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Monto</label>
      <input
        type="text"
        inputMode="decimal"
        value={monto}
        onChange={(e) => setMonto(e.target.value.replace(/[^\d.]/g, ''))}
        placeholder="0.00"
        style={{ width: '100%', padding: '8px', textAlign: 'right', border: '1px solid #d1d5db', borderRadius: '4px', marginBottom: '12px' }}
      />

      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '14px' }}>
        <label>
          <input type="radio" checked={modo === 'sinIva'} onChange={() => setModo('sinIva')} /> Monto sin IVA
        </label>
        <label>
          <input type="radio" checked={modo === 'conIva'} onChange={() => setModo('conIva')} /> Monto con IVA incluido
        </label>
      </div>

      <div style={{ backgroundColor: '#f9fafb', padding: '12px 16px', borderRadius: '6px', fontSize: '14px' }}>
        <p style={{ display: 'flex', justifyContent: 'space-between' }}><span>Base:</span><strong>{formato(base)}</strong></p>
        <p style={{ display: 'flex', justifyContent: 'space-between' }}><span>IVA (13%):</span><strong>{formato(iva)}</strong></p>
        <p style={{ display: 'flex', justifyContent: 'space-between' }}><span>Total:</span><strong>{formato(total)}</strong></p>
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