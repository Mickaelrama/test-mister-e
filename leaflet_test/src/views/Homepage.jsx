import React, { useCallback, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
} from "react-leaflet";
import { Icon } from "leaflet";
import SelectInput from "../components/select-input/SelectInput";
import marker from "../assets/images/marker.png";
import "leaflet/dist/leaflet.css";
import "../assets/styles/homepage.scss";

import landmarks from "../json/data.json";

const myIcon = new Icon({
  iconUrl: marker,
  iconSize: [40, 40],
  shadowSize: [50, 64],
  iconAnchor: [22, 40],
  shadowAnchor: [4, 62],
});

const CenterView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const Homepage = () => {
  const [monument, setMonument] = useState(landmarks[0]);

  const handleChange = useCallback((value) => {
    setMonument(value);
  }, []);

  return (
    <div className="homepage">
      <h1>Les monuments américains</h1>
      <div className="map-container">
        <div className="select-input-container">
          <SelectInput
            label="Les monuments américains"
            options={landmarks}
            keyLabelName="landmark_name"
            keyName="id"
            onChange={handleChange}
          />
        </div>
        <MapContainer zoomControl={false}>
          <CenterView
            center={[monument.location.latitude, monument.location.longitude]}
            zoom={13}
          />
          <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <ZoomControl position="bottomright" />
          <Marker
            position={[monument.location.latitude, monument.location.longitude]}
            icon={myIcon}
          >
            <Popup>
              <h2>{monument.landmark_name}</h2>
              <h3>City: {monument.city}</h3>
              <p>{monument.fact}</p>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Homepage;
