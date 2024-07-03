import { Suspense, useEffect, useState } from 'react';
import { add } from 'date-fns';
// @mui
import {
  Box,
  Tab,
  Tabs,
  Button,
  Divider,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
// types
import { TripsDriver } from 'src/types/trips';
// api
import { getDetailTrip, getDetailTripByDriver } from 'src/api/Trip/Trip';
// components
import AccountItem from '../../account/layouts/AccountItem';
import AccountLayout from '../../account/layouts/AccountLayout';

export default function AccountView() {
  const [tripsDriver, setTripsDriver] = useState<TripsDriver[] | null>(null);
  const [userId, setUserId] = useState('');
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchUserInfo = () => {
        const userInfoString = localStorage.getItem('USER_INFO');
        if (userInfoString) {
          const userInfo = JSON.parse(userInfoString);
          setUserId(userInfo.id);
        }
      };
      fetchUserInfo();
    }
  }, []);

  useEffect(() => {
    const fetchTripDetails = async () => {
      if (!userId) return;

      try {
        const data = await getDetailTripByDriver(userId);
        data.sort(
          (a: TripsDriver, b: TripsDriver) =>
            new Date(b.BookingDate).getTime() - new Date(a.BookingDate).getTime()
        );
        setTripsDriver(data);

        const tripDetailsPromises = data.map((trip: TripsDriver) => getDetailTrip(trip.Id));
        const tripDetails = await Promise.all(tripDetailsPromises);

        const total = tripDetails.reduce((acc, detail) => acc + detail.TripDetail.TotalPrice, 0);
        setTotalEarnings(total * 0.7);
      } catch (error) {
        console.error('Failed to fetch trip details:', error);
      }
    };

    fetchTripDetails();
  }, [userId]);

  return (
    <AccountLayout>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Lịch sử cuốc
      </Typography>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Tổng thu nhập (70%):{' '}
        {totalEarnings.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
      </Typography>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >
        {tripsDriver ? (
          tripsDriver
            .sort((a, b) => new Date(b.BookingDate).getTime() - new Date(a.BookingDate).getTime())
            .map((trip) => <AccountItem key={trip.Id} tripsDriver={trip} />)
        ) : (
          <div>Loading...</div>
        )}
      </Box>
    </AccountLayout>
  );
}
