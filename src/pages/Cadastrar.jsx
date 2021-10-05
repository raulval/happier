import axios from "axios";
import { useState } from "react";
import { FaLock, FaRegEnvelope } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import logoImg from "../assets/Happy.svg";
import { Button } from "../components/Button";
import firebase from "../services/firebase";
import "../styles/cadastrar.css";

export function Cadastrar() {
  const history = useHistory();
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");
  const [coordenadas, setCoordenadas] = useState([]);
  const [erroCadastro, setErroCadastro] = useState(false);

  const dispatch = useDispatch();

  function pegarCoordenadas() {
    const address = `${cidade}, ${estado}`;
    let api =
      "https://api.geoapify.com/v1/geocode/search?text=" +
      address +
      "&apiKey=5624d6a835bd40a087d2ac55ba02a41a";
    axios
      .get(api)
      .then((res) => {
        setCoordenadas([
          res.data.features[0].geometry.coordinates[1],
          res.data.features[0].geometry.coordinates[0],
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function cadastrarUsuario() {
    if (
      nome === "" ||
      sobrenome === "" ||
      email === "" ||
      senha === "" ||
      cidade === "" ||
      estado === "" ||
      cep === ""
    ) {
      alert("Preencha todos os campos");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, senha)
        .then((userCredential) => {
          let user = userCredential.user;
          firebase
            .firestore()
            .collection("Usuario")
            .doc(user.uid)
            .set({
              nome_usuario: nome,
              sobrenome: sobrenome,
              email: email,
              senha: senha,
              cidade: cidade,
              estado: estado,
              cep: cep,
              coordenadasUsu: coordenadas,
            })
            .catch((error) => {
              alert(error);
            });
          alert("Cadastro feito com sucesso!");
          history.push("/");
        })
        .catch((error) => {
          alert(error);
          setErroCadastro(true);
          let errorCode = error.code;
          let errorMessage = error.message;
        });
    }
  }

  return (
    <div id="page-landing">
      <div className="logo d-flex">
        <img src={logoImg} alt="Happier Logo" />
        <h1>Happier</h1>
      </div>

      <div className="wrapper">
        <h1>Cadastre-se</h1>

        <div id="msgError"></div>

        <form className="row g-3">
          <div className="col">
            <label id="label-nome" className="form-label">
              Nome
            </label>
            <input
              type="text"
              className="form-control"
              id="input-nome"
              onChange={(event) => setNome(event.target.value)}
              required
            />
          </div>

          <div className="col">
            <label id="label-sobrenome" className="form-label">
              Sobrenome
            </label>
            <input
              type="text"
              className="form-control"
              id="input-sobrenome"
              onChange={(event) => setSobrenome(event.target.value)}
              required
            />
          </div>

          <div className="col">
            <label id="label-email" className="form-label">
              Email
            </label>
            <div className="input-form">
              <FaRegEnvelope className="iconesC" />
              <input
                type="email"
                className="form-control"
                id="input-email"
                aria-describedby="inputGroupPrepend"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="col">
            <label id="label-senha" className="form-label">
              Senha
            </label>
            <div className="input-form">
              <FaLock className="iconesC" />
              <input
                type="password"
                className="form-control"
                id="input-senha"
                aria-describedby="inputGroupPrepend"
                onChange={(event) => setSenha(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="col">
            <label id="label-cidade" className="form-label">
              Cidade
            </label>
            <input
              type="text"
              className="form-control"
              id="input-cidade"
              onChange={(event) => setCidade(event.target.value)}
              required
            />
          </div>

          <div className="col">
            <label id="label-estado" className="form-label">
              Estado
            </label>
            <select
              className="form-select"
              id="select-estado"
              defaultValue={"inicial"}
              onChange={(event) => {
                setEstado(event.target.value);
                pegarCoordenadas();
              }}
              required
            >
              <option value="inicial">Escolha um estado</option>
              <option value="Acre">Acre</option>
              <option value="Alagoas">Alagoas</option>
              <option value="Amapá">Amapá</option>
              <option value="Amazonas">Amazonas</option>
              <option value="Bahia">Bahia</option>
              <option value="Ceará">Ceará</option>
              <option value="Espírito Santo">Espírito Santo</option>
              <option value="Goiás">Goiás</option>
              <option value="Maranhão">Maranhão</option>
              <option value="Mato Grosso">Mato Grosso</option>
              <option value="Mato Grosso do Sul">Mato Grosso do Sul</option>
              <option value="Minas Gerais">Minas Gerais</option>
              <option value="Pará">Pará</option>
              <option value="Paraíba">Paraíba</option>
              <option value="Paraná">Paraná</option>
              <option value="Pernambuco">Pernambuco</option>
              <option value="Piauí">Piauí</option>
              <option value="Rio de Janeiro">Rio de Janeiro</option>
              <option value="Rio Grande do Norte">Rio Grande do Norte</option>
              <option value="Rio Grande do Sul">Rio Grande do Sul</option>
              <option value="Rondônia">Rondônia</option>
              <option value="Roraima">Roraima</option>
              <option value="Santa Catarina">Santa Catarina</option>
              <option value="São Paulo">São Paulo</option>
              <option value="Sergipe">Sergipe</option>
              <option value="Tocantins">Tocantins</option>
              <option value="Distrito Federal">Distrito Federal</option>
            </select>
          </div>

          <div className="col">
            <label id="label-cep" className="form-label">
              CEP
            </label>
            <input
              type="text"
              className="form-control"
              id="input-cep"
              placeholder="00000-000"
              onChange={(event) => setCep(event.target.value)}
              required
            />
          </div>

          {erroCadastro === true ? (
            <div id="msgError">
              <FiAlertCircle color="#ff0000" />
              <p id="txtError">Email inválido</p>
            </div>
          ) : (
            <div />
          )}

          <div className="cad-button">
            <Button type="button" onClick={cadastrarUsuario}>
              Cadastrar
            </Button>
          </div>

          <div className="cadastro-login">
            <label className="form-label">Já possui uma conta?</label>
            <Link to="/" className="cadastrar">
              Faça o Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
