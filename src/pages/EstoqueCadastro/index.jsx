import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Botao from "../../components/Botao";
import Input from "../../components/Input";

const CadastrarProduto = ({ modoEdicao = false }) => {

  const [armazens, setArmazens] = useState([]);
  const navegar = useNavigate();

  const animalLong = {
    cachorro: 1,
    gato: 2,
  };

  const tipoProdutoLong = {
    racao: 1,
    antiparasitario: 2,
    antipulgas: 3,
  };
  
  const categoriaLong = {
    adulto: 1,
    filhote: 2,
  }

  const [form, setForm] = useState({
    id: 0,
    tipoProduto: tipoProdutoLong,
    animal: animalLong ,
    quantidade: 0,                 
    categoria: categoriaLong,
  });

  const enviarCadastroProduto = () => {
    console.log(" Informações do Cadastro de Produto:", form); 
    fetch("http://localhost:8080/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Produto cadastrado com sucesso!");
          navegar("/estoque");
        } else {
          toast.error("Erro ao cadastrar o produto!");
        }
      })
      .catch((error) => {
        console.error("Error ao cadastrar o produto:", error); 
        toast.error("Erro ao cadastrar o produto!");
      });
  };

  const produtoId = useParams().id;

  useEffect(() => {
    if (modoEdicao) {
      fetch(`http://localhost:8080/produtos/${produtoId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((produto) => {
          setForm(produto);
        })
        .catch((error) => {
          console.error("Error fetching produto:", error);
          toast.error("Erro ao carregar o produto!");
        });
    }
  }, [modoEdicao, produtoId]);

  const fetchArmazens = () => {
    fetch("http://localhost:8080/armazens")
      .then((response) => response.json())
      .then((dados) => {
        setArmazens(dados);
      })
      .catch((error) => {
        console.error("Erro ao buscar os armazéns:", error);
        toast.error("Erro ao buscar os armazéns:");
      });
  };

  useEffect(() => {
    fetchArmazens();
  }, []);

  const handleSelecionavelChange = (id, valor) => {
    setForm((prevState) => ({
      ...prevState,
      [id]: valor,
    }));
  };
  
return (
  <>
      <section className="listaAtualizar">
      <h1 className="cadastrarProdutoTitulo">
        {}
        {modoEdicao ? "Atualizar" : "Cadastrar"} Produto
      </h1>
      <div className="cadastrarProdutoConteudo">
        
        <Input
        tipo="select"
        id="tipoProduto"
        etiqueta="Tipo do Produto"
        aoMudar={(e) => handleSelecionavelChange("tipoProduto", e.target.value)}
        >
        <option value="">Selecione uma opção</option>
        <option value="1">Ração</option>
        <option value="2">Antiparasitário</option>
        <option value="3">Antipulgas</option>
        </Input> 
        
        <Input
        tipo="number"
        id="quantidade"
        etiqueta="Quantidade"
        aoMudar={(e) => handleSelecionavelChange("quantidade", e.target.value)}
        />

        <Input
        tipo="select"
        id="animal"
        etiqueta="Animal"
        aoMudar={(e) => handleSelecionavelChange("animal", e.target.value)}
        >
        <option value="">Selecione uma opção</option>
        <option value="1">Cachorro</option>
        <option value="2">Gato</option>
        </Input>

        <Input
          tipo="select"
          id="armazemId"
          etiqueta="Armazém"
          aoMudar={(e) => handleSelecionavelChange("armazemId", e.target.value)}
        >
          <option value="">Selecione uma opção</option>
          {armazens.map((armazem) => (
            <option key={armazem.id} value={armazem.id}>
              {armazem.nome}
            </option>
          ))}
        </Input>

        <Input
        tipo="select"
        id="categoria"
        etiqueta="Categoria"
        aoMudar={(e) => handleSelecionavelChange("categoria", e.target.value)}
        >
        <option value="">Selecione uma opção</option>
        <option value="1">Adulto</option>
        <option value="2">Filhote</option>
        </Input>

        {}
        {
          <Botao
            aoClicar={enviarCadastroProduto}
            enviar="Cadastrar Produto"
          />
        }
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

export default CadastrarProduto;