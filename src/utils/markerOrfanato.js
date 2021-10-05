import Leaflet from "leaflet";
import orfanatoMarker from "../assets/Happy.svg";

const markerOrfanato = Leaflet.icon({
  iconUrl: orfanatoMarker,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

export default markerOrfanato;
