import { GoogleMap } from "@capacitor/google-maps";
import { useEffect, useRef } from "react";
import { mapsApiKey } from "./mapsApiKey";

interface MyMapProps {
  lat: number;
  lng: number;
}

/**
 * Componenta pentru afisarea unei harti utilizand Google Maps
 * @param param0 atributele hatrtii, latitudine si longitudine
 * @returns componenta hartii
 */
export const MyMap: React.FC<MyMapProps> = ({ lat, lng }) => {
  const mapRef = useRef<HTMLElement>(null);
  useEffect(myMapEffect, [mapRef.current]);

  return (
    <div className="component-wrapper">
      <capacitor-google-map
        ref={mapRef}
        style={{
          display: "block",
          width: 325,
          height: 400,
        }}
      ></capacitor-google-map>
    </div>
  );

  function myMapEffect() {
    let canceled = false;
    let googleMap: GoogleMap | null = null;
    createMap();
    return () => {
      canceled = true;
      googleMap?.removeAllMapListeners();
    };

    async function createMap() {
      if (!mapRef.current) {
        return;
      }
      googleMap = await GoogleMap.create({
        id: "my-cool-map",
        element: mapRef.current,
        apiKey: mapsApiKey,
        config: {
          center: { lat, lng },
          zoom: 16,
        },
      });
      let myLocationMarkerId = await googleMap.addMarker({
        coordinate: { lat, lng },
        title: "My location2",
      });
    }
  }
};
