import { useEffect, useState } from "react";

export function OnlineStatusBanner() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (online) return null;
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-red-600 text-white text-center py-2 font-semibold shadow-lg">
      Du er frakoblet – ingen nettverk
    </div>
  );
}
