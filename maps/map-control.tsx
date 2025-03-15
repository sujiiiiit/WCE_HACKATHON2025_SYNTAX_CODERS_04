import React from "react";
import { ControlPosition, MapControl } from "@vis.gl/react-google-maps";

import AutocompleteCustomHybrid from "./autocomplete-custom-hybrid";

type CustomAutocompleteControlProps = {
  controlPosition: ControlPosition;
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
};

export const CustomMapControl = ({
  controlPosition,
  onPlaceSelect,
}: CustomAutocompleteControlProps) => {
  return (
    <MapControl position={controlPosition}>
      <div className="autocomplete-control">
        <AutocompleteCustomHybrid onPlaceSelect={onPlaceSelect} />
      </div>
    </MapControl>
  );
};
