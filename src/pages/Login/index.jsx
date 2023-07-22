import { Link } from "react-router-dom";
import { useState } from "react";
import Botao from '../../components/Botao';
import Input from '../../components/Input';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");


  const confirmarLogin = () => {
    if (email === "") {
      toast.warn("Digite um e-mail válido");
      return;
    }
    if (senha === "") {
      toast.warn("Digite uma senha válida");
      return;
    }
  }

  return (
    <>
    <section>
      <div className="loginContainer">
        <div className="loginTitulo">
          <h1>Seja bem vindo!</h1>
          <p>Digite os seus dados de acesso:</p>
        </div>

        <form>
          <Input
            etiqueta="Email"
            id="email"
            aoMudar={(e) => setEmail(e.target.value)}
            tipo="text"
          />
          <Input
            etiqueta="Senha"
            id="senha"
            aoMudar={(e) => setSenha(e.target.value)}
            tipo="password"
          />
          
          <div className="loginBotao">
            <Botao
              aoClicar={confirmarLogin}
              tipo="button"
              enviar="Entrar"
              cor="green"
            />
            <Link to="cadastro" className="linkEstilizado">Fazer Cadastro</Link>
          </div>
        </form>
      </div>
    </section>

    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
<ToastContainer />
    </>
  );
  };

export default Login;