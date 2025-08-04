import React, { useRef, useState } from "react";

import * as GoogleMapsAPI from "@react-google-maps/api";

const GoogleMap = GoogleMapsAPI.GoogleMap as unknown as React.FC<any>;
const Marker = GoogleMapsAPI.Marker as unknown as React.FC<any>;
const Autocomplete = GoogleMapsAPI.Autocomplete as unknown as React.FC<any>;
const InfoWindow = GoogleMapsAPI.InfoWindow as unknown as React.FC<any>;
const useJsApiLoader = GoogleMapsAPI.useJsApiLoader;


const containerStyle = {
    width: "100%",
    height: "100vh",
};

const defaultCenter = {
    lat: 41.5868,
    lng: -93.625,
};

const MapPage: React.FC = () => {
    const [position, setPosition] = useState(defaultCenter);
    const [placeName, setPlaceName] = useState("Des Moines");
    const [showInfo, setShowInfo] = useState(true);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: "YOUR_API_KEY_HERE",
        libraries: ["places"],
    });

    const handlePlaceChanged = () => {
        const place = autocompleteRef.current?.getPlace();
        if (place?.geometry?.location) {
            setPosition({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            });
            setPlaceName(place.formatted_address || place.name || "Unknown");
            setShowInfo(true);
        }
    };

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={14}>
            <Autocomplete
                onLoad={(autocomplete: google.maps.places.Autocomplete) => {
                    autocompleteRef.current = autocomplete;
                }}
                onPlaceChanged={handlePlaceChanged}
            >
                <input
                    type="text"
                    placeholder="Search location..."
                    style={{
                        width: "80%",
                        height: "40px",
                        padding: "10px",
                        fontSize: "16px",
                        position: "absolute",
                        top: "10px",
                        left: "10%",
                        zIndex: 100,
                    }}
                />
            </Autocomplete>

            <Marker position={position} onClick={() => setShowInfo(true)} />

            {showInfo && (
                <InfoWindow position={position} onCloseClick={() => setShowInfo(false)}>
                    <div>
                        <strong>{placeName}</strong>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
};

export default MapPage;


