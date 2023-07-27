import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Botao from "../../components/Botao";
import Input from "../../components/Input";
import "./cadastrar.css";
import "react-toastify/dist/ReactToastify.css";

const Cadastrar = () => {

  const navegar = useNavigate();
  
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

  const enviaDadosParaBackend = () => {
    if (!form.nome || !form.email || !form.senha) {
      toast.warn("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    fetch("http://localhost:8080/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Usuário cadastrado com sucesso!");
  
        const novoUsuarioLogin = {
          email: data.email,
          senha: data.senha,
        };
        console.log("Novo usuário para login:", novoUsuarioLogin);
        
        fetch("http://localhost:8080/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(novoUsuarioLogin),
        })
          .then(() => {
            navegar("/estoque");
          })
          .catch((error) => {
            console.error("Erro ao atualizar informações de login:", error);
            toast.error("Erro ao cadastrar o usuário");
          });
      })
      .catch((error) => {
        console.error("Erro ao cadastrar o usuário:", error);
        toast.error("Erro ao cadastrar o usuário");
      });
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
                aoClicar={() => {
                  enviaDadosParaBackend();
                }}
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