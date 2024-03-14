import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CardMedia, CardActions, Button } from '@mui/material';
import { getDriverDegree } from 'src/api/Driver/DriverDegree';
import { DriverDetails, DriverLicenseCardProps } from 'src/types/driverdgree';

const DriverLicenseCard: React.FC<DriverLicenseCardProps> = ({ degreeId }) => {
  const [driverDetails, setDriverDetails] = useState<DriverDetails | null>(null);

  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const response = await getDriverDegree(degreeId);
        if (response.result && response.result.length > 0) {
          setDriverDetails(response.result[0]);
        }
      } catch (error) {
        console.error('Failed to fetch driver degree details:', error);
      }
    };

    fetchDriverDetails();
  }, [degreeId]);

  if (!driverDetails) return <div>Đang tải...</div>;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={driverDetails.ImageUrl} alt="Driver License" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {driverDetails.FullName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Bằng lái: {driverDetails.DegreeName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Loại: {driverDetails.Type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ngày cấp: {driverDetails.DateDegree}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Xem Thêm</Button>
      </CardActions>
    </Card>
  );
};

export default DriverLicenseCard;
