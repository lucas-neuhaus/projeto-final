import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Botao from "../../components/Botao";
import Input from "../../components/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./armazem.css";

const Armazem = () => {
  const [nome, setNome] = useState("");
  const [animal, setAnimal] = useState("");
  const [armazensCadastrados, setArmazensCadastrados] = useState([]);

  const cadastrarArmazem = () => {
    const novoArmazem = {
      nome: nome,
      animal: animal,
      situacao: true, // Defina o valor de acordo com a lógica da sua aplicação
    };

    fetch("http://localhost:3000/armazens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoArmazem),
    })
    .then((response) => {
      if (response.ok) {
        // Se a resposta for bem-sucedida, buscar novamente os armazéns cadastrados
        buscarArmazensCadastrados();
        // Limpar os campos após cadastrar
        setNome("");
        setAnimal("");
      } else {
        toast.error("Erro ao cadastrar o armazém!");
      }
    })
    .catch((error) => {
      toast.error("Erro ao cadastrar o armazém!");
    });
  };

  const apagarArmazem = (id) => {
      fetch(`http://localhost:3000/armazens/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ situacao: false }), 
    })
      .then((response) => {
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
    
    fetch("http://localhost:3000/armazens")
      .then((response) => response.json())
      .then((dados) => setArmazensCadastrados(dados))
      .catch((error) => {
        console.error("Erro ao buscar os armazéns:", error);
      });
  };

  useEffect(() => {
    buscarArmazensCadastrados();
  }, []);


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

  <Botao aoClicar={cadastrarArmazem} enviar= "Cadastrar" cor="#4169E1"/>
     </div>
      <h2 className="armazemLista">Locais de Armazenamento Cadastrados</h2>

      <table className="armazemTabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Animal</th>
            <th>Situação</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
  {armazensCadastrados.map((armazem) => (
    <tr key={armazem.id}>
      <td>{armazem.id}</td>
      <td>{armazem.nome}</td>
      <td>{armazem.animal}</td>
      <td>{armazem.situacao ? "Ativo" : "Desativado"}</td>
      <td>
        {/* Adicione o link para a página de edição do armazém */}
        <Link className="armazemBotaoEditar" to={`editar/${armazem.id}`}>Editar</Link>
      </td>
      <td>
        {/* Botão para remover o armazém */}
        <Botao
          aoClicar={() => apagarArmazem(armazem.id)}
          cor="#F31559"
          enviar="Remover"
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