import { useEffect, useState } from 'react';
import { Box, Typography, Stack, TextField } from '@mui/material';
import { useDriverInfo } from 'src/hooks/useDriverInfo';
import { getDriverInfo } from 'src/api/Driver/Driver';
import EcommerceAccountLayout from '../../account/layouts/AccountLayout';
import DriverLicenseCard from '../../components/navbar/DriverLicenseCard';

// ----------------------------------------------------------------------

export default function DriverProfile() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const driverId = useDriverInfo();

  const [driverData, setDriverData] = useState({
    fullName: '',
    phone: '',
    address: '',
    degreeId: '',
  });

  useEffect(() => {
    if (driverId) {
      getDriverInfo(driverId)
        .then((data) => {
          const { result } = data;
          if (result) {
            setDriverData({
              fullName: result.FullName,
              phone: result.Phone,
              address: result.Address,
              degreeId: result.DegreeId,
            });
          }
        })
        .catch((error) => {
          console.error('Failed to fetch driver info:', error);
        });
    }
  }, [driverId]);

  return (
    <EcommerceAccountLayout>
      <Box
        rowGap={2.5}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      >
        <TextField
          id="outlined-read-only-input"
          label="Họ và Tên"
          value={driverData.fullName}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-read-only-input"
          label="Số điện thoại"
          value={driverData.phone} // Sử dụng giá trị từ state driverData
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-read-only-input"
          label="Địa chỉ"
          value={driverData.address} // Sử dụng giá trị từ state driverData
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-read-only-input"
          label="Bằng lái"
          value={driverData.degreeId} // Sử dụng giá trị từ state driverData
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>

      <Stack spacing={3} sx={{ my: 5 }}>
        <Typography variant="h5"> Change Password </Typography>
        <DriverLicenseCard degreeId={driverId} />
        {/* <Stack spacing={2.5}>
              <RHFTextField
                name="oldPassword"
                label="Old Password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        <Iconify icon={showPassword ? 'carbon:view' : 'carbon:view-off'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
    
              <RHFTextField
                name="newPassword"
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        <Iconify icon={showPassword ? 'carbon:view' : 'carbon:view-off'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
    
              <RHFTextField
                name="confirmNewPassword"
                label="Confirm New Password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        <Iconify icon={showPassword ? 'carbon:view' : 'carbon:view-off'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack> */}
      </Stack>
    </EcommerceAccountLayout>
  );
}
