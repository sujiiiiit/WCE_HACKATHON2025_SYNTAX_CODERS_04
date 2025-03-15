"use client";
import { useState, useEffect } from "react";

interface LocationType {
  latitude: number;
  longitude: number;
}

export default function LocationComponent() {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [error, setError] = useState<string | null>(null);
  console.log(location);

  useEffect(() => {
    // Check if running in browser and if geolocation is supported
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (err) => {
          setError(err.message);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!location) return <div>Loading...</div>;

  return (
    <div>
      <p>Your Latitude: {location.latitude}</p>
      <p>Your Longitude: {location.longitude}</p>
    </div>
  );
}
