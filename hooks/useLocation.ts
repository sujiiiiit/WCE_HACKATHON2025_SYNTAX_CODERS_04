"use client";

import { useState, useEffect } from "react";

interface LocationType {
  latitude: number;
  longitude: number;
}

interface AddressType {
  display_name: string;
}

interface LocationResult {
  location: LocationType | null;
  address: AddressType | null;
  error: string | null;
  loading: boolean;
}

export const useLocation = (): LocationResult => {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [address, setAddress] = useState<AddressType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (err) => {
          setError(err.message);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (location) {
      fetchAddress(location.latitude, location.longitude);
    }
  }, [location]);

  const fetchAddress = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      if (!response.ok) throw new Error("Failed to fetch address");
      const data = await response.json();
      setAddress(data);
    } catch (err) {
      setError("Failed to retrieve address");
    } finally {
      setLoading(false);
    }
  };

  return { location, address, error, loading };
};

