import "./botao.css";

const Botao = (props) => {
  return (
    <button
      onClick={props.aoClicar}
      className="botao"
      type={props.tipo}
      style={{
        backgroundColor: props.cor,
        width: props.width,
        marginLeft: marginLeft,
        marginRight: marginRight,
      }}
    >
      {props.enviar}
    </button>
  );
};

export default Botao;