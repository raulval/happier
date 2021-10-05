import React, { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import firebase from "../services/firebase";
import "../styles/criarEntidade.css";
import markerOrfanato from "../utils/markerOrfanato";

export function CriarEntidade() {
  const history = useHistory();
  const location = useLocation();
  const userId = useSelector((state) => state.usuarioId);
  const mapbox = process.env.REACT_APP_MAPBOX_API_KEY;

  const [posicao, setPosicao] = useState(location.state.userCoords);
  const [userLat, setUserLat] = useState();
  const [userLong, setUserLong] = useState();
  const markerRef = useRef(null);
  const [nome, setNome] = useState("");
  const [sobre, setSobre] = useState("");
  const [numero, setNumero] = useState("");
  const [instrucoes, setInstrucoes] = useState("");
  const [horario, setHorario] = useState("");
  const [abreFds, setAbreFds] = useState(true);
  const [entidade, setEntidade] = useState("");

  useEffect(() => {
    firebase
      .firestore()
      .collection("Usuario")
      .doc(userId)
      .get()
      .then((doc) => {
        const latitude = doc.data().coordenadasUsu[0];
        const longitude = doc.data().coordenadasUsu[1];
        setUserLat(latitude);
        setUserLong(longitude);
      });
  }, []);

  const definirLocal = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosicao([marker.getLatLng().lat, marker.getLatLng().lng]);
        }
      },
    }),
    []
  );

  function cadastrarEntidade() {
    // event.preventDefault();

    if (entidade === "Orfanato") {
      firebase
        .firestore()
        .collection("Orfanato")
        .add({
          nome: nome,
          sobre: sobre,
          instrucoes: instrucoes,
          horario: horario,
          abreFds: abreFds,
          coordenadas: posicao,
          numero: numero,
        })
        .catch((error) => {
          alert("Erro ao cadastrar entidade:" + error);
        });
      history.push("/entidades/sucesso");
    } else if (entidade === "Asilo") {
      firebase
        .firestore()
        .collection("Asilo")
        .add({
          nome: nome,
          sobre: sobre,
          instrucoes: instrucoes,
          horario: horario,
          abreFds: abreFds,
          coordenadas: posicao,
          numero: numero,
        })
        .catch((error) => {
          alert("Erro ao cadastrar entidade:" + error);
        });
      history.push("/entidades/sucesso");
    }
  }

  return (
    <div id="page-criar-entidade">
      <Sidebar />

      <main>
        <form onSubmit={cadastrarEntidade} className="criar-entidade-form">
          <fieldset>
            <legend>Dados</legend>

            <div className="input-block">
              <label>Selecione o local no mapa</label>
            </div>
            {userLat && userLong && (
              <MapContainer
                center={[userLat, userLong]}
                style={{ width: "100%", height: 280 }}
                zoom={14}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${mapbox}`}
                />

                <Marker
                  draggable={true}
                  eventHandlers={definirLocal}
                  ref={markerRef}
                  icon={markerOrfanato}
                  position={posicao}
                />
              </MapContainer>
            )}

            <div className="input-block">
              <label htmlFor="entidade">Tipo de Entidade</label>
              <select
                className="form-select"
                id="select-estado"
                value={entidade}
                defaultValue={"inicial"}
                onChange={(event) => {
                  setEntidade(event.target.value);
                }}
              >
                <option value="inicial">Escolha o tipo</option>
                <option value="Orfanato">Orfanato</option>
                <option value="Asilo">Asilo</option>
              </select>
            </div>

            <div className="input-block">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="sobre">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="sobre"
                maxLength={300}
                value={sobre}
                onChange={(event) => setSobre(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="numero">Whatsapp</label>
              <input
                id="numero"
                value={numero}
                onChange={(event) => setNumero(event.target.value)}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instrucoes">Instruções</label>
              <textarea
                id="instrucoes"
                value={instrucoes}
                onChange={(event) => setInstrucoes(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="horario">Horário de funcionamento</label>
              <input
                id="horario"
                value={horario}
                onChange={(event) => setHorario(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="abreFds">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={abreFds ? "active" : ""}
                  onClick={() => setAbreFds(true)}
                >
                  Sim
                </button>

                <button
                  type="button"
                  className={!abreFds ? "active" : ""}
                  onClick={() => setAbreFds(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
