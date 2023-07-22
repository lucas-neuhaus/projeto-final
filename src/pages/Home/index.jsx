import React from 'react'
import { Outlet, Link } from 'react-router-dom';

import "./home.css";


export default function Home() {
  return (
   <div className='Home-container'>
   <div className='Home'>

    <h1>Ola mundo</h1>
    
      <Link to="/Login"> Login</Link>
      <Link to="/Cadastrar"> Cadastrar</Link>
      <Link to="/Estoque"> Estoque</Link>
      <Link to="/Armazem"> Armazem</Link>
    

   </div>
   <div className='Home-content'><Outlet></Outlet></div>
   </div>
  
  )
}