import React, { useState } from "react";
import { FaLock, FaRegEnvelope } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import logoImg from "../assets/Happy.svg";
import criancasImg from "../assets/Kids.svg";
import { Button } from "../components/Button";
import firebase from "../services/firebase";
import "../styles/login.css";

export function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroLogin, setErroLogin] = useState(false);

  const dispatch = useDispatch();

  function fazerLogin() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, senha)
      .then((userCredential) => {
        let user = userCredential.user;
        dispatch({ type: "LOGIN", usuarioId: user.uid });
      })
      .catch((error) => {
        alert(error);
        setErroLogin(true);
        let errorCode = error.code;
        let errorMessage = error.message;
      });
  }

  return (
    <div id="page-landing">
      {useSelector((state) => state.usuarioLogado) > 0 ? (
        <Redirect to="/home" />
      ) : null}

      <div className="img-logo">
        <img src={logoImg} alt="Happier Logo" />
      </div>

      <div className="texts-container">
        <h1>Happier</h1>
        <h2>Leve felicidade para o mundo</h2>
        <h3>Visite orfanatos ou asilos e mude o dia de muitas pessoas.</h3>
      </div>

      <div className="index-image">
        <img src={criancasImg} alt="Crianças e senhora brincando juntos" />
      </div>

      <div className="container">
        {erroLogin === true ? (
          <div id="msgError">
            <FiAlertCircle color="#ff0000" />
            <p id="txtError">Email ou senha inválidos</p>
          </div>
        ) : (
          <div />
        )}
        <form className="form-container">
          <div className="msgError"></div>
          <section className="input-area">
            <div className="label">
              <label>Email</label>
            </div>
            <div className="input-form">
              <FaRegEnvelope className="icones" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="label">
              <label className="label-senha">Senha</label>
            </div>
            <div className="input-form">
              <FaLock className="icones" />
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="Senha"
                onChange={(event) => setSenha(event.target.value)}
                required
              />
            </div>

            <div className="form-check">
              <label className="form-check-label">
                <input type="checkbox" value="remember-me" />
                Lembrar de mim
              </label>
            </div>

            <div className="login-reset-senha">
              <a href="#">Esqueceu a senha?</a>
            </div>
          </section>

          <div className="login-button">
            <Button type="button" id="submit-button" onClick={fazerLogin}>
              Entrar
            </Button>
          </div>
          <div className="login-cadastrar">
            <span>Não possui uma conta?</span>
            <Link to="/cadastro" className="cadastrar">
              Cadastre-se
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
