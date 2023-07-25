import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Botao from "../../components/Botao";
import Input from "../../components/Input";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navegar = useNavigate();

  const confirmarLogin = () => {
    if (email === "") {
      toast.warn("Digite um e-mail válido");
      return;
    }
    if (senha === "") {
      toast.warn("Digite uma senha válida");
      return;
    }
  
    fetch("http://localhost:3000/login")
      .then((response) => response.json())
      .then((data) => {
        const usuario = data.find((usuario) => usuario.email === email && usuario.senha === senha);
  
        if (usuario) {
          toast.success("Login bem-sucedido!");
          navegar("/estoque");
        } else {
          toast.warn("Credenciais inválidas");
        }
      })
      .catch((error) => {
        console.error("Erro ao efetuar o login:", error);
        toast.error("Erro ao efetuar o login");
      });
  };
  
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
              <Link to="/Cadastrar" className="linkEstilizado">
                Fazer Cadastro
              </Link>
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
    </>
  );
};

export default Login;
