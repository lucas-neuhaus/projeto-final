import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Cadastrar from "./pages/Cadastrar";
import EstoqueLista from "./pages/EstoqueLista";
import EstoqueCadastro from "./pages/EstoqueCadastro";
import EstoqueAtualizar from "./pages/EstoqueAtualizar";
import Armazem from "./pages/Armazem";

import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="login" element={<Login />}></Route>
            <Route path="cadastrar" element={<Cadastrar />}></Route>
            <Route path="estoque" element={<EstoqueLista />}></Route>
            <Route path="estoqueCadastro" element={<EstoqueCadastro />}></Route>
            <Route path="estoqueAtualizar/:id" element={<EstoqueAtualizar />} />
            <Route path="armazem" element={<Armazem />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;