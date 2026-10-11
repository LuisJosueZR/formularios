/* import TaxForm from './components/TaxForm'

   function App() {
     return (
       <div className="min-h-screen bg-gray-100 py-8">
         <TaxForm />
       </div>
     )
   }

   export default App  */

import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import FormularioIVA from './pages/FormularioIVA'
import FormularioPAC from './pages/FormularioPAC'
import CalculadoraIVA from './pages/CalculadoraIVA'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/formulario-iva" element={<FormularioIVA />} />
        <Route path="/formulario-pac" element={<FormularioPAC />} />
        <Route path="/calculadora-iva" element={<CalculadoraIVA />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App