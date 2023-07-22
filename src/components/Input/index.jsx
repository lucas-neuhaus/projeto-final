import "./input.css";

const Input = (props) => {
  return (
    <div className="inputConteiner">
      <label className="inputEtiqueta" htmlFor={props.id}>
        {props.etiqueta}
      </label>
      <div className="inputId">
        <input id={props.id} type={props.tipo} onChange={props.aoMudar} />
      </div>
    </div>
  );
};

export default Input;