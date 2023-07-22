import { Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Botao from "../../components/Botao";
import Input from "../../components/Input";
import "./cadastrar.css";
import "react-toastify/dist/ReactToastify.css";

const Cadastrar = () => {
  
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const atualizarForm = (valor, campo) => {
    console.log(`Campo ${campo}: ${valor}`);

    if (campo === "nome") {
      setForm({ ...form, nome: valor });
    }

    if (campo === "email") {
      setForm({ ...form, email: valor });
    }

    if (campo === "senha") {
      setForm({ ...form, senha: valor });
    }
  };

  return (
    <>
      <section>
        <div className="cadastroContainer">
          <div className="cadastroTitulo">
            <h1>Cadastro</h1>
            <p>Cadastre-se para acessar o sistema</p>
          </div>

          <form>
            <Input
              etiqueta="Nome"
              id="nome"
              aoMudar={(e) => atualizarForm(e.target.value, "nome")}
              tipo="text"
            />
            <Input
              etiqueta="Email"
              id="email"
              aoMudar={(e) => atualizarForm(e.target.value, "email")}
              tipo="text"
            />
            <Input
              etiqueta="Senha"
              id="senha"
              aoMudar={(e) => atualizarForm(e.target.value, "senha")}
              tipo="password"
            />

            <div className="cadastroBotao">
              <Botao
                aoClicar={{atualizarForm}}
                tipo="button"
                enviar="Cadastrar"
                cor="green"
              />
              <Link to="/Login" className="linkEstilizado">
                Voltar ao Login
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

export default Cadastrar;