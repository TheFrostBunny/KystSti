export interface GeocodeResult {
  address: string;
  lat: number;
  lng: number;
}

export interface ReverseGeocodeResult {
  address: string;
  city?: string;
  country?: string;
}

export const getUserPosition = (): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: parseFloat(position.coords.latitude.toFixed(5)),
          lng: parseFloat(position.coords.longitude.toFixed(5)),
        });
      },
      (error) => {
        const getMessage = (code: number) => {
          switch (code) {
            case error.PERMISSION_DENIED:
              return "Location permission denied. Please enable it in your browser settings.";
            case error.POSITION_UNAVAILABLE:
              return "Location information is unavailable.";
            case error.TIMEOUT:
              return "Location request timed out.";
            default:
              return "Could not get your location";
          }
        };
        reject(new Error(getMessage(error.code)));
      }
    );
  });
};

export const reverseGeocode = async (
  lat: number,
  lng: number
): Promise<ReverseGeocodeResult> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      {
        headers: { "User-Agent": "KystSti-TourBuilder/1.0" },
      }
    );

    if (!response.ok) throw new Error("Reverse geocoding failed");

    const data = await response.json();
    const address = data.address?.road ?? 
      data.address?.village ?? 
      data.address?.town ?? 
      data.address?.city ?? 
      data.display_name?.split(",")[0] ?? 
      "Unknown location";
    const city = data.address?.city ?? data.address?.town ?? data.address?.village;
    const country = data.address?.country;

    return {
      address: address.trim(),
      city,
      country,
    };
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return {
      address: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
    };
  }
};

export const formatCoordinates = (lat: number, lng: number): string => 
  `${lat.toFixed(5)}, ${lng.toFixed(5)}`;

export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
