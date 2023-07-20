import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Cadastrar from "./pages/Cadastrar";
import Estoque from "./pages/Estoque";
import Armazem from "./pages/Armazem";

import Home from "./components/Home"



const App = () => {
  return ( 
    
    <>
    <Home />
    <BrowserRouter>
      <Routes>

        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Cadastrar" element={<Cadastrar />}></Route>
        <Route path="/Estoque" element={<Estoque />}></Route>
        <Route path="/Armazem" element={<Armazem />}></Route>

      </Routes>
    </BrowserRouter>
    </>
   
  );
};

export default App;
