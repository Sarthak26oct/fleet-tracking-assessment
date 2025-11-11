import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { styled } from "@mui/material/styles";
import ReactDOMServer from "react-dom/server";
import { getTripColor } from "../utils/utils";

const StyledMapContainer = styled(MapContainer)({
  height: "60vh",
  width: "100%",
});

const createTruckIcon = (color) =>
  L.divIcon({
    html: ReactDOMServer.renderToString(
      <LocalShippingIcon style={{ color, fontSize: 30 }} />
    ),
    iconAnchor: [15, 15],
    className: "",
  });

const MapView = ({ trips }) => {
  return (
    <StyledMapContainer center={[37.77, -122.42]} zoom={5}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
      {Object.entries(trips).map(([id, trip]) => (
        <React.Fragment key={id}>
          <Polyline positions={trip.route} color={getTripColor(trip.status)} />
          <Marker
            position={trip.route[trip.route.length - 1]}
            icon={createTruckIcon(getTripColor(trip.status))}
          >
            <Popup>
              <b>{id}</b> <br />
              Status: {trip.status} <br />
              Speed: {trip.lastEvent?.movement?.speed_kmh ?? "N/A"} km/h
            </Popup>
          </Marker>
        </React.Fragment>
      ))}
    </StyledMapContainer>
  );
};

export default MapView;
