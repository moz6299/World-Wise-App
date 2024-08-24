import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../src/contexts/CitiesContext";
import Button from "./Button";
import { useGeolocation } from "../src/Hooks/useGeolocation";

const Map = () => {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const {
    isLoading,
    position: positionGeolocation,
    getPosition,
  } = useGeolocation();

  const [searchQuery, setSearchQuery] = useSearchParams();
  const mapLat = searchQuery.get("lat");
  const mapLng = searchQuery.get("lng");

  useEffect(() => {
    if ((mapLat, mapLng)) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (positionGeolocation) setMapPosition([positionGeolocation.lat, positionGeolocation.lng]);
  }, [positionGeolocation]);

  return (
    <div className={styles.mapContainer}>
        { !positionGeolocation && <Button type='position' onClick={getPosition}> {isLoading? "Loading..." :"Get your Position"}</Button>}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <DetectClick />

        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );
};

const ChangeCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};

const DetectClick = () => {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
};

export default Map;
