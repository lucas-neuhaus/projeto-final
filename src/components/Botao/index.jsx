import "./botao.css";

const Botao = (props) => {
  return (
    <button
      onClick={props.aoClicar}
      className="botao"
      type={props.tipo}
      style={{
        backgroundColor: props.cor,
      }}
    >
      {props.enviar}
    </button>
  );
};

export default Botao;