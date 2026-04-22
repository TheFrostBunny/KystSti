import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";


interface MapPreviewProps {
  lat: number;
  lng: number;
  zoom: number;
  onSelectPosition?: (lat: number, lng: number) => void;
}

function ClickHandler({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export function MapPreview({ lat, lng, zoom, onSelectPosition }: MapPreviewProps) {
  return (
    <div style={{ height: 240, width: "100%", borderRadius: 12, overflow: "hidden", marginBottom: 16 }}>
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
        <Marker position={[lat, lng]}>
          <Popup>Stopp</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
