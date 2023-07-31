import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Botao from "../../components/Botao";
import Input from "../../components/Input";

import "react-toastify/dist/ReactToastify.css";
import "./armazem.css";

const Armazem = () => {
  const [nome, setNome] = useState("");
  const [animal, setAnimal] = useState("");
  const [armazensCadastrados, setArmazensCadastrados] = useState([]);

  const animalLong = {
    gato: 1,
    cachorro: 2,
  };

  const cadastrarArmazem = () => {
    const novoArmazem = {
      nome: nome,
      animal: animalLong[animal],
      ativo: true,
    };

    fetch("http://localhost:8080/armazens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoArmazem),
    })
      .then((response) => {
        if (response.ok) {
          buscarArmazensCadastrados();
          setNome("");
          setAnimal("");
        } else {
          toast.error("Erro ao cadastrar o armazém!");
        }
      })
      .catch((error) => {
        console.error("Erro ao atualizar informações do armazém:", error);
        toast.error("Erro ao cadastrar o armazém!");
      });
  };

  const apagarArmazem = (id) => {
    console.log("Excluir armazem com ID:", id);

    fetch(`http://localhost:8080/armazens/desativar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ situacao: false }),
    })
      .then((response) => {
        console.log("Resposta do servidor:", response);
        if (response.ok) {
          buscarArmazensCadastrados();
        } else {
          toast.error("Erro ao atualizar o status do armazém!");
        }
      })
      .catch((error) => {
        console.error("Erro ao atualizar o status do armazém:", error);
        toast.error("Erro ao atualizar o status do armazém!");
      });
  };

  const buscarArmazensCadastrados = () => {
    fetch("http://localhost:8080/armazens")
      .then((response) => response.json())
      .then((dados) => {
        setArmazensCadastrados(dados);
        console.log("Lista de armazéns atualizada:", dados);
      })
      .catch((error) => {
        console.error("Erro ao buscar os armazéns:", error);
        toast.error("Erro ao buscar os armazéns:");
      });
  };

  useEffect(() => {
    buscarArmazensCadastrados();
  }, []);

  const renderizaAnimal = (animalValor) => {
    const animalNome = {
      1: "Gato",
      2: "Cachorro",
    };
    return animalNome[animalValor] || "Desconhecido"; 
  };

  return (
    <div className="armazemPrincipal">
      <div>
        <h1 className="armazemTitulo">Cadastro de Armazenamento</h1>
      </div>
      <div className="armazemContainer">
        <Input
          tipo="text"
          id="nome"
          etiqueta="Nome"
          valor={nome}
          aoMudar={(e) => setNome(e.target.value)}
        />
        <Input
          tipo="select"
          id="animal"
          etiqueta="Estoque Para:"
          valor={animal}
          aoMudar={(e) => setAnimal(e.target.value)}
        >
          <option value="">Selecione uma opção</option>
          <option value="gato">Gato</option>
          <option value="cachorro">Cachorro</option>
        </Input>

        <Botao aoClicar={cadastrarArmazem} enviar="Cadastrar" cor="#4169E1" width="100px" marginTop="8px"/>
      </div>
      <h2 className="armazemLista">Locais de Armazenamento Cadastrados</h2>
      
      <table className="armazemTabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Animal</th>
            <th>Situação</th>
          </tr>
        </thead>
        <tbody>
          {armazensCadastrados.map((armazem) => (
            <tr key={armazem.id}>
              <td>{armazem.id}</td>
              <td>{armazem.nome}</td>
              <td>{renderizaAnimal(armazem.animal)}</td>
              <td>{armazem.ativo ? "Ativo" : "Desativado"}</td>
              <td>
                <Link
                  className="armazemBotaoEditar"
                  to={`/armazemAtualizar/${armazem.id}`}
                >
                  Editar
                </Link>
              </td>
              <td>
                <Botao
                  aoClicar={() => {
                    console.log("Botão de exclusão clicado");
                    apagarArmazem(armazem.id);
                  }}
                  cor="#F31559"
                  enviar="Remover"
                  width="100px"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </div>
  );
};
export default Armazem;
