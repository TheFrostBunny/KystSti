import React, { useState } from "react";
import QRCode from "react-qr-code";

export function QRGenerator() {
  const exampleUrl = "http://kyststi.netlify.app/tur/kristiansund-byvandring/stopp/kirkelandet-kirke";
  const [value, setValue] = useState(exampleUrl);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <input
        type="text"
        placeholder={exampleUrl}
        value={value}
        onChange={e => setValue(e.target.value)}
        style={{ padding: 8, width: 380, fontSize: 16 }}
      />
      <div style={{ background: "#fff", padding: 16, borderRadius: 8, boxShadow: "0 2px 8px #0001" }}>
        <QRCode value={value || exampleUrl} size={180} />
      </div>
      <div style={{ fontSize: 13, color: '#888', marginTop: 8 }}>
        Eksempel: <span style={{ fontFamily: 'monospace' }}>{exampleUrl}</span>
      </div>
    </div>
  );
}
