import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import firebase from "../services/firebase";
import "../styles/orfanatos.css";
import markerOrfanato from "../utils/markerOrfanato";

export function Orfanatos() {
  const mapbox = process.env.REACT_APP_MAPBOX_API_KEY;
  const params = useParams();
  const [orfanato, setOrfanato] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("Orfanato")
      .doc(params.id)
      .get()
      .then((doc) => {
        setOrfanato(doc.data());
      });
  }, []);

  console.log();

  if (!orfanato) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="page-orfanato">
      <Sidebar />

      <main>
        <div className="orfanato-detalhes">
          <div className="orfanato-detalhes-content">
            <h1>{orfanato.nome}</h1>
            <p>{orfanato.sobre}</p>

            <div className="map-container">
              {orfanato.coordenadas && (
                <MapContainer
                  center={orfanato.coordenadas}
                  zoom={14}
                  style={{ width: "100%", height: 280 }}
                  dragging={false}
                  touchZoom={false}
                  zoomControl={true}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                >
                  <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${mapbox}`}
                  />
                  <Marker
                    interactive={false}
                    icon={markerOrfanato}
                    position={orfanato.coordenadas}
                  />
                </MapContainer>
              )}

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orfanato.coordenadas}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orfanato.instrucoes}</p>

            <div className="abre-detalhes">
              <div className="hora">
                <FiClock size={32} color="#15B6D6" />
                {orfanato.horario}
              </div>
              {orfanato.abreFds ? (
                <div className="abre-fds">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="abre-fds nao-abre">
                  <FiInfo size={32} color="#FF669D" />
                  Não atendemos <br />
                  fim de semana
                </div>
              )}
            </div>

            <button type="button" className="contato-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
