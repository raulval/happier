import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import logo from "../assets/Happy.svg";
import "../styles/sidebar.css";

export default function Sidebar() {
  const history = useHistory();
  function voltar(){
    history.push('/home');
  }
  return (
    <aside className="app-sidebar">
      <img src={logo} alt="Logo" />

      <footer>
        <button type="button" onClick={voltar}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}
