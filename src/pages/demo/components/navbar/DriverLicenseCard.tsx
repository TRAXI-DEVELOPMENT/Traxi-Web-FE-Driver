import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CardMedia, Button, Grid, Box } from '@mui/material';
import Iconify from 'src/components/iconify';
import { getDriverDegree } from 'src/api/Driver/DriverDegree';
import { DriverDetails, DriverLicenseCardProps } from 'src/types/driverdgree';
import { fCustomFormatDate } from 'src/utils/formatTime';

const DriverLicenseCard: React.FC<DriverLicenseCardProps> = ({ degreeId }) => {
  const [driverDetailsList, setDriverDetailsList] = useState<DriverDetails[]>([]);

  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const response = await getDriverDegree(degreeId);
        if (response.result && response.result.length > 0) {
          setDriverDetailsList(response.result);
        }
      } catch (error) {
        console.error('Failed to fetch driver degree details:', error);
      }
    };

    fetchDriverDetails();
  }, [degreeId]);

  if (driverDetailsList.length === 0) return <div>Đang tải...</div>;

  return (
    <Box>
      {driverDetailsList.map((driverDetails, index) => (
        <Card key={index} sx={{ display: 'flex', maxWidth: 850, mb: 2 }}>
          <CardMedia
            component="img"
            sx={{ width: 450, height: 'auto' }}
            image={driverDetails.ImageUrl}
            alt="Driver License"
          />
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" color="text.primary" sx={{ mb: 2 }}>
                  Thông tin Bằng lái xe
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <Iconify
                    icon="fa:drivers-license-o"
                    width={24}
                    height={24}
                    style={{ verticalAlign: 'middle' }}
                  />{' '}
                  Họ và tên: {driverDetails.FullName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <Iconify
                    icon="mingcute:award-line"
                    width={24}
                    height={24}
                    style={{ verticalAlign: 'middle' }}
                  />{' '}
                  Bằng lái: {driverDetails.DegreeName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <Iconify
                    icon="ant-design:car-twotone"
                    width={24}
                    height={24}
                    style={{ verticalAlign: 'middle' }}
                  />{' '}
                  Loại: {driverDetails.Type}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <Iconify
                    icon="solar:calendar-broken"
                    width={24}
                    height={24}
                    style={{ verticalAlign: 'middle' }}
                  />{' '}
                  Ngày cấp: {fCustomFormatDate(driverDetails.DateDegree)}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default DriverLicenseCard;
