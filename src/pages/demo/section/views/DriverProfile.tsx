import { useEffect, useState } from 'react';
import { Box, Typography, Stack, TextField, Button } from '@mui/material';
import { useDriverInfo } from 'src/hooks/useDriverInfo';
import { getDriverInfo } from 'src/api/Driver/Driver';
import EcommerceAccountLayout from '../../account/layouts/AccountLayout';
import DriverLicenseCard from '../../components/navbar/DriverLicenseCard';
import { changeDriverPassword } from 'src/api/Auth/Auth';
import { Snackbar, Alert } from '@mui/material';
import { AlertColor } from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ----------------------------------------------------------------------

export default function DriverProfile() {
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor | undefined>('info');

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
          console.log('Data received from getDriverInfo:', data);
          const { result } = data;
          if (result && result.Password) {
            setPassword(result.Password);
          } else {
            console.log('Password field is missing in the response');
          }
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

  const isValidPassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleChangePassword = async () => {
    console.log('password', password);
    if (oldPassword !== password) {
      setSnackbarMessage('Mật khẩu cũ không đúng.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (!isValidPassword(newPassword)) {
      setSnackbarMessage(
        'Mật khẩu mới phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và kí tự đặc biệt.'
      );
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setSnackbarMessage('Mật khẩu mới và xác nhận mật khẩu mới không khớp.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      await changeDriverPassword(driverId, newPassword);
      setSnackbarMessage('Mật khẩu đã được thay đổi thành công.');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Lỗi khi thay đổi mật khẩu:', error);
      setSnackbarMessage('Có lỗi xảy ra khi thay đổi mật khẩu.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };
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
          value={driverData.phone}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-read-only-input"
          label="Địa chỉ"
          value={driverData.address}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-read-only-input"
          label="Bằng lái"
          value={driverData.degreeId}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>

      <Stack spacing={3} sx={{ my: 5 }}>
        <Typography
          variant="h5"
          onClick={() => setShowChangePasswordForm(!showChangePasswordForm)}
          style={{ cursor: 'pointer' }}
        >
          Đổi mật khẩu
        </Typography>
        {showChangePasswordForm && (
          <>
            <TextField
              label="Mật khẩu cũ"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Mật khẩu mới"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Xác nhận mật khẩu mới"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" onClick={handleChangePassword}>
              Đổi Mật Khẩu
            </Button>
          </>
        )}
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
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </EcommerceAccountLayout>
  );
}
