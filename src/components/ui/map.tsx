import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Temporary token input for demo - in production this should be in Supabase secrets
const TEMP_MAPBOX_TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'; // Demo token

interface MapProps {
  travels?: Array<{
    id: string;
    title: string;
    destination: string;
    latitude?: number;
    longitude?: number;
    status: string;
  }>;
  onLocationClick?: (lat: number, lng: number) => void;
}

export const TravelMap: React.FC<MapProps> = ({ travels = [], onLocationClick }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState(TEMP_MAPBOX_TOKEN);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      zoom: 2,
      center: [20, 50], // Center on Europe
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    map.current.on('load', () => {
      setIsMapReady(true);
    });

    map.current.on('click', (e) => {
      if (onLocationClick) {
        onLocationClick(e.lngLat.lat, e.lngLat.lng);
      }
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, onLocationClick]);

  // Add travel markers when map is ready and travels data changes
  useEffect(() => {
    if (!map.current || !isMapReady) return;

    // Clear existing markers
    const existingMarkers = document.querySelectorAll('.travel-marker');
    existingMarkers.forEach(marker => marker.remove());

    // Add new markers
    travels.forEach(travel => {
      if (travel.latitude && travel.longitude) {
        const markerColor = travel.status === 'completed' ? '#22c55e' : 
                          travel.status === 'booked' ? '#3b82f6' : '#f59e0b';

        const marker = new mapboxgl.Marker({ 
          color: markerColor,
          className: 'travel-marker'
        })
          .setLngLat([travel.longitude, travel.latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div class="p-2">
                  <h3 class="font-bold text-sm">${travel.title}</h3>
                  <p class="text-xs text-gray-600">${travel.destination}</p>
                  <p class="text-xs capitalize mt-1">
                    <span class="inline-block w-2 h-2 rounded-full mr-1" style="background-color: ${markerColor}"></span>
                    ${travel.status}
                  </p>
                </div>
              `)
          )
          .addTo(map.current!);
      }
    });

    // Fit map to show all markers if there are any
    if (travels.length > 0 && travels.some(t => t.latitude && t.longitude)) {
      const coordinates = travels
        .filter(t => t.latitude && t.longitude)
        .map(t => [t.longitude!, t.latitude!] as [number, number]);
      
      if (coordinates.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        coordinates.forEach(coord => bounds.extend(coord));
        map.current?.fitBounds(bounds, { padding: 50 });
      }
    }
  }, [travels, isMapReady]);

  if (!mapboxToken || mapboxToken === TEMP_MAPBOX_TOKEN) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Konfiguracja mapy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Aby używać mapy, potrzebujesz klucza API Mapbox. Możesz go uzyskać za darmo na{' '}
            <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              mapbox.com
            </a>
          </p>
          <div className="space-y-2">
            <label htmlFor="mapbox-token" className="text-sm font-medium">
              Klucz API Mapbox
            </label>
            <div className="flex gap-2">
              <Input
                id="mapbox-token"
                type="password"
                placeholder="pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjazJud..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
              />
              <Button onClick={() => setMapboxToken(mapboxToken)}>
                Ustaw
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-96">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/5 rounded-lg" />
    </div>
  );
};