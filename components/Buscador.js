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

export default function Buscador({ setCoordenadas, setEstacionamiento, estacionamiento, handleChangeEstacionamiento}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Cargando...</div>;
  return (
    <>
      <div >
        <PlacesAutocomplete setCoordenadas={setCoordenadas} setEstacionamiento = {setEstacionamiento} estacionamiento = {estacionamiento} handleChangeEstacionamiento = {handleChangeEstacionamiento}/>
      </div>
    </>
  );
}


const PlacesAutocomplete = ({ setCoordenadas, setEstacionamiento, estacionamiento, handleChangeEstacionamiento }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setCoordenadas({ lat, lng });
    setEstacionamiento({...estacionamiento, ["direccion"]: address, ["latitud"]: lat, ["longitud"]: lng});

    
    
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        name="direccion"
        value= {estacionamiento.direccion}// {value}
        onChange={(e) => {
          setValue(e.target.value);
          handleChangeEstacionamiento(e);
        }}
        disabled={!ready}
        autoComplete="off"
        className="p-1 px-3 appearance-none outline-none w-full text-gray-600 shadow border rounded py-2 "
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
