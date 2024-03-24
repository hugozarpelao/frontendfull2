import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './componentes/home';
import Erro404 from "./componentes/erro404";
import Carro from "./componentes/carro";
import GrupoCarro from "./componentes/grupocarro";
import { ContextoUsuario } from "./contextos/contexto.js";
import FormularioLogin from "./formularios/login.jsx";
import { useState } from 'react';
import FormularioCarro from "./formularios/carro.jsx";

function App() {

  const [usuario, setUsuario] = useState({
    nome: "",
    logado: false
  });

  if (!usuario.logado) {
    return <ContextoUsuario.Provider value={[usuario, setUsuario]}>
      <FormularioLogin />
    </ContextoUsuario.Provider>;
  }
  else {
    return (
      <ContextoUsuario.Provider value={[usuario, setUsuario]}>
        <BrowserRouter>
          <Routes>
            <Route path='/carros' element={<Carro />} />
            <Route path='/carros/cadastro' element={<FormularioCarro />} />
            <Route path='/grupos' element={<GrupoCarro />} />
            <Route path='/' element={<Home />} />
            <Route path='*' element={<Erro404 />} />
          </Routes>
        </BrowserRouter>
      </ContextoUsuario.Provider>
    );
  }
}

export default App;
