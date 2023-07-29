import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Botao from "../../components/Botao";
import Input from "../../components/Input";

const ArmazemAtualizar = () => {
  const navegar = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    nome: "",
    animal: null,
  });

  useEffect(() => {
    console.log("Buscando detalhes do armazém com ID:", id);

    fetch(`http://localhost:8080/armazens`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao obter os detalhes do armazém");
        }
        return response.json();
      })
      .then((armazem) => {
        console.log("Detalhes do armazém obtidos:", armazem);
        setForm({
          nome: armazem.nome,
          animal: armazem.animal,
        });
      })
      .catch((error) => {
        console.error("Erro na requisição GET:", error);
      });
  }, [id]);

  const atualizarArmazem = () => {
    console.log("Enviando requisição PUT para atualizar o armazém:", form);

    const animalId = parseInt(form.animal, 10);

    fetch(`http://localhost:8080/armazens/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: form.nome,
        animal: animalId,
      }),
    })
      .then((response) => {
        console.log("Resposta do servidor:", response);
        if (response.ok) {
          toast.success("Armazém atualizado com sucesso!");
          navegar("/armazem");
        } else {
          toast.error("Erro ao atualizar o armazém!");
        }
      })
      .catch((error) => {
        console.error("Erro na requisição PUT:", error);
      });
  };

  const handleInputChange = (id, value) => {
    setForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <>
      <section className="atualizarArmazemContainer">
        <h1 className="atualizarArmazemTitulo">Atualizar Armazém</h1>
        <div className="atualizarArmazemConteudo">
          <Input
            tipo="text"
            id="nome"
            etiqueta="Nome"
            valor={form.nome || ""}
            aoMudar={(e) => handleInputChange("nome", e.target.value)}
          />

          <Input
            tipo="select"
            id="animal"
            etiqueta="Estoque Para:"
            valor={form.animal || ""}
            aoMudar={(e) => handleInputChange("animal", e.target.value)}
          >
            <option value="">Selecione uma opção</option>
            <option value="gato">Gato</option>
            <option value="cachorro">Cachorro</option>
          </Input>

          <Botao aoClicar={atualizarArmazem} enviar="Atualizar Armazém" />
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

export default ArmazemAtualizar;

