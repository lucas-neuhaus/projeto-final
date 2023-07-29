import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Botao from "../../components/Botao";
import Input from "../../components/Input";

const EstoqueAtualizar = () => {
  const navegar = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    id: null,
    tipoProduto: null,
    armazemId: null,
    animal: null,
    quantidade: 0,
    categoria: null,
  });

  const atualizarProduto = () => {
    fetch(`http://localhost:8080/produtos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form), 
    }).then((response) => {
      if (response.ok) {
        toast.success("Produto atualizado com sucesso!");
        navegar("/estoque");
      } else {
        toast.error("Erro ao atualizar o produto!");
      } 
    });
  };

  useEffect(() => {
    fetch(`http://localhost:8080/produtos/${id}`)
      .then((response) => response.json())
      .then((produto) => {
        setForm(produto);
      });
  }, [id]);

  const handleSelecionavelChange = (id, valor) => {
    setForm((prevState) => ({
      ...prevState,
      [id]: valor,
    }));
  };
  
  return (
    <>
      <section className="listaAtualizar">
        <h1 className="atualizarProdutoTitulo">Atualizar Produto</h1>
        <div className="atualizarProdutoConteudo">
          
          <Input
            tipo="select"
            id="tipoProduto"
            etiqueta="Tipo do Produto"
            valor={form.tipoProduto || ""}
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
            valor={form.quantidade || ""}
            aoMudar={(e) => handleSelecionavelChange("quantidade", e.target.value)}
          />

          <Botao aoClicar={atualizarProduto} enviar="Atualizar Produto" />
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

export default EstoqueAtualizar;