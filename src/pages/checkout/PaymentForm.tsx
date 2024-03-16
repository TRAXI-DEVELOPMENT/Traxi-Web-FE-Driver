import * as React from 'react';
import { useCheckout } from 'src/contexts/CheckoutContext'; // Giả sử bạn đã tạo và xuất khẩu hook này

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
import { styled } from '@mui/system';
import { InputLabel, NativeSelect } from '@mui/material';
import FileUploadPage from 'src/components/FileUploadPage';

const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

interface CheckoutData {
  fullname: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
  expirationDate?: string;
  licenseType?: string;
}

export default function PaymentForm() {
  const [expirationDate, setExpirationDate] = React.useState('');
  const { checkoutData, setCheckoutData } = useCheckout(); // Sử dụng setCheckoutData từ context

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setCheckoutData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setCheckoutData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handleExpirationDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, '');
    let formattedValue = value;

    if (value.length <= 2) {
      formattedValue = value;
    } else if (value.length <= 4) {
      formattedValue = `${value.slice(0, 2)}/${value.slice(2)}`;
    } else {
      formattedValue = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 8)}`;
    }
    setExpirationDate(formattedValue);
    setCheckoutData((currentData) => ({ ...currentData, expirationDate: formattedValue }));
  };
  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 3,
            height: { xs: 300, sm: 350, md: 375 },
            width: '100%',
            borderRadius: '20px',
            border: '1px solid ',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5">Tải lên giấy phép lái xe</Typography>
            <Iconify icon="clarity:license-line" sx={{ color: 'text.secondary', fontSize: 20 }} />
          </Box>
          <FileUploadPage />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="card-expiration" required>
                Ngày cấp
              </FormLabel>
              <OutlinedInput
                id="card-expiration"
                name="expirationDate"
                autoComplete="card-expiration"
                placeholder="DD/MM/YYYY"
                required
                value={expirationDate}
                onChange={handleExpirationDateChange}
              />
            </FormGrid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                gap: 2,
                minWidth: 120,
              }}
            >
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Loại bằng lái
                </InputLabel>
                <NativeSelect
                  defaultValue={'A1'}
                  inputProps={{
                    name: 'licenseType',
                    id: 'uncontrolled-native',
                  }}
                  onChange={handleSelectChange}
                >
                  <option value={'A1'}>A1</option>
                  <option value={'B1'}>B1</option>
                  <option value={'B2'}>B2</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
