import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultPosition = {
    lat: 41.5868,
    lng: -93.625,
};

const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const ClickHandler = ({ setPosition }: { setPosition: (pos: any) => void }) => {
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });
    return null;
};

const MapPage: React.FC = () => {
    const [position, setPosition] = useState(defaultPosition);

    return (
        <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickHandler setPosition={setPosition} />
            <Marker position={position} icon={markerIcon}>
                <Popup>
                    You clicked at:<br />
                    Latitude: {position.lat.toFixed(4)}<br />
                    Longitude: {position.lng.toFixed(4)}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapPage;




