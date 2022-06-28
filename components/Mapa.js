import { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

const libraries = ['places'];

export default function Mapa({coordenadas}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const center = { lat: -33.447487, lng: -70.673676 }
  

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      {coordenadas === undefined ? 
      <GoogleMap
      zoom={15}
      center={center}
      mapContainerClassName="w-full h-screen"
    >
      {coordenadas && <Marker position={coordenadas} />}
    </GoogleMap>
      : 
      <GoogleMap
      zoom={15}
      center={coordenadas}
      mapContainerClassName="w-full h-screen"
    >
      
      {coordenadas && <Marker icon={{url:'https://icon-library.com/images/13-512_7249.png', anchor: new google.maps.Point(20, 46), scaledSize: new google.maps.Size(50, 50)}} position={coordenadas} />}
    </GoogleMap>
      }
    </>
  );
}


