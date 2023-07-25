import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import Botao from '../../components/Botao';

import "./estoqueLista.css"; 


const ListaProdutos = () => {
  const [produtos, setProdutos] = useState([]);

  const navegar = useNavigate();

  const buscarProdutos = () => {
    fetch("http://localhost:3000/produtos")
      .then((response) => response.json())
      .then((dados) => setProdutos(dados));
  };

  const apagarProduto = (id) => {
    if (window.confirm("Deseja mesmo apagar este produto?")) {
      fetch(`http://localhost:3000/produtos/${id}`, {
        method: "DELETE",
      }).then(() => {
        buscarProdutos();
      });
    }
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <>
      <section className="listaProdutosContainer">
        <div className="listaProdutosConteudo">
          <h1 className="tituloEstoque">Estoque</h1>
        </div>
        <div className="conteudoPrincipal">
          <h1 className="listaProdutosSubtitulo">Lista de Produtos</h1>
          <table className="listaProdutosTabela">
            <thead className="listaProdutosTabelaHead">
              <tr className="listaProdutosTabelaRow">
                <th className="listaProdutosTabelaHeadCell">ID</th>
                <th className="listaProdutosTabelaHeadCell">Armazenado</th>
                <th className="listaProdutosTabelaHeadCell">Produto</th>
                <th className="listaProdutosTabelaHeadCell">Quantidade</th>
                <th className="listaProdutosTabelaHeadCell">Categoria</th>
              </tr>
            </thead>
            <tbody className="listaProdutosTabelaBody">
              {produtos.map((produto) => (
                <tr key={produto.id} className="listaProdutosTabelaRow">
                  <td className="listaProdutosTabelaCell">{produto.id}</td>
                  <td className="listaProdutosTabelaCell">{produto.armazenado}</td>
                  <td className="listaProdutosTabelaCell">{produto.produto}</td>
                  <td className="listaProdutosTabelaCell">{produto.quantidade}</td>
                  <td className="listaProdutosTabelaCell">{produto.categoria}</td>
                  <td className="listaProdutosTabelaCell">
                    <Link
                      className="listaProdutosBotaoEditar"
                      to={`editar/${produto.id}`}
                    >
                      Editar
                    </Link>
                    <Botao
                      aoClicar={() => apagarProduto(produto.id)}
                      cor="#F31559"
                      enviar="Excluir"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Botao className="listaProdutosBotaoCadastrarProduto"
        aoClicar={() => navegar("/EstoqueCadastro")}
        cor="#470D21"
        enviar="Cadastrar Produto"
        />
      </section>
    </>
  );
};
  
  export default ListaProdutos;
  

