import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

interface TripDetail {
  Id: string;
  BookingDate: string;
  Status: string;
  UpDate: string;
  CustomerId: string;
  DriverId: string | null;
  tripDetails: any;
}

interface TripData {
  trip: TripDetail;
}

const TripComponent: React.FC = () => {
  const [trips, setTrips] = useState<TripData[]>([]);
  const socket = io('http://localhost:5000');

  useEffect(() => {
    socket.emit('tripData', (data: TripData[]) => {
      console.log('Nhận dữ liệu tripData:', data);
      setTrips(data);
    });
    return () => {
      socket.off('tripData');
    };
  }, []);

  return (
    <div>
      <h2>Danh sách Chuyến Đi</h2>
      <ul>
        {trips.map((tripData, index) => (
          <li key={index}>
            ID: {tripData.trip.Id}, BookingDate: {tripData.trip.BookingDate}, Status:{' '}
            {tripData.trip.Status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripComponent;
