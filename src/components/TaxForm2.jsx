import React, { useState, useRef } from 'react';

const TaxForm = () => {
  const [values, setValues] = useState({
    '85': '0.00', '86': '0.00', '88': '0.00', '89': '0.00',
    '90': '0.00', '91': '0.00', '94': '0.00', '92': '0.00',
    '93': '0.00', '95': '0.00', '96': '0.00', '586': '0.00',
    '97': '0.00', '98': '0.00', '99': '0.00',
    '146': '0.00',

    '65': '0.00', '66': '0.00', '70': '0.00', '77': '0.00',
    '75': '0.00', '76': '0.00', '80': '0.00', '588': '0.00',
    '81': '0.00', '550': '0.00',

    '110': '0.00', '115': '0.00', '128': '0.00', '132': '0.00',
    '133': '0.00', '134': '0.00', '200': '0.00', '151': '0.00',

    '161': '0.00', '162': '0.00', '163': '0.00', '164': '0.00',
    '165': '0.00',

    '169': '0.00', '170': '0.00', '172': '0.00', '171': '0.00',

    '194': '0.00', '192': '0.00', '199': '0.00', '193': '0.00',

    '196': '0.00',





    '22': '0.00', '26': '0.00', '28': '0.00', '20': '0.00',
    '24': '0.00', '30': '0.00', '32': '0.00',

    '46': '0.00', '48': '0.00', '50': '0.00',



        

  });

  const inputRefs = useRef({});

  const fieldOrder = [
    '85', '86', '88', '89', '90', '91', '94', '92', '93',
    '95', '96', '586', '97', '98', '99', '146',
    
    '65', '66', '70', '77',
    '75', '76', '80', '588',
    '81', '550',

    '110', '115', '128', '132',
    '133', '134', '200', '151',

    '161', '162', '163', '164', '165',

    '169', '170', '172', '171',

    '194', '192', '199', '193',

    '196',

    





    '22', '26', '28', '20', '24', '30', '32',

    '46', '48', '50',


  ];

  // Calcular automáticamente los valores de la columna derecha (13%)
  const calculateTax = (baseValue) => {
    const num = parseFloat(baseValue.replace(/,/g, '')) || 0;
    const tax = num * 0.13;
    return formatDisplay(tax.toFixed(2));
  };

  const getCalculatedValue = (id) => {
    const taxMap = {
      '141': '88',
      '142': '89',
      '135': '95',
      '140': '96',
      '587': '586',
      '143': '97',
      '144': '98',
      
      '127': '77',
      '125': '75',
      '126': '76',
      '130': '80',
      '589': '588',
      '131': '81',
      '551': '550',

     
      

    };
    
    if (taxMap[id]) {
      return calculateTax(values[taxMap[id]]);
    }
    return '0.00';
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


  
  
  
  
  
  
  
  
  
  
  
  const calculateTotals = () => {
    const ventasFields = ['85', '86', '88', '89', '90', '91', '94', '92', '93', '95', '96', '586', '98', '99'];
    
    const ventas = ventasFields.reduce((sum, key) => {
      const val = parseFloat(values[key].replace(/,/g, '')) || 0;
      return sum + val;
    }, 0);


     
    // Restar el valor de 97-
    const deductionventas = parseFloat(values['97'].replace(/,/g, '')) || 0;
    const ventasTotal = ventas - deductionventas;

    // Calcular créditos usando los valores calculados
    const debitFields = ['141', '142', '135', '140', '587', '144'];
    const debitos = debitFields.reduce((sum, key) => {
      const val = parseFloat(getCalculatedValue(key).replace(/,/g, '')) || 0;
      return sum + val;
    }, 0);
    
    // Restar 143- y sumar 146+
    const debitDeduction = parseFloat(getCalculatedValue('143').replace(/,/g, '')) || 0;
    const debit146 = parseFloat(values['146'].replace(/,/g, '')) || 0;
    const debitosTotal = debitos - debitDeduction + debit146;

    return { ventas: ventasTotal, debitos: debitosTotal };
  };

  const totals = calculateTotals();

  






    
  const calculateTotalsCompras = () => {
    const comprasFields = ['65', '66', '70', '77', '75', '76', '80', '588'];
    
    const compras = comprasFields.reduce((sum, key) => {
      const val = parseFloat(values[key].replace(/,/g, '')) || 0;
      return sum + val;
    }, 0);

    
    // Restar el valor de 81- y 550-
    const deductioncompras1 = parseFloat(values['81'].replace(/,/g, '')) || 0;
    const deductioncompras2 = parseFloat(values['550'].replace(/,/g, '')) || 0;
    const comprasTotal = compras - deductioncompras1 - deductioncompras2;

    // Calcular créditos usando los valores calculados
    const creditFields = ['127', '125', '126', '130', '589'];
    const creditos = creditFields.reduce((sum, key) => {
      const val = parseFloat(getCalculatedValue(key).replace(/,/g, '')) || 0;
      return sum + val;
    }, 0);
    
    // Restar 131- 551-
    const creditDeduction1 = parseFloat(getCalculatedValue('131').replace(/,/g, '')) || 0;
    const creditDeduction2 = parseFloat(getCalculatedValue('551').replace(/,/g, '')) || 0;

    // Sumar 110+ 128+ 133+
    const otroscreditosFields = ['110', '128', '133'];
    
    const otroscreditos = otroscreditosFields.reduce((sum, key) => {
      const val = parseFloat(values[key].replace(/,/g, '')) || 0;
      return sum + val;
    }, 0);

    // Restar 115- 132- 134- 200- 151-
    const otroscreditosFields2 = ['115', '132', '134', '200', '151'];
    
    const otroscreditos2 = otroscreditosFields2.reduce((sum, key) => {
      const val = parseFloat(values[key].replace(/,/g, '')) || 0;
      return sum + val;
    }, 0);

    //Todas las operaciones de créditos y otros créditos
    const creditosTotal = creditos - creditDeduction1 - creditDeduction2 + otroscreditos - otroscreditos2;

    return { compras: comprasTotal, creditos: creditosTotal };
  };

  const totalscompras = calculateTotalsCompras();


  // Débito fiscal menos crédito fiscal, redondeado a 2 decimales
  const diferencia = Math.round((totals.debitos - totalscompras.creditos) * 100) / 100;

  // Positivo: va a Impuesto Determinado. Negativo: va a Remanente (en positivo)
  const impuestoDeterminado = diferencia > 0 ? diferencia : 0;
  const remanente = diferencia < 0 ? Math.abs(diferencia) : 0;
  
  
  


  


  const calculateTotalsefectuadaspor = () => {
    const efectuadasporFields = ['169', '170', '172', '171',];
    
    const efectuadaspor = efectuadasporFields.reduce((sum, key) => {
      const val = parseFloat(values[key].replace(/,/g, '')) || 0;
      return sum + val;
    }, 0);
    
        
    //Todas las operaciones de transacciones a favor
    const efectuadasporTotal = efectuadaspor;

    return { efectuadaspor: efectuadasporTotal };
  };

  const totalsefectuadaspor = calculateTotalsefectuadaspor();
  
  

  


  const calculateTotalsMultas = () => {
    const multasFields = ['194', '192', '199', '193',];
    
    const multas = multasFields.reduce((sum, key) => {
      const val = parseFloat(values[key].replace(/,/g, '')) || 0;
      return sum + val;
    }, 0);
    
        
    //Todas las operaciones de transacciones a favor
    const multasTotal = multas;

    return { multas: multasTotal };
  };

  const totalsmultas = calculateTotalsMultas();
  
  
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
      </div>




        <br></br>

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
          <span style={{ fontSize: '18px', fontWeight: '500' }}>▸ Compra de Bienes y/o Servicios</span>
          <span style={{ marginLeft: 'auto', color: '#374151', fontWeight: '500' }}>Créditos</span>
        </div>

        {/* Rows */}
        <div>
          {/* Compras Internas Exentas y/o No Sujetas */}
          <div style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Compras Internas Exentas y/o No Sujetas</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="65+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="65" />
            </div>
            <div style={{ gridColumn: 'span 5' }}></div>
          </div>

          {/* Compras a sujetos excluidos */}
          <div style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Compras a sujetos excluidos</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="66+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="66" />
            </div>
            <div style={{ gridColumn: 'span 5' }}></div>
          </div>

          {/* Importaciones Exentas y/o No Sujetas */}
          <div style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Importaciones Exentas y/o No Sujetas</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="70+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="70" />
            </div>
          </div>

          {/* Importaciones Gravadas de Servicios */}
          <div style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Importaciones Gravadas de Servicios</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="77+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="77" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="127+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="127" />
            </div>
          </div>

          {/* Importaciones Gravadas de Mercancías (Fuera de Región C.A.) */}
          <div style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Importaciones Gravadas de Mercancías (Fuera de Región C.A.)</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="75+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="75" />
            </div>
            {/* <div style={{ gridColumn: 'span 5' }}></div> */}
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="125+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="125" />
            </div>
          </div>

          {/* Internaciones Gravadas de Mercancías (Dentro Región C.A.) */}
          <div style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Internaciones Gravadas de Mercancías (Dentro Región C.A.)</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="76+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="76" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="126+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="126" />
            </div>
          </div>

          {/* Compras Internas Gravadas */}
          <div style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Compras Internas Gravadas</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="80+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="80" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="130+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="130" />
            </div>
          </div>

          {/* Compras Gravadas de Combustible con tasas diferenciadas de IVA */}
          <div style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Compras Gravadas de Combustible con tasas diferenciadas de IVA</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="588+" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="588" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="589+" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="589" />
            </div>
          </div>

          {/* Devoluciones, Rebajas, Descuentos u otras Deducciones sobre Compras */}
          <div style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Devoluciones, Rebajas, Descuentos u otras Deducciones sobre Compras</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="81-" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="81" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="131-" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="131" />
            </div>
          </div>

          {/* Devoluciones, Rebajas, Descuentos u otras Deducciones Sobre Compras por precios máximos de combustibles */}
          <div style={rowStyle}>
            <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Devoluciones, Rebajas, Descuentos u otras Deducciones Sobre Compras por precios máximos de combustibles</span>
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="550-" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <InputField id="550" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="551-" />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="551" />
            </div>
          </div>                   
        </div>



        {/* Header */}
        <div style={{ backgroundColor: '#f3f4f6', padding: '12px 16px', borderBottom: '1px solid #d1d5db', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '18px', fontWeight: '500' }}>▸ Otros Créditos</span>
        </div>

        {/* Remanente de Crédito del Período anterior */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Remanente de Crédito del Período anterior</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="110+" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="110" />
          </div>
        </div>

        {/* Reintegro Crédito Fiscal IVA por Exportaciones (en el período que se Notificó Resolución) */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Reintegro Crédito Fiscal IVA por Exportaciones (en el período que se Notificó Resolución)</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="115-" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="115" />
          </div>
        </div>

        {/* Crédito por Retención 13% IVA a terceros domiciliados (Art. 162 C.T) */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Crédito por Retención 13% IVA a terceros domiciliados (Art. 162 C.T)</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="128+" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="128" />
          </div>
        </div>

        {/* Crédito IVA por Proporcionalidad mensual (No deducible del Débito) */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Crédito IVA por Proporcionalidad mensual (No deducible del Débito)</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="132-" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="132" />
          </div>
        </div>

        {/* Crédito IVA por Ajuste de Proporcionalidad Anual (si resulta Superior al efectivamente Deducido) */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Crédito IVA por Ajuste de Proporcionalidad Anual (si resulta Superior al efectivamente Deducido)</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="133+" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="133" />
          </div>
        </div>

        {/* Crédito IVA por Ajuste de Proporcionalidad Anual (si resulta Inferior al efectivamente Deducido) */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Crédito IVA por Ajuste de Proporcionalidad Anual (si resulta Inferior al efectivamente Deducido)</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="134-" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="134" />
          </div>
        </div>

        {/* Disminución de Saldo a Favor (Remanente de Crédito Fiscal) por aplicación del Art 74-A del C.T. */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Disminución de Saldo a Favor (Remanente de Crédito Fiscal) por aplicación del Art 74-A del C.T.</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="200-" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="200" />
          </div>
        </div>

        {/* Crédito Proveniente de Débito Negativo */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Crédito Proveniente de Débito Negativo</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="151-" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="151" />
          </div>
        </div>
        

   










        {/* Totals */}
        <div style={{ backgroundColor: '#f9fafb', borderTop: '2px solid #9ca3af', padding: '12px 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '16px' }}>
            <div style={{ gridColumn: 'span 4' }}></div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '14px' }}>
              Suma de Compras
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="100=" />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600' }}>
              {formatDisplay(totalscompras.compras.toString())}
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '14px' }}>
              Suma de Créditos
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="145=" />
            </div>
            <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600' }}>
              {formatDisplay(totalscompras.creditos.toString())}
            </div>
          </div>
        </div>
        </div>

      <br></br>
      <br></br>

       <div style={{ backgroundColor: '#99c4f0', border: '1px solid #d1d5db', borderRadius: '8px', overflow: 'hidden' }}>
      
      {/* REMANENTE CRÉDITO PRÓXIMO PERÍODO */}
          <div style={rowStyle}>
            <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>REMANENTE CRÉDITO PRÓXIMO PERÍODO</span>
            </div>                
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="155=" />
            </div>
            <div style={{ gridColumn: 'span 3', fontWeight: '700' }}>
              <CalculatedField id="155" value={formatDisplay(remanente.toFixed(2))}/>
            </div>
          </div>

      {/* IMPUESTO DETERMINADO */}
          <div style={rowStyle}>
            <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>IMPUESTO DETERMINADO</span>
            </div>                
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="160=" />
            </div>
            <div style={{ gridColumn: 'span 3', fontWeight: '700' }}>
              <CalculatedField id="160" value={formatDisplay(impuestoDeterminado.toFixed(2))}/>
            </div>
          </div>
          </div>
          
       

         <br></br>
         <br></br>



        



        <div style={{ border: '1px solid #d1d5db', borderRadius: '8px', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ backgroundColor: '#f3f4f6', padding: '12px 16px', borderBottom: '1px solid #d1d5db', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '18px', fontWeight: '500' }}>▸ Montos retenidos y percibidos por el declarante</span>
        </div>

        {/* Rows */}
        <div>
          
        {/* Percepción IVA del 1% efectuada por el Declarante */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Percepción IVA del 1% efectuada por el Declarante</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="169+" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="169" />
          </div>
        </div>

        {/* Retención IVA del 1% Terceros Domiciliados efectuada por el Declarante */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Retención IVA del 1% Terceros Domiciliados efectuada por el Declarante</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="170+" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="170" />
          </div>
        </div>

        {/* Retención IVA del 13 % Terceros Domiciliados Efectuadas por el Declarante */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Retención IVA del 13 % Terceros Domiciliados Efectuadas por el Declarante</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="172+" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="172" />
          </div>
        </div>

      {/* Anticipo a Cuenta IVA del 2% efectuada por el Declarante*/}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Anticipo a Cuenta IVA del 2% efectuada por el Declarante</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="171+" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="171" />
          </div>
        </div>

        
        {/* TOTAL A PAGAR DE IMPUESTO POR RETENCIONES Y PERCEPCIONES DEL PERÍODO POR EL DECLARANTE */}
          <div style={rowStyle}>
            <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>TOTAL A PAGAR DE IMPUESTO POR RETENCIONES Y PERCEPCIONES DEL PERÍODO POR EL DECLARANTE</span>
            </div>                
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="524=" />
            </div>
            
              <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="524" value={formatDisplay(totalsefectuadaspor.efectuadaspor.toString())}/>
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
          
        {/* Multa Impuesto */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Multa Impuesto</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="194+" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="194" />
          </div>
        </div>

        {/* Multa Percepción 1% */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Multa Percepción 1%</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="192+" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="192" />
          </div>
        </div>

        {/* Multa Anticipo a Cuenta del 2% */}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Multa Anticipo a Cuenta del 2%</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="199+" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="199" />
          </div>
        </div>

      {/* Multa Retención*/}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Multa Retención</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="193+" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="193" />
          </div>
        </div>

        
        {/* TOTAL MULTAS */}
          <div style={rowStyle}>
            <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>TOTAL MULTAS</span>
            </div>                
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="195=" />
            </div>
            
              <div style={{ gridColumn: 'span 3' }}>
              <CalculatedField id="195" value={formatDisplay(totalsmultas.multas.toString())}/>
            </div>
          </div>

          {/* Intereses*/}
        <div style={rowStyle}>
          <div style={{ gridColumn: 'span 7', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Intereses</span>
          </div>
          <div style={{ gridColumn: 'span 2' }}></div>
          <div style={{ gridColumn: 'span 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CodeLabel code="196+" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
              <InputField id="196" />
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
              <CodeLabel code="198=" />
            </div>
            <div style={{ gridColumn: 'span 3', fontWeight: '700' }}>
              <CalculatedField id="198" value={formatDisplay(remanente.toFixed(2))}/>
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