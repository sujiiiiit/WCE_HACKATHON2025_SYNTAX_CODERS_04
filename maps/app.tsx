import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { APIProvider, ControlPosition, Map } from "@vis.gl/react-google-maps";

import { CustomMapControl } from "./map-control";
import MapHandler from "./map-handler";

export type AutocompleteMode = { id: string; label: string };
import Search from "./search";
const App = () => {
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      <Map
        defaultZoom={3}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      />
{/* <Search /> */}
      {/* <CustomMapControl
        controlPosition={ControlPosition.TOP}
        onPlaceSelect={setSelectedPlace}
      /> */}

      <MapHandler place={selectedPlace} />
    </APIProvider>
  );
};

export default App;
