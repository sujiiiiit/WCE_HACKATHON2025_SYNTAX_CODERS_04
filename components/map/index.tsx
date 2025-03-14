"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { APIProvider, Map, AdvancedMarker, useMap, useMapsLibrary } from "@vis.gl/react-google-maps"; // Import useMap and useMapsLibrary

interface LocationType {
  lat: number;
  lng: number;
}

const Maps = () => {
  const defaultLocation = useMemo(() => ({ lat: 20.5937, lng: 78.9629 }), []);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID || "288914ad7c704900";

  const indiaBounds = useMemo(
    () => ({
      north: 37.1,
      south: 6.4,
      east: 97.4,
      west: 68.1,
    }),
    []
  );

  // **Simplified** border coordinates - **REPLACE with accurate data**
  const indiaBorderCoordinates = useMemo(() => [
    { lat: 35.5, lng: 70.0 },
    { lat: 35.5, lng: 80.0 },
    { lat: 25.5, lng: 90.0 },
    { lat: 15.5, lng: 90.0 },
    { lat: 5.5, lng: 80.0 },
    { lat: 5.5, lng: 70.0 },
    { lat: 35.5, lng: 70.0 },
  ], []);

  const mapInstance = useMap(); // Get the map instance
  const drawingLibrary = useMapsLibrary('drawing'); // Load 'drawing' library (though we might not directly need it, keeping it for consistency with your example)
  const [indiaBorderPolygon, setIndiaBorderPolygon] = useState<google.maps.Polygon | null>(null); // State to hold Polygon object

  useEffect(() => {
    if (!mapInstance) return;

    const polygon = new window.google.maps.Polygon({ // Create google.maps.Polygon
      paths: indiaBorderCoordinates,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.1,
      editable: false,
      draggable: false,
      map: mapInstance, // Set the map here to render it
    });

    setIndiaBorderPolygon(polygon); // Store the Polygon object in state

    return () => { // Cleanup function to remove polygon when component unmounts or map changes
      polygon.setMap(null);
    };

  }, [mapInstance, indiaBorderCoordinates]); // Effect dependencies: mapInstance and border coordinates


  if (!apiKey) {
    return (
      <div className="flex items-center justify-center h-dvh w-dvw bg-gray-100">
        <p className="text-red-500 font-medium">
          Google Maps API key is missing. Please add it to your environment
          variables.
        </p>
      </div>
    );
  }
  return (
    <APIProvider apiKey={apiKey} region="IN">
      <Map
        defaultCenter={defaultLocation}
        defaultZoom={5}
        mapId={mapId}
        className="h-full w-full"
        gestureHandling="greedy"
        disableDefaultUI={true}
        // restriction={{
        //   latLngBounds: indiaBounds,
        //   strictBounds: true
        // }}
      >
        
        <AdvancedMarker position={defaultLocation} title="Your Location" />
        {/*  We are now directly manipulating google.maps.Polygon in useEffect, no need to render a <Polygon> component here */}
      </Map>
    </APIProvider>
  );
};

export default Maps;