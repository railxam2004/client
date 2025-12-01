// src/components/map/map.tsx
import { useEffect, useRef } from 'react';
import L, { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { CityOffer, OfferLocation } from '../../types/offer';

type MapPoint = {
  id: string;
  location: OfferLocation;
};

type MapProps = {
  city: CityOffer;
  points: MapPoint[];      // сюда подойдут и OffersList, и FullOffer (по структуре)
  className: string;       // например 'cities__map' или 'offer__map'
};

function Map({ city, points, className }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);

  // Инициализация карты
  useEffect(() => {
    if (mapRef.current !== null && mapInstanceRef.current === null) {
      mapInstanceRef.current = L.map(mapRef.current, {
        center: [city.location.latitude, city.location.longitude],
        zoom: city.location.zoom,
      });

      L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; OpenStreetMap contributors',
        }
      ).addTo(mapInstanceRef.current);
    }
  }, [city]);

  // Маркеры + обновление центра/зум
  useEffect(() => {
    const map = mapInstanceRef.current;

    if (!map) {
      return;
    }

    map.setView(
      [city.location.latitude, city.location.longitude],
      city.location.zoom
    );

    const markersLayer = L.layerGroup().addTo(map);

    points.forEach((point) => {
      L.marker([point.location.latitude, point.location.longitude]).addTo(markersLayer);
    });

    // Чистим слой при изменении points/city
    return () => {
      map.removeLayer(markersLayer);
    };
  }, [city, points]);

  return (
    <section
      className={`${className} map`}
      ref={mapRef}
    />
  );
}

export { Map };
