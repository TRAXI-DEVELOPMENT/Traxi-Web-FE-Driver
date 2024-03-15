import { useState } from 'react';
// @mui
import {
  Box,
  Link,
  Stack,
  Avatar,
  Popover,
  Checkbox,
  MenuItem,
  Typography,
  IconButton,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
// types
import { Result } from 'src/types/trips';
// components
import Image from 'src/components/image';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

type Props = {
  tripDetails: Result;
};

export default function TripDetailHeader({ tripDetails }: Props) {
  // Chuyển useState ra ngoài khối điều kiện
  const [open, setOpen] = useState<HTMLElement | null>(null);

  if (!tripDetails || !tripDetails.TripDetail) {
    return <div>Loading...</div>;
  }

  const { TripId, BookingDate, Status, UpDate, CustomerId, DriverId, TripDetail } =
    tripDetails ?? {};

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          mb: 3,
        }}
      >
        {TripDetail?.Vehicle?.ImgURL ? (
          <Image
            alt={TripId}
            src={TripDetail.Vehicle.ImgURL}
            sx={{
              height: 1,
              objectFit: 'cover',
              width: { sm: 150 },
            }}
          />
        ) : (
          <Image
            alt={TripId}
            src="https://img.upanh.tv/2024/03/09/vecteezy_car-icon-car-icon-vector-car-icon-simple-sign_5576332.jpg"
            sx={{
              height: 1,
              objectFit: 'cover',
              width: { sm: 150 },
            }}
          />
        )}
        <Typography variant="h3" sx={{ fontSize: '1rem' }}>
          {TripDetail?.Vehicle?.Mode ?? 'null'} - {TripDetail?.Vehicle?.Type ?? 'null'}
          <br />
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h5">
              <Icon style={{ position: 'relative', top: '6px', fontSize: 25 }} icon="raphael:car" />{' '}
              {TripDetail?.Vehicle?.LicensePlate ?? 'A-123456'}
            </Typography>
            <Typography sx={{ color: TripDetail?.Vehicle?.Color ?? 'Black' }} variant="h5">
              {TripDetail?.Vehicle?.Color ?? 'Black'}
              <CircleIcon sx={{ position: 'relative', top: '5px' }} />{' '}
            </Typography>
          </Stack>
        </Typography>
      </Stack>
    </>
  );
}
