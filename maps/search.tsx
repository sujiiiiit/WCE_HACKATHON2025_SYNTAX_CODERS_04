'use client'
import React, { useRef, useEffect, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

// Define interfaces for the Google Maps Places API
interface PlacePrediction {
    place_id: string;
    description: string;
    // Other properties that might be used from the API
}

interface AutocompleteRequest {
    input: string;
    types: string[];
}

const PlaceAutocompleteInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const placesLib = useMapsLibrary('places');
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]);
  const [activeSuggestions, setActiveSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentFocus, setCurrentFocus] = useState(-1);

  useEffect(() => {
    if (!placesLib || !inputRef.current) return;

    const autocompleteService = new placesLib.AutocompleteService();

    const handleInput = (e: Event) => {
        const inputValue = (e.target as HTMLInputElement).value;
        if (inputValue.trim().length > 2) {
            autocompleteService.getPlacePredictions(
                {
                    input: inputValue,
                    types: ['geocode'],
                } as AutocompleteRequest,
                (predictions: PlacePrediction[] | null, status: string) => {
                    if (status === placesLib.PlacesServiceStatus.OK) {
                        setSuggestions(predictions || []);
                        setShowSuggestions(true);
                    }
                }
            );
        } else {
            setShowSuggestions(false);
        }
    };

    inputRef.current.addEventListener('input', handleInput);

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('input', handleInput);
      }
    };
  }, [placesLib]);

const handleClick = (placeId: string): void => {
    setShowSuggestions(false);
    // You can now use the placeId to get place details
    // using the PlacesService
};

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (showSuggestions) {
        if (e.key === 'ArrowDown') {
            setCurrentFocus((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            setCurrentFocus((prev) => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === 'Enter' && currentFocus >= 0) {
            handleClick(suggestions[currentFocus].place_id);
        }
    }
};

  return (
    <div className="autocomplete-container">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for a location..."
        onKeyDown={handleKeyDown}
      />
      {showSuggestions && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.place_id}
              className={index === currentFocus ? 'suggestion-active' : ''}
              onClick={() => handleClick(suggestion.place_id)}
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlaceAutocompleteInput;