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
import { getDetailTripByDriver } from 'src/api/Trip/Trip';
// components
import AccountItem from '../../account/layouts/AccountItem';
import AccountLayout from '../../account/layouts/AccountLayout';

export default function AccountView() {
  const [tripsDriver, setTripsDriver] = useState<TripsDriver[] | null>(null);
  const [userId, setUserId] = useState('');

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
        const data = await getDetailTripByDriver(userId); // Sửa 'let' thành 'const'
        data.sort(
          (a: TripsDriver, b: TripsDriver) =>
            new Date(b.BookingDate).getTime() - new Date(a.BookingDate).getTime() // Sửa cú pháp hàm arrow
        );
        setTripsDriver(data);
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
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >
        {tripsDriver ? (
          tripsDriver.map((trip) => <AccountItem key={trip.Id} tripsDriver={trip} />)
        ) : (
          <div>Loading...</div>
        )}
      </Box>
    </AccountLayout>
  );
}
