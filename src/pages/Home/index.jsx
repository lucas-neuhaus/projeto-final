import { Outlet, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import "./home.css";

export default function Home() {
  const location = useLocation();
  const [rotaAtiva, setRotaAtiva] = useState(location.pathname);

  useEffect(() => {
    setRotaAtiva(location.pathname);
  }, [location]);

  return (
    <div className='Home-container'>
      <div className='Home'>
      <img src="./imagens/logo3.png" alt="Logo do Site de Adoção DevIN" />
        <h1>DEVIN ADOÇÃO</h1>
        <Link to="/Login" className={rotaAtiva === "/Login" ? "active" : ""}>Login</Link>
        <Link to="/Cadastrar" className={rotaAtiva === "/Cadastrar" ? "active" : ""}>Cadastrar</Link>
        <Link to="/Estoque" className={rotaAtiva === "/Estoque" ? "active" : ""}>Estoque</Link>
        <Link to="/Armazem" className={rotaAtiva === "/Armazem" ? "active" : ""}>Armazém</Link>
      </div>
      <div className='Home-content'><Outlet /></div>
    </div>
  );
}
