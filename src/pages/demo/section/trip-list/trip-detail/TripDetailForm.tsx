import { useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PinDropIcon from '@mui/icons-material/PinDrop';
import { Typography, Stack, Button, Divider, Card, Avatar } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
// utils
import { fCurrency } from 'src/utils/formatNumber';
// types
import { Result, TripDetail as TripDetailType } from 'src/types/trips';
import { tripComplete } from 'src/api/Trip/CompleteTrip';
import { createTransaction } from 'src/api/Trip/CreateTransaction';
import { getCustomerInfo } from 'src/api/Customer/Customer';
import { ICustomerInfo } from 'src/types/customer';
//

// ----------------------------------------------------------------------

type Props = {
  tripDetails: Result;
};

export default function TripDetailForm({ tripDetails }: Props) {
  const { push } = useRouter();
  const [customerInfo, setCustomerInfo] = useState<ICustomerInfo | null>(null);
  const CustomerId = tripDetails ? tripDetails.CustomerId : null;
  const TripDetail = tripDetails ? tripDetails.TripDetail : null;

  const handleCompleteTrip = async () => {
    if (!TripDetail) {
      console.error('TripDetail is undefined');
      return;
    }
    try {
      await tripComplete(TripDetail.TripId);
      if (CustomerId !== null) {
        await createTransaction({
          Amount: TripDetail.TotalPrice,
          Action: 'payment',
          CustomerId,
          TripId: TripDetail.TripId,
          Method: 'Tiền mặt',
        });
      }
      push(`${paths.democompletedtrip}?tripId=${TripDetail.TripId}`);
    } catch (error) {
      console.error('Failed to complete trip', error);
    }
  };

  useEffect(() => {
    if (CustomerId !== null) {
      getCustomerInfo(CustomerId)
        .then((info) => {
          setCustomerInfo(info);
        })
        .catch((error) => {
          console.error('Failed to fetch customer info:', error);
        });
    }
  }, [CustomerId]);

  if (!TripDetail) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center">
          {customerInfo && (
            <>
              <Avatar src={customerInfo.ImageURL} />
              <Typography variant="body2" sx={{ ml: 1, mr: 0.5 }}>
                {customerInfo.FulllName}
                <br />
                {customerInfo.Phone}
              </Typography>
            </>
          )}
        </Stack>
        <div style={{ width: 266, height: 60, position: 'relative' }}>
          <div
            style={{
              width: 266,
              height: 60,
              left: 0,
              top: 0,
              position: 'absolute',
              background: '#F7F7F7',
              borderRadius: 8,
            }}
          />
          <div style={{ width: 248, height: 44, left: 11, top: 9, position: 'absolute' }}>
            <Typography
              style={{
                left: 25,
                top: 30,
                position: 'absolute',
                color: 'black',
                fontSize: 12,
                wordWrap: 'break-word',
              }}
            >
              {TripDetail.EndLocation?.length > 32
                ? `${TripDetail.EndLocation.slice(0, 32)}...`
                : TripDetail.EndLocation ?? ''}{' '}
            </Typography>
            <div
              style={{
                width: 18,
                height: 18,
                paddingTop: 3,
                paddingLeft: 3,
                paddingRight: 3,
                left: 0,
                top: 26,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'inline-flex',
              }}
            >
              <PinDropIcon sx={{ width: '20px', height: '20px', color: '#F15252' }} />
            </div>
            <div
              style={{
                width: 200,
                height: 0,
                left: 25,
                top: 23,
                position: 'absolute',
                border: '1px #CCCCCC solid',
              }}
            />
            <Typography
              style={{
                left: 25,
                top: 2,
                position: 'absolute',
                color: 'black',
                fontSize: 12,
                wordWrap: 'break-word',
              }}
            >
              {TripDetail.StartLocation?.length > 32
                ? `${TripDetail.StartLocation.slice(0, 32)}...`
                : TripDetail.StartLocation ?? ''}{' '}
            </Typography>
            <div style={{ width: 18, height: 28, left: 0, top: 0, position: 'absolute' }}>
              <div
                style={{
                  width: 18,
                  height: 18,
                  padding: 0.79,
                  left: 0,
                  top: 0,
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'inline-flex',
                }}
              >
                <MyLocationIcon sx={{ width: '20px', height: '20px', color: '#4C9FED' }} />
              </div>
            </div>
          </div>
        </div>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">Tổng thu khách hàng</Typography>
          <Typography variant="h5">{fCurrency(TripDetail.TotalPrice)}</Typography>
        </Stack>

        <Button size="large" variant="contained" color="success" onClick={handleCompleteTrip}>
          Hoàn thành chuyến đi
        </Button>
      </Stack>
    </Card>
  );
}
