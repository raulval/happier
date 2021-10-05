import Leaflet from "leaflet";
import asiloMarker from "../assets/Asilo.svg";

const markerAsilo = Leaflet.icon({
  iconUrl: asiloMarker,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

export default markerAsilo;
