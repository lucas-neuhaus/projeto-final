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
        marginLeft: props.marginLeft,
        marginRight: props.marginRight,
        marginTop: props.marginTop



export default Botao;