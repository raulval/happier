import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import criancasImg from "../assets/Happy.svg";
import perfilImg from "../assets/perfil.png";
import firebase from "../services/firebase";
import "../styles/home.css";
import markerAsilo from "../utils/markerAsilo";
import markerOrfanato from "../utils/markerOrfanato";

export function Home() {
  const mapbox = process.env.REACT_APP_MAPBOX_API_KEY;
  const history = useHistory();
  const dispatch = useDispatch();
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [cidadeUsuario, setCidade] = useState("");
  const [estadoUsuario, setEstado] = useState("");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [orfanatos, setOrfanatos] = useState([]);
  const [asilos, setAsilos] = useState([]);
  const userId = useSelector((state) => state.usuarioId);

  useEffect(() => {
    firebase
      .firestore()
      .collection("Usuario")
      .doc(userId)
      .get()
      .then((doc) => {
        const usuarioNome = doc.data().nome_usuario;
        const cidadeUsuario = doc.data().cidade;
        const estadoUsuario = doc.data().estado;
        const latitude = doc.data().coordenadasUsu[0];
        const longitude = doc.data().coordenadasUsu[1];
        setNomeUsuario(usuarioNome);
        setCidade(cidadeUsuario);
        setEstado(estadoUsuario);
        setLat(latitude);
        setLong(longitude);
      });
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection("Orfanato")
      .onSnapshot((query) => {
        const lista = [];
        query.forEach((doc) => {
          lista.push({ ...doc.data(), id: doc.id });
        });
        setOrfanatos(lista);
      });
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection("Asilo")
      .get()
      .then((querySnapshot) => {
        const lista = [];
        querySnapshot.forEach((doc) => {
          lista.push({ ...doc.data(), id: doc.id });
        });
        setAsilos(lista);
      });
  }, []);

  function sair() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "LOGOUT" });
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div id="page-map">
      {useSelector((state) => state.usuarioLogado) < 1 ? (
        <Redirect to="/" />
      ) : null}

      <aside>
        <header>
          <div id="logoHome">
            <img className="img-flex" src={criancasImg} alt="Logo" />
            <h1 id="logado">Olá {nomeUsuario}!</h1>
          </div>
          <h2>Escolha um orfanato ou um asilo no mapa</h2>
          <p>Muitas pessoas estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>{cidadeUsuario}</strong>
          <span>{estadoUsuario}</span>

          <div className="text-divider mb-5"></div>
          <hr />
          <div className="dropdown">
            <a
              href="#"
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src={perfilImg} alt="" className="rounded-circle me-2" />
              <strong id="user"></strong>
            </a>
            <ul
              className="dropdown-menu dropdown-menu text-small shadow"
              aria-labelledby="dropdownUser1"
            >
              <li>
                <a className="dropdown-item" href="#">
                  Perfil
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="/" onClick={sair}>
                  Sair
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </aside>

      {/* =============== Mapa ================= */}

      {lat && long && (
        <MapContainer
          center={[lat, long]}
          // center={center}
          zoom={13}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${mapbox}`}
          />

          {orfanatos.map((orfanato) => {
            return (
              <Marker
                key={orfanato.id}
                icon={markerOrfanato}
                position={orfanato.coordenadas}
              >
                <Popup
                  closeButton={false}
                  minWidth={240}
                  maxWidth={240}
                  className="mapa-popup"
                >
                  {orfanato.nome}
                  <Link to={`/orfanatos/${orfanato.id}`}>
                    <FiArrowRight size={20} color="#FFF" />
                  </Link>
                </Popup>
              </Marker>
            );
          })}
          {asilos.map((asilo) => {
            return (
              <Marker
                key={asilo.id}
                icon={markerAsilo}
                position={asilo.coordenadas}
              >
                <Popup
                  closeButton={false}
                  minWidth={240}
                  maxWidth={240}
                  className="mapa-popup"
                >
                  {asilo.nome}
                  <Link to={`/asilos/${asilo.id}`}>
                    <FiArrowRight size={20} color="#FFF" />
                  </Link>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      )}

      <Link
        to={{
          pathname: "/entidades/criar",
          state: { userCoords: [lat, long] },
        }}
        className="cadastrarEnt"
      >
        <FiPlus id="iconCadastrarEnt" />
      </Link>
    </div>
  );
}
