// next
import { useRouter } from 'next/router';
import { createRef, useEffect, useState } from 'react';
// api
import { getDetailTrip } from 'src/api/Trip/Trip'; // Assuming getPositionById is added here
// layouts
import { GoogleMap, useLoadScript, DirectionsRenderer, Libraries } from '@react-google-maps/api';
import { getPositionById } from 'src/api/GoogleMap/Map';
import requestWebDriver, { axiosInstances } from 'src/utils/axios';

const mapContainerStyle = {
  width: '800px',
  height: '600px',
};

const center = {
  lat: 10.762622,
  lng: 106.660172,
};

interface MapComponentProps {
  tripId: string;
}

interface TripDetails {
  TripId: string;
  BookingDate: string;
  Status: string;
  UpDate: string;
  CustomerId: string;
  DriverId: string;
  TripDetail: {
    Distance: number;
    TotalPrice: number;
    InsDate: null | string;
    EndTime: string;
    StartTime: string;
    StartLocation: string;
    EndLocation: string;
    TripId: string;
    Vehicle: null | string;
  };
}

const libraries: Libraries = ['places']; // Define libraries outside the component

export default function MapComponent({ tripId }: MapComponentProps) {
  const router = useRouter();
  const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(
    null
  );
  const [apiKey, setApiKey] = useState<string>('');
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const fetchTripDetails = async () => {
      if (tripId) {
        try {
          const details = await getDetailTrip(tripId as string);
          setTripDetails(details);
        } catch (error) {
          console.error('Failed to fetch trip details:', error);
        }
      }
    };

    fetchTripDetails();
  }, [tripId]);
  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const MapsApiKey = await requestWebDriver.get(
          'https://66940638c6be000fa07df004.mockapi.io/mapapikey'
        );
        const fetchedApiKey = MapsApiKey.data[0].mapKey;
        setApiKey(fetchedApiKey);
        setIsScriptLoaded(true);
      } catch (error) {
        console.error('Error fetching API key:', error);
      }
    };

    fetchApiKey();
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: isScriptLoaded ? libraries : [], // Use the static libraries array
  });

  const mapRef = createRef<GoogleMap>();

  useEffect(() => {
    if (!isLoaded || !tripId) return;

    const fetchPositionAndCalculateRoute = async () => {
      try {
        const { result } = await getPositionById(tripId);
        if (result) {
          const originLatLng = result.originLatLng.split(', ').map((coord: string) => {
            const [_, value] = coord.split(': ');
            return parseFloat(value);
          });
          const destinationLatLng = result.destinationLatLng.split(', ').map((coord: string) => {
            const [_, value] = coord.split(': ');
            return parseFloat(value);
          });

          const origin = { lat: originLatLng[0], lng: originLatLng[1] };
          const destination = { lat: destinationLatLng[0], lng: destinationLatLng[1] };

          const directionsService = new google.maps.DirectionsService();
          directionsService.route(
            {
              origin,
              destination,
              travelMode: google.maps.TravelMode.DRIVING,
            },
            (directionsResult, status) => {
              if (status === google.maps.DirectionsStatus.OK && directionsResult) {
                setDirectionsResponse(directionsResult);
              } else {
                console.error(`error fetching directions ${directionsResult}`);
              }
            }
          );
        }
      } catch (error) {
        console.error('Failed to fetch position data:', error);
      }
    };

    fetchPositionAndCalculateRoute();
  }, [isLoaded, tripId]);

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center} ref={mapRef}>
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      </GoogleMap>
    </>
  );
}