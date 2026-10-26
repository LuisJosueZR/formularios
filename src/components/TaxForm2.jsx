import React, { useState, useRef } from 'react';

const TaxForm = () => {
  const [values, setValues] = useState({
    




    '22': '0.00', '26': '0.00', '28': '0.00', '20': '0.00',
    '24': '0.00', '30': '0.00', '32': '0.00',

    '46': '0.00', '48': '0.00', '50': '0.00',

    '104': '0.00', '106': '0.00', '108': '0.00', '110': '0.00',
    '112': '0.00', '114': '0.00', '116': '0.00', '118': '0.00',
    '120': '0.00', '121': '0.00', '122': '0.00', '124': '0.00',
    '126': '0.00', '128': '0.00', '130': '0.00', '132': '0.00',
    '134': '0.00', '136': '0.00', '138': '0.00', '140': '0.00',
    '142': '0.00', '144': '0.00', '146': '0.00', '150': '0.00',
    '194': '0.00',

    '260': '0.00', '262': '0.00', '263': '0.00', '264': '0.00',
    '268': '0.00', '270': '0.00', '272': '0.00', '274': '0.00',
    '276': '0.00', '278': '0.00', '280': '0.00', '282': '0.00',
    '284': '0.00', '286': '0.00', '288': '0.00', '290': '0.00',
    '406': '0.00', '294': '0.00', '408': '0.00', '410': '0.00',
    '432': '0.00', '292': '0.00', '326': '0.00',

    '340': '0.00', '342': '0.00', '343': '0.00', '750': '0.00',
    '346': '0.00',

        

  });

  const inputRefs = useRef({});

  const fieldOrder = [
    
    '22', '26', '28', '20', '24', '30', '32',

    '46', '48', '50',

    '104', '150', '106', '108', '110',
    '112', '114', '116', '118',
    '120', '121', '122', '124',
    '126', '128', '130', '132',
    '134', '136', '138', '140',
    '142', '144', '146', '194',

    '260', '262', '263', '264',
    '268', '270', '272', '274',
    '276', '278', '280', '282',
    '284', '286', '288', '290',
    '406', '294', '408', '410',
    '432', '292', '326',

    '340', '342', '343', '750',
    '346',

  ];

  
      // Tasas disponibles (en puntos base: 100 pb = 1 %)
    const TASA = {
      IVA: 1300,   // 13 %  (por defecto, lo que ya tienes)
      R1_5: 150,   // 1.5 %
      R5: 500,     // 5 %
      R10: 1000,   // 10 %
      R15: 1500,   // 15 %
      R20: 2000,   // 20 %
      R25: 2500,   // 25 %
    };

    // Tasa de cada casilla derecha. Solo anota las que NO sean 13 %.
    // Las que no aparezcan aquí usan TASA.IVA automáticamente.
    const tasasPorCasilla = {
      '152': TASA.R10,
      '154': TASA.R10,
      '156': TASA.R10,
      '158': TASA.R1_5,
      '160': TASA.R10,
      '162': TASA.R15,
      '164': TASA.R10,
      '168': TASA.R10,
      '169': TASA.R10,
      '170': TASA.R10,
      '172': TASA.R5,
      '174': TASA.R10,
      '176': TASA.R5,
      '178': TASA.R10,
      '180': TASA.R10,
      '182': TASA.R10,
      '184': TASA.R20,
      '186': TASA.R25,
      '188': TASA.R20,
      '190': TASA.R20,
      '192': TASA.R20,
      
      '296': TASA.R10,
      '298': TASA.R10,
      '299': TASA.R10,
      '300': TASA.R15,
      '302': TASA.R20,
      '304': TASA.R20,
      '306': TASA.R20,
      '308': TASA.R20,
      '310': TASA.R20,
      '312': TASA.R20,
      '314': TASA.R5,
      '316': TASA.R5,
      '318': TASA.R10,
      '320': TASA.R5,
      '322': TASA.R25,
      '324': TASA.R25,
      '412': TASA.R5,
      '295': TASA.R5,
      '414': TASA.R5,
      '416': TASA.R5,
      '434': TASA.R5,
      

      

    };
      

    const taxMap = {
      '152': '106',
      '154': '108',
      '156': '110',
      '158': '112',
      '160': '114',
      '162': '116',
      '164': '118',
      '168': '120',
      '169': '121',
      '170': '122',
      '172': '124',
      '174': '126',
      '176': '128',
      '178': '130',
      '180': '132',
      '182': '134',
      '184': '136',
      '186': '138',
      '188': '140',
      '190': '142',
      '192': '144',

      '296': '260',
      '298': '262',
      '299': '263',
      '300': '264',
      '302': '268',
      '304': '270',
      '306': '272',
      '308': '274',
      '310': '276',
      '312': '278',
      '314': '280',
      '316': '282',
      '318': '284',
      '320': '286',
      '322': '288',
      '324': '290',
      '412': '406',
      '295': '294',
      '414': '408',
      '416': '410',
      '434': '432',

      
    };
  
  const calculateTax = (baseValue, tasaPb = TASA.IVA) => {
  const base = parseFloat(String(baseValue).replace(/,/g, '')) || 0;
  const centavos = Math.round(base * 100);               // trabaja en centavos enteros
  const impuestoCentavos = Math.round((centavos * tasaPb) / 10000);
  return formatDisplay((impuestoCentavos / 100).toFixed(2));
    };
  
  const getCalculatedValue = (id) => {
  const baseId = taxMap[id];
  if (!baseId) return '0.00';
  const tasa = tasasPorCasilla[id] ?? TASA.IVA;
  return calculateTax(values[baseId], tasa);
    };
  
 

  const formatDisplay = (val) => {
    if (!val || val === '') return '0.00';
    const num = parseFloat(val.replace(/,/g, ''));
    if (isNaN(num)) return '0.00';
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const InputField = ({ id }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState('');

    const handleFocus = () => {
      setIsEditing(true);
      const raw = values[id].replace(/,/g, '');
      setEditValue(raw === '0.00' ? '' : raw);
    };

    const handleChange = (e) => {
      let val = e.target.value.replace(/[^\d.]/g, '');
      const dots = (val.match(/\./g) || []).length;
      if (dots > 1) {
        const parts = val.split('.');
        val = parts[0] + '.' + parts.slice(1).join('');
      }
      setEditValue(val);
    };

    const handleBlur = () => {
      setIsEditing(false);
      const formatted = formatDisplay(editValue || '0');
      setValues(prev => ({ ...prev, [id]: formatted }));
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const currentIndex = fieldOrder.indexOf(id);
        const nextIndex = e.shiftKey 
          ? (currentIndex - 1 + fieldOrder.length) % fieldOrder.length 
          : (currentIndex + 1) % fieldOrder.length;
        const nextField = fieldOrder[nextIndex];
        
        handleBlur();
        
        setTimeout(() => {
          if (inputRefs.current[nextField]) {
            inputRefs.current[nextField].focus();
          }
        }, 10);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleBlur();
        const currentIndex = fieldOrder.indexOf(id);
        const nextIndex = (currentIndex + 1) % fieldOrder.length;
        const nextField = fieldOrder[nextIndex];
        
        setTimeout(() => {
          if (inputRefs.current[nextField]) {
            inputRefs.current[nextField].focus();
          }
        }, 10);
      }
    };

    return (
      <input
        ref={(el) => (inputRefs.current[id] = el)}
        type="text"
        value={isEditing ? editValue : values[id]}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        style={{
          width: '100%',
          padding: '4px 8px',
          textAlign: 'right',
          border: '1px solid #d1d5db',
          borderRadius: '4px',
          outline: 'none'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#3b82f6';
          handleFocus();
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#d1d5db';
          handleBlur();
        }}
      />
    );
  };

  const CalculatedField = ({ id, value }) => {
    return (
      <div
        style={{
          width: '100%',
          padding: '4px 8px',
          textAlign: 'right',
          border: '1px solid #d1d5db',
          borderRadius: '4px',
          backgroundColor: '#f9fafb',
          color: '#6b7280'
        }}
      >
        {value !== undefined ? value : getCalculatedValue(id)}
      </div>
    );
  };

  const CodeLabel = ({ code }) => (
    <span style={{
      display: 'inline-block',
      backgroundColor: '#e5e7eb',
      color: '#4b5563',
      fontSize: '12px',
      padding: '4px 8px',
      borderRadius: '4px'
    }}>
      {code}
    </span>
  );

  

  const calculateTotalingresospac= () => {
    const ingresospacFields = ['22', '26', '28', '20', '24', '30', '32'];
    
    const ingresospac = ingresospacFields.reduce((sum, key) => {
      const val = parseFloat(values[key].replace(/,/g, '')) || 0;
      return sum + val;
    }, 0);
    
        
    //Todas las operaciones de transacciones a favor
    const ingresospacTotal = ingresospac;

    return { ingresospac: ingresospacTotal };
  };

  const totalingresospac = calculateTotalingresospac();
  
  
  // Cálculo de Pago a Cuenta
   const productopac = Math.round((totalingresospac.ingresospac * 0.0175) * 100) / 100;
  
  
   // Restar 46- 48- 50- 
    const excedentespac = ['46', '48', '50'];
    
    const excedentespac1 = excedentespac.reduce((sum, key) => {
      const val = parseFloat(values[key].replace(/,/g, '')) || 0;
      return sum + val;
    }, 0);

     
  // Total Entero Computado de Pago a Cuenta menos Excedentes, redondeado a 2 decimales
  const diferenciapac = Math.round((productopac - excedentespac1) * 100) / 100;

  // Positivo: va a Impuesto Determinado. Negativo: va a Remanente (en positivo)
  const impuestoapagarpac = diferenciapac > 0 ? diferenciapac : 0;
  const excedenteproximoperiodo = diferenciapac < 0 ? Math.abs(diferenciapac) : 0;


  
  const calculateTotalsRetencionesA = () => {
    

    // Calcular total retenciones acreditables usando los valores calculados
    const retencionesAFields = ['152', '154', '156', '158', '160', '162', '164', '168', '169', '170', '172', '174', '176', '178', '180', '182', '184',
       '186', '188', '190', '192'];
    const retencionesA = retencionesAFields.reduce((sum, key) => {
      const val = parseFloat(getCalculatedValue(key).replace(/,/g, '')) || 0;
      return sum + val;
    }, 0);
    
       // Sumar 150+ 194+
    const otrasretencionesAFields = ['150', '194'];
    
    const otrasretencionesA = otrasretencionesAFields.reduce((sum, key) => {
      const val = parseFloat(values[key].replace(/,/g, '')) || 0;
      return sum + val;
    }, 0);

  
    //Todas las operaciones de créditos y otros créditos
    const retencionesATotal = retencionesA + otrasretencionesA;

    return { retencionesA: retencionesATotal };
  };

  const totalsretencionesA = calculateTotalsRetencionesA();
  
  
   const calculateTotalsRetencionesD = () => {

   // Calcular total retenciones definitivas usando los valores calculados
    const retencionesDFields = ['296', '298', '299', '300', '302', '304', '306', '308', '310', '312', '314', '316', '318', '320', '322', '324', '412',
       '295', '414', '416', '434'];
    const retencionesD = retencionesDFields.reduce((sum, key) => {
      const val = parseFloat(getCalculatedValue(key).replace(/,/g, '')) || 0;
      return sum + val;
    }, 0);
    
       // Sumar 326+
    const otrasretencionesDFields = ['326'];
    
    const otrasretencionesD = otrasretencionesDFields.reduce((sum, key) => {
      const val = parseFloat(values[key].replace(/,/g, '')) || 0;
      return sum + val;
    }, 0);

  
    //Todas las operaciones de retenciones definitivas
    const retencionesDTotal = retencionesD + otrasretencionesD;

    return { retencionesD: retencionesDTotal };
  };

  const totalsretencionesD = calculateTotalsRetencionesD();

   

  const calculateTotalsMultas = () => {
    const multasFields = ['340', '342', '343', '750',];
    
    const multas = multasFields.reduce((sum, key) => {
      const val = parseFloat(values[key].replace(/,/g, '')) || 0;
      return sum + val;
    }, 0);
    
        
    //Todas las operaciones de transacciones a favor
    const multasTotal = multas;

    return { multas: multasTotal };
  };

  const totalsmultas = calculateTotalsMultas();

  

    // Sumar 326+
    const interesesV = ['346'];
    
    const intereses = interesesV.reduce((sum, key) => {
      const val = parseFloat(values[key].replace(/,/g, '')) || 0;
      return sum + val;
    }, 0);
  
    const totalapagar = Math.round((impuestoapagarpac + totalsretencionesA.retencionesA + totalsretencionesD.retencionesD + totalsmultas.multas + intereses) * 100) / 100;

   
  
  const rowStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: '16px',
    padding: '12px 16px',
    borderBottom: '1px solid #e5e7eb'
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px', backgroundColor: 'white' }}>
      
      {/* Disclaimer Principal - Header */}
      {/*<div style={{ 
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
      </div> */}

      {/* Aviso de Datos */}
      <div style={{ 
        backgroundColor: '#dbeafe', 
        border: '1px solid #3b82f6', 
        borderRadius: '6px', 
        padding: '12px 16px', 
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg fill="#000000" width="64px" height="64px" viewBox="-18 -18 72.00 72.00" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" stroke="#000000" stroke-width="0.00036" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.144"></g><g id="SVGRepo_iconCarrier"> <title>form-line</title> <path d="M21,12H7a1,1,0,0,1-1-1V7A1,1,0,0,1,7,6H21a1,1,0,0,1,1,1v4A1,1,0,0,1,21,12ZM8,10H20V7.94H8Z" class="clr-i-outline clr-i-outline-path-1"></path><path d="M21,14.08H7a1,1,0,0,0-1,1V19a1,1,0,0,0,1,1H18.36L22,16.3V15.08A1,1,0,0,0,21,14.08ZM20,18H8V16H20Z" class="clr-i-outline clr-i-outline-path-2"></path><path d="M11.06,31.51v-.06l.32-1.39H4V4h20V14.25L26,12.36V3a1,1,0,0,0-1-1H3A1,1,0,0,0,2,3V31a1,1,0,0,0,1,1h8A3.44,3.44,0,0,1,11.06,31.51Z" class="clr-i-outline clr-i-outline-path-3"></path><path d="M22,19.17l-.78.79A1,1,0,0,0,22,19.17Z" class="clr-i-outline clr-i-outline-path-4"></path><path d="M6,26.94a1,1,0,0,0,1,1h4.84l.3-1.3.13-.55,0-.05H8V24h6.34l2-2H7a1,1,0,0,0-1,1Z" class="clr-i-outline clr-i-outline-path-5"></path><path d="M33.49,16.67,30.12,13.3a1.61,1.61,0,0,0-2.28,0h0L14.13,27.09,13,31.9a1.61,1.61,0,0,0,1.26,1.9,1.55,1.55,0,0,0,.31,0,1.15,1.15,0,0,0,.37,0l4.85-1.07L33.49,19a1.6,1.6,0,0,0,0-2.27ZM18.77,30.91l-3.66.81L16,28.09,26.28,17.7l2.82,2.82ZM30.23,19.39l-2.82-2.82L29,15l2.84,2.84Z" class="clr-i-outline clr-i-outline-path-6"></path> <rect x="0" y="0" width="36" height="36" fill-opacity="0"></rect> </g></svg>
          <p style={{ margin: 0, fontSize: '13px', color: '#1e40af', fontWeight: '500' }}>
            <strong>PAGO CUENTA E IMPUESTOS RETENIDOS DE RENTA Y AGENTES EXTRANJEROS</strong>
          </p>
        </div>
      </div>

      




        

      <div style={{ border: '1px solid #d1d5db', borderRadius: '8px', overflow: 'hidden' }}> 

        {/* Header */}
        <div style={{ backgroundColor: '#f3f4f6', padding: '12px 16px', borderBottom: '1px solid #d1d5db', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '18px', fontWeight: '500' }}>▸ Pago a Cuenta</span>
        </div>

        {/* Rows */}
        <div>
          
        {/* Actividades Comerciales */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Actividades Comerciales</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="22+" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="22" />
          </div>
        </div>

        {/* Actividades de Servicios */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Actividades de Servicios</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="26+" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="26" />
          </div>
        </div>

        {/* Industria de la Construcción */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Industria de la Construcción</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="28+" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="28" />
          </div>
        </div>

      {/* Actividades Industriales */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Actividades Industriales</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="20+" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="20" />
          </div>
        </div>

        {/* Actividades Agropecuarias */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Actividades Agropecuarias</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="24+" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="24" />
          </div>
        </div>

      {/* Otras Actividades No Sujetas a Retención */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Otras Actividades No Sujetas a Retención</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="30+" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="30" />
          </div>
        </div>

      {/* Otros Ingresos */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Otros Ingresos</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="32+" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="32" />
          </div>
        </div>




        {/* TOTAL INGRESOS */}
          <div style={rowStyle}>
            <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>TOTAL INGRESOS</span>
            </div>                
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="34=" />
            </div>
            
              <div style={{ gridColumn: 'span 3', fontWeight: '700' }}>
              <CalculatedField id="34" value={formatDisplay(totalingresospac.ingresospac.toString())}/>
            </div>
          </div>


      {/* TOTAL ENTERO COMPUTADO DE PAGO A CUENTA */}
          <div style={rowStyle}>
            <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>TOTAL ENTERO COMPUTADO DE PAGO A CUENTA (1.75%)</span>
            </div>                
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="45=" />
            </div>
            <div style={{ gridColumn: 'span 3', fontWeight: '700' }}>
              <CalculatedField id="45" value={formatDisplay(productopac.toFixed(2))}/>
            </div>
          </div>


      {/* Excedente de Pago a Cuenta Período Anterior */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Excedente de Pago a Cuenta Período Anterior</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="46-" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="46" />
          </div>
        </div>


        {/* Excedente Declaración Renta Ejercicio Anterior */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Excedente Declaración Renta Ejercicio Anterior</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="48-" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="48" />
          </div>
        </div>

        {/* Entero Cancelado de Pago a Cuenta en Declaración que Modifica (Sólo si es Declaración Modificatoria) */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Entero Cancelado de Pago a Cuenta en Declaración que Modifica (Sólo si es Declaración Modificatoria)</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="50-" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="50" />
          </div>
        </div>


      {/* Excedente Aplicable a Pago Cuenta Próximo Período */}
          <div style={rowStyle}>
            <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Excedente Aplicable a Pago Cuenta Próximo Período</span>
            </div>                
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="54=" />
            </div>
            <div style={{ gridColumn: 'span 3', fontWeight: '700' }}>
              <CalculatedField id="54" value={formatDisplay(excedenteproximoperiodo.toFixed(2))}/>
            </div>
          </div>

      {/* TOTAL A PAGAR ENTERO PAGO A CUENTA */}
          <div style={rowStyle}>
            <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>TOTAL A PAGAR ENTERO PAGO A CUENTA</span>
            </div>                
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="56=" />
            </div>
            <div style={{ gridColumn: 'span 3', fontWeight: '700' }}>
              <CalculatedField id="56" value={formatDisplay(impuestoapagarpac.toFixed(2))}/>
            </div>
          </div>


        </div>
        </div>
          
      
      <br></br>




        <div style={{ border: '1px solid #d1d5db', borderRadius: '8px', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ backgroundColor: '#f3f4f6', padding: '12px 16px', borderBottom: '1px solid #d1d5db', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '18px', fontWeight: '500' }}>▸ Retenciones Acreditables</span>
        </div>

        {/* Rows */}
        <div>           
          {/* Servicios de Carácter Permanente */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Servicios de Carácter Permanente subordinación o dependencia laboral</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="104+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="104" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="150+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <InputField id="150" />
            </div>
          </div>

          {/* Servicios sin Dependencia Laboral */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Servicios sin Dependencia Laboral</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="106+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="106" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="152+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="152" />
            </div>
          </div>

          {/* Prestación de otros Servicios sin Dependencia Laboral */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Prestación de otros Servicios sin Dependencia Laboral</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="108+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="108" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="154+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="154" />
            </div>
          </div>

          {/* Retenciones por Juicios Ejecutivos */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Retenciones por Juicios Ejecutivos</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="110+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="110" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="156+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="156" />
            </div>
          </div>

          {/* Retenciones por Actividades Agropecuarias */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Retenciones por Actividades Agropecuarias (D.L. 422 de 17/12/1992)</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="112+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="112" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="158+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="158" />
            </div>
          </div>

          {/* Retención por Servicios de Arrendamiento a Personas Naturales */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Retención por Servicios de Arrendamiento a Personas Naturales</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="114+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="114" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="160+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="160" />
            </div>
          </div>

          {/* Retenciones sobre Premios a Personas Domiciliadas */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Retenciones sobre Premios a Personas Domiciliadas (periodos hasta diciembre de 2009)</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="116+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="116" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="162+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="162" />
            </div>
          </div>

          {/* Rentas a Personas Jurídicas: Intereses, Premios y otras Utilidades */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Rentas a Personas Juridicas Domiciliadas en concepto de Intereses, Premios y otras Utilidades provenientes de Depósitos en Dinero</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="118+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="118" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="164+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="164" />
            </div>
          </div>

          {/* Rentas a Personas Jurídicas: Intereses, Rendimientos o Utilidades (120) */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Rentas a Pesonas Juridicas Domiciliadas en concepto de Intereses, Rendimientos o Utilidades, provenientes de Títulos Valores</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="120+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="120" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="168+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="168" />
            </div>
          </div>

          {/* Rentas a Personas Jurídicas: Intereses, Rendimientos o Utilidades (121) */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Rentas a Pesonas Juridicas Domiciliadas en concepto de Intereses, Rendimientos o Utilidades, provenientes de Títulos Valores en el Exterior</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="121+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="121" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="169+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="169" />
            </div>
          </div>

          {/* Transferencia de Bienes Intangibles: Personas Naturales Domiciliadas */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Transferencia de Bienes Intangibles por Personas Naturales Domiciliadas</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="122+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="122" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="170+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="170" />
            </div>
          </div>

          {/* Transferencia de Bienes Intangibles: Personas Jurídicas Domiciliadas */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Transferencia de Bienes Intangibles por Personas Jurídicas Domiciliadas</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="124+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="124" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="172+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="172" />
            </div>
          </div>

          {/* Uso o Concesión de Uso: Personas Naturales Domiciliadas */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Retención por Uso Concesión de Uso, de Derechos de Bienes Tangibles e Intangibles a Personas Naturales Domiciliadas</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="126+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="126" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="174+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="174" />
            </div>
          </div>

          {/* Uso o Concesión de Uso: Personas Jurídicas Domiciliadas */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Retención por Uso o Concesión de Uso, de Derechos de Bienes Tangibles e Intangibles a Personas Jurídicas Domiciliadas</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="128+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="128" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="176+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="176" />
            </div>
          </div>

          {/* Operaciones de Renta y Asimiladas a Rentas */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Operaciones de Renta y Asimiladas a Rentas (Rendimiento de Capitales, Titulos Valores, Otros) a Personas Domiciliadas</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="130+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="130" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="178+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="178" />
            </div>
          </div>

          {/* Costos y Gastos Incurridos Sujetos a Retención */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Costos y Gastos Incurridos Sujetos a Retención y Entero.</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="132+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="132" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="180+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="180" />
            </div>
          </div>

          {/* Valores Garantizados Seguro Dotal */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Valores Garantizados Seguro Dotal u Otro Tipo de Seguro</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="134+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="134" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="182+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="182" />
            </div>
          </div>

          {/* Rentas Obtenidas en el País por Personas No Domiciliadas */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Rentas Obtenidas en el País por Personas No Domiciliadas</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="136+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="136" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="184+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="184" />
            </div>
          </div>

          {/* Retenciones sobre Premios a Personas No Domiciliadas */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Retenciones sobre Premios a Personas No Domiciliadas</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="138+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="138" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="186+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="186" />
            </div>
          </div>

          {/* Pagos Efectuados a Casa Matriz */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Pagos Efectuados a Casa Matriz por Filiales o Sucursales</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="140+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="140" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="188+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="188" />
            </div>
          </div>

          {/* Transferencia de Bienes Intangibles: Personas No Domiciliadas */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Transferencia de Bienes Intangibles por Personas No Domiciliadas</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="142+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="142" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="190+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="190" />
            </div>
          </div>

          {/* Servicios Utilizados en el País por Actividades Originadas en el Exterior */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Servicios Utilizados en el País por Actividades Originadas en el Exterior</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="144+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="144" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="192+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="192" />
            </div>
          </div>

          {/* Otras Retenciones (no servicios personales) */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Otras Retenciones (no servicios personales)</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="146+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="146" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="194+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <InputField id="194" />
            </div>
          </div>

        {/* TOTAL ENTERO RETENCIONES ACREDITABLES */}
          <div style={rowStyle}>
            <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>TOTAL ENTERO RETENCIONES ACREDITABLES</span>
            </div>                
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="224=" />
            </div>
            <div style={{ gridColumn: 'span 3', fontWeight: '700' }}>
              <CalculatedField id="24" value={formatDisplay(totalsretencionesA.retencionesA.toFixed(2))}/>
            </div>
          </div>


            
        </div>

             
        </div>

      <br></br>


      <div style={{ border: '1px solid #d1d5db', borderRadius: '8px', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ backgroundColor: '#f3f4f6', padding: '12px 16px', borderBottom: '1px solid #d1d5db', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '18px', fontWeight: '500' }}>▸ Retenciones Definitivas</span>
        </div>

        {/* Rows */}
        <div>           
          {/* 260 - Rentas a Personas Naturales Domiciliadas en concepto de Intereses, Premios y Otras Utilidades proveneintes de Depósitos en Dinero */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Rentas a Personas Naturales Domiciliadas en concepto de Intereses, Premios y Otras Utilidades proveneintes de Depósitos en Dinero</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="260+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="260" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="296+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="296" />
            </div>
          </div>

          {/* 262 - Rentas a Personas Naturales Domiciliadas en concepto de Intereses, Rendimientos o Utilidades provenientes de Títulos Valores */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Rentas a Personas Naturales Domiciliadas en concepto de Intereses, Rendimientos o Utilidades provenientes de Títulos Valores</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="262+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="262" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="298+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="298" />
            </div>
          </div>

          {/* 263 - Rentas a Personas Naturales Domiciliadas en concepto de Intereses, Rendimientos o Utilidades provenientesde Títulos Valores en el Exterior */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Rentas a Personas Naturales Domiciliadas en concepto de Intereses, Rendimientos o Utilidades provenientesde Títulos Valores en el Exterior</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="263+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="263" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="299+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="299" />
            </div>
          </div>

          {/* 264 - Premios o Ganancias a Personas Domiciliadas procedentes de Concursos, Rifas, Sorteos o Juegos de Azar o de Habilidad (para períodos de enero de 2010 en adelante) */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Premios o Ganancias a Personas Domiciliadas procedentes de Concursos, Rifas, Sorteos o Juegos de Azar o de Habilidad (para períodos de enero de 2010 en adelante)</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="264+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="264" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="300+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="300" />
            </div>
          </div>

          {/* 268 - Rentas Obtenidas en el País por Personas No Domiciliadas por Rendimiento de Capitales Invertidos, Títulos Valores, Otros. */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Rentas Obtenidas en el País por Personas No Domiciliadas por Rendimiento de Capitales Invertidos, Títulos Valores, Otros.</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="268+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="268" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="302+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="302" />
            </div>
          </div>

          {/* 270 - Retención por Uso o Concesión de Uso, de Derechos de Bienes Tangibles e Intangibles a Personas No Domiciliadas */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Retención por Uso o Concesión de Uso, de Derechos de Bienes Tangibles e Intangibles a Personas No Domiciliadas</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="270+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="270" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="304+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="304" />
            </div>
          </div>

          {/* 272 - Transferencia de Bienes Intangibles por Personas No Domiciliadas */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Transferencia de Bienes Intangibles por Personas No Domiciliadas</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="272+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="272" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="306+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="306" />
            </div>
          </div>

          {/* 274 - Rentas Obtenidas en el País por Personas No Domiciliadas */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Rentas Obtenidas en el País por Personas No Domiciliadas</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="274+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="274" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="308+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="308" />
            </div>
          </div>

          {/* 276 - Servicios Utilizados en el País por Actividades Originadas en el Exterior */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Servicios Utilizados en el País por Actividades Originadas en el Exterior</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="276+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="276" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="310+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="310" />
            </div>
          </div>

          {/* 278 - Pagos Efectuados a Casa Matriz (no domiciliadas) por Filiales o Sucursales Domiciliadas */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Pagos Efectuados a Casa Matriz (no domiciliadas) por Filiales o Sucursales Domiciliadas</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="278+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="278" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="312+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="312" />
            </div>
          </div>

          {/* 280 - Servicios de Transporte Internacional a personas No Domiciliadas */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Servicios de Transporte Internacional a personas No Domiciliadas</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="280+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="280" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="314+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="314" />
            </div>
          </div>

          {/* 282 - Servicios por Aseguradoras, Reaseguradoras, Afianzadoras, Reafianzadoras y Corredores de Reaseguros No Domiciliados */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Servicios por Aseguradoras, Reaseguradoras, Afianzadoras, Reafianzadoras y Corredores de Reaseguros No Domiciliados</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="282+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="282" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="316+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="316" />
            </div>
          </div>

          {/* 284 - Servicios de Financiamiento por Instituciones Financieros No Domiciliadas */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Servicios de Financiamiento por Instituciones Financieros No Domiciliadas</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="284+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="284" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="318+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="318" />
            </div>
          </div>

          {/* 286 - Operaciones con Intangibles uso o Concesesión de uso de Derechos de Bienes Tangibles e Intangibles a Sujetos No Domiciliados (películas, videos, telenovelas, otros) */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Operaciones con Intangibles uso o Concesesión de uso de Derechos de Bienes Tangibles e Intangibles a Sujetos No Domiciliados (películas, videos, telenovelas, otros)</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="286+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="286" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="320+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="320" />
            </div>
          </div>

          {/* 288 - Rentas a Personas Constituidas, Domiciliadas o Residentes en Países con Regímenes Fiscales Preferentes o Paraísos Fiscales. */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Rentas a Personas Constituidas, Domiciliadas o Residentes en Países con Regímenes Fiscales Preferentes o Paraísos Fiscales.</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="288+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="288" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="322+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="322" />
            </div>
          </div>

          {/* 290 - Premios o Ganancias a Personas No Domiciliadas Procedentes de Concursos, Rifas, Sorteos o Juegos de Azar o de Habilidad */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Premios o Ganancias a Personas No Domiciliadas Procedentes de Concursos, Rifas, Sorteos o Juegos de Azar o de Habilidad</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="290+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="290" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="324+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="324" />
            </div>
          </div>

          {/* 406 - Pago o Acreditación de Utilidades a Socios, Accionistas, Asociados, Fideicomisarios, Partícipes, Inversionistas o Beneficiarios */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Pago o Acreditación de Utilidades a Socios, Accionistas, Asociados, Fideicomisarios, Partícipes, Inversionistas o Beneficiarios</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="406+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="406" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="412+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="412" />
            </div>
          </div>

          {/* 294 - Retenciones por pagos o acreditamientos de utilidades a sujetos no domiciliados, por representantes de casas matrices, filiales, sucursales, agencias y otros establecimientos */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Retenciones por pagos o acreditamientos de utilidades a sujetos no domiciliados, por representantes de casas matrices, filiales, sucursales, agencias y otros establecimientos</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="294+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="294" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="295+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="295" />
            </div>
          </div>

          {/* 408 - Retenciones por Pagos o Acreditamientos en las Disminuciones de Capital o Patrimonio por Capitalizaciones o Reinversiones de Utilidades */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Retenciones por Pagos o Acreditamientos en las Disminuciones de Capital o Patrimonio por Capitalizaciones o Reinversiones de Utilidades</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="408+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="408" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="414+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="414" />
            </div>
          </div>

          {/* 410 - Pago o acreditación en disminución de capital o patrimonio (parte correspondiente a capitalizaciones o reinversión de utilidades) */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Pago o acreditación en disminución de capital o patrimonio (parte correspondiente a capitalizaciones o reinversión de utilidades)</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="410+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="410" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="416+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="416" />
            </div>
          </div>

          {/* 432 - Préstamos, multas, anticipos o financiamientos (en dinero o bienes en especie) */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Préstamos, multas, anticipos o financiamientos (en dinero o bienes en especie)</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="432+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="432" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="434+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="434" />
            </div>
          </div>

          {/* 292 - Otras Retenciones */}
          <div className="fila" style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Otras Retenciones</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="292+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="292" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="326+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <InputField id="326" />
            </div>
          </div>

        {/* TOTAL ENTERO RETENCIONES DEFINITIVAS */}
          <div style={rowStyle}>
            <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>TOTAL ENTERO RETENCIONES DEFINITIVAS</span>
            </div>                
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="224=" />
            </div>
            <div style={{ gridColumn: 'span 3', fontWeight: '700' }}>
              <CalculatedField id="24" value={formatDisplay(totalsretencionesD.retencionesD.toFixed(2))}/>
            </div>
          </div>


            
        </div>
        
        </div>







      <br></br>



        <div style={{ border: '1px solid #d1d5db', borderRadius: '8px', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ backgroundColor: '#f3f4f6', padding: '12px 16px', borderBottom: '1px solid #d1d5db', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '18px', fontWeight: '500' }}>▸ Multas e intereses</span>
        </div>

        {/* Rows */}
        <div>
          
        {/* Multa Pago a Cuenta */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Multa Pago a Cuenta</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="340+" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="340" />
          </div>
        </div>

        {/* Multa Retenciones */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Multa Retenciones</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="342+" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="342" />
          </div>
        </div>

        {/* Multa Operaciones Financieras y Contribución Especial */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Multa Operaciones Financieras y Contribución Especial</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="343+" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="343" />
          </div>
        </div>

      {/* Multa Agentes Extranjeros*/}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Multa Agentes Extranjeros</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="750+" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="750" />
          </div>
        </div>

        
        {/* TOTAL MULTAS */}
          <div style={rowStyle}>
            <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>TOTAL MULTAS</span>
            </div>                
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="344=" />
            </div>
            
              <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="344" value={formatDisplay(totalsmultas.multas.toString())}/>
            </div>
          </div>

          {/* Intereses*/}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Intereses</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="346+" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="346" />
          </div>
        </div>

        </div>
        </div>




<br></br>
      <br></br>

       <div style={{ backgroundColor: '#99c4f0', border: '1px solid #d1d5db', borderRadius: '8px', overflow: 'hidden' }}>
      
      {/* TOTAL A PAGAR */}
          <div style={rowStyle}>
            <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>TOTAL A PAGAR</span>
            </div>                
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="348=" />
            </div>
            <div style={{ gridColumn: 'span 3', fontWeight: '700' }}>
              <CalculatedField id="348" value={formatDisplay(totalapagar.toFixed(2))}/>
            </div>
          </div>

      
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
  );
};

export default TaxForm;