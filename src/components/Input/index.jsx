import "./input.css";

const Input = (props) => {
  if (props.tipo === "select") {
    return (
      <div className="inputConteiner">
        <label className="inputEtiqueta" htmlFor={props.id}>
          {props.etiqueta}
        </label>
        <div className="inputId">
          <select
            id={props.id}
            value={props.valor || ""}
            onChange={props.aoMudar}
          >
            {props.children}
          </select>
        </div>
      </div>
    );
  } else {
    return (
      <div className="inputConteiner">
        <label className="inputEtiqueta" htmlFor={props.id}>
          {props.etiqueta}
        </label>
        <div className="inputId">
          <input
            id={props.id}
            type={props.tipo}
            onChange={props.aoMudar}
            value={props.valor || ""}
          />
        </div>
      </div>
    );
  }
};

export default Input;