import React from "react";
import { Link } from "react-router-dom";
import "../styles/sucesso.css";

export function Sucesso() {
  return (
    <div id="page-sucesso">
      <div className="sucesso-wrapper">
        <main>
          <h1>Ebaaa!</h1>

          <p>
            O cadastro deu certo e foi enviado ao administrador para ser
            aprovado. Agora é só esperar :)
          </p>

          <Link to="/home" className="sucesso-entrar-app">
            Voltar para o mapa
          </Link>
        </main>
      </div>
    </div>
  );
}
