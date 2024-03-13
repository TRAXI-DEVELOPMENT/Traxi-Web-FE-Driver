// next
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useRef, useEffect, useState } from 'react';
// api
import { getDetailTrip } from 'src/api/Trip/Trip';
// layouts
import { GoogleMap, useLoadScript, DirectionsRenderer } from '@react-google-maps/api';

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
    Vehicle: null | string; // Giả sử Vehicle có thể là null hoặc string, điều chỉnh tùy theo dữ liệu thực tế
  };
}

export default function MapComponent({ tripId }: MapComponentProps) {
  const router = useRouter();
  const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(
    null
  );

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

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyALnApi1MyjOBFx_748I-ZUYEkf2wPwP7Q',
  });

  const mapRef = useRef<GoogleMap>();

  useEffect(() => {
    if (!isLoaded || !tripDetails || !tripDetails.TripDetail) return;

    const directionsService = new google.maps.DirectionsService();
    const origin = tripDetails?.TripDetail.StartLocation;
    const destination = tripDetails?.TripDetail.EndLocation;

    const calculateRoute = async () => {
      directionsService.route(
        {
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirectionsResponse(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    };

    calculateRoute();
  }, [isLoaded, tripDetails]);

  if (loadError) return <div>Lỗi khi tải bản đồ</div>;
  if (!isLoaded) return <div>Đang tải bản đồ...</div>;

  return (
    <>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center} ref={mapRef}>
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      </GoogleMap>
    </>
  );
}
