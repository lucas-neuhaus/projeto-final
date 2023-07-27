import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Botao from "../../components/Botao";
import Input from "../../components/Input";

const CadastrarProduto = ({ modoEdicao = false }) => {
  const navegar = useNavigate();

  const [form, setForm] = useState({
    id: "",
    tipoProduto: "",
    armazemId:"",
    animal:"",
    quantidade: "",
    categoria: "",
  });

  const enviarCadastroProduto = () => {
    fetch("http://localhost:3000/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form), 
    }).then((response) => {
      if (response.ok) {
        toast.success("Produto cadastrado com sucesso!");
        navegar("/estoque");
      } else {
        toast.warn("Erro ao cadastrar o produto!");
      } 
    });
  };

  const produtoId = useParams().id;

  useEffect(() => {
    if (modoEdicao) {
      fetch(`http://localhost:3000/produtos/${produtoId}`)
        .then((response) => response.json())
        .then((produto) => {
          setForm(produto);
        });
    }
  }, [modoEdicao, produtoId]);

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
        <option value="Ração">Ração</option>
        <option value="Antiparasitário">Antiparasitário</option>
        <option value="Antipulgas">Antipulgas</option>
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
        <option value="Cachorro">Cachorro</option>
        <option value="Gato">Gato</option>
        </Input>

        <Input
        tipo="select"
        id="armazemId"
        etiqueta="Armazém"
        aoMudar={(e) => handleSelecionavelChange("armazemId", e.target.value)}
        >
        <option value="">Selecione uma opção</option>
        <option value="Armazém Cachorro">Armazém Cachorro</option>
        <option value="Armazém Gato">Armazém Gato</option>
        </Input>

        <Input
        tipo="select"
        id="categoria"
        etiqueta="Categoria"
        aoMudar={(e) => handleSelecionavelChange("categoria", e.target.value)}
        >
        <option value="">Selecione uma opção</option>
        <option value="Adulto">Adulto</option>
        <option value="Filhote">Filhote</option>
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