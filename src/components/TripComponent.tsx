import React, { useEffect, useState } from 'react';
import useSocket from '../hooks/useSocket';
import io from 'socket.io-client';

interface TripDetail {
  Id: string;
  BookingDate: string;
  Status: string;
  UpDate: string;
  CustomerId: string;
  DriverId: string | null;
  tripDetails: any; // Thay thế `any` bằng kiểu dữ liệu cụ thể nếu bạn biết
}

interface TripData {
  trip: TripDetail;
}

const TripComponent: React.FC = () => {
  const socket = io('http://localhost:5000');
  const [trips, setTrips] = useState<TripData[]>([]);

  useEffect(() => {
    if (socket) {
      socket.emit('tripData', (data: TripData[]) => {
        console.log('Nhận dữ liệu tripData:', data);
        setTrips(data); // Lưu trữ dữ liệu vào state
      });

      return () => {
        socket.off('tripData');
      };
    }
  }, [socket]);

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
