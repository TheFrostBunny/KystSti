import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import { reverseGeocode } from "@/utils/geolocation";

interface MapPreviewProps {
  lat: number;
  lng: number;
  zoom: number;
  onSelectPosition?: (lat: number, lng: number) => void;
  showAddress?: boolean;
}

function ClickHandler({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function ZoomControl() {
  const map = useMap();
  return (
    <div style={{
      position: "absolute",
      bottom: "10px",
      right: "10px",
      zIndex: 20,
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    }}>
      <button
        onClick={() => map.zoomIn()}
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          background: "white",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        +
      </button>
      <button
        onClick={() => map.zoomOut()}
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          background: "white",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        −
      </button>
    </div>
  );
}

export function MapPreview({ lat, lng, zoom, onSelectPosition, showAddress = false }: MapPreviewProps) {
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showAddress) {
      setLoading(true);
      reverseGeocode(lat, lng).then((result) => {
        setAddress(result.address);
        setLoading(false);
      });
    }
  }, [lat, lng, showAddress]);

  return (
    <div style={{ height: 240, width: "100%", borderRadius: 12, overflow: "hidden", marginBottom: 16, position: "relative" }}>
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
        dragging={!!onSelectPosition}
        doubleClickZoom={false}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {onSelectPosition && <ClickHandler onSelect={onSelectPosition} />}
        <ZoomControl />
        <Marker position={[lat, lng]}>
          <Popup>{address || "Stopp"}</Popup>
        </Marker>
      </MapContainer>
      {showAddress && address && (
        <div style={{
          position: "absolute",
          top: "8px",
          left: "8px",
          background: "white",
          padding: "8px 12px",
          borderRadius: "6px",
          fontSize: "12px",
          fontWeight: "500",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          maxWidth: "80%",
          zIndex: 21,
        }}>
          {loading ? "Henter adresse..." : address}
        </div>
      )}
    </div>
  );
}
