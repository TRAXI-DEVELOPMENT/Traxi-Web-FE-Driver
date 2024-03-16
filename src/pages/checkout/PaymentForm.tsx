import * as React from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';

import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

import { styled } from '@mui/system';
import { InputLabel, NativeSelect } from '@mui/material';
import FileUploadPage from 'src/components/FileUploadPage';

const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function PaymentForm() {
  const [paymentType, setPaymentType] = React.useState('creditCard');
  const [expirationDate, setExpirationDate] = React.useState('');

  const handlePaymentTypeChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setPaymentType(event.target.value);
  };

  const handleExpirationDateChange = (event: { target: { value: string } }) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, '$1/');
    if (value.length <= 4) {
      setExpirationDate(formattedValue);
    }
  };

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      {paymentType === 'creditCard' && (
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
              boxShadow: '0px 4px 8px rgba(0, 0, 0,x 0.05)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5">Tải lên giấy phép lái xe</Typography>
              <Iconify icon="clarity:license-line" sx={{ color: 'text.secondary', fontSize: 20 }} />
            </Box>
            <FileUploadPage />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-name" required>
                  Họ và Tên
                </FormLabel>
                <OutlinedInput
                  id="card-name"
                  autoComplete="card-name"
                  placeholder="Lê Văn A"
                  required
                />
              </FormGrid>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-expiration" required>
                  Ngày cấp
                </FormLabel>
                <OutlinedInput
                  id="card-expiration"
                  autoComplete="card-expiration"
                  placeholder="DD/MM/YYYY"
                  required
                  value={expirationDate}
                  onChange={handleExpirationDateChange}
                />
              </FormGrid>
            </Box>
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
                    name: 'type',
                    id: 'uncontrolled-native',
                  }}
                >
                  <option value={'A1'}>A1</option>
                  <option value={'B1'}>B1</option>
                  <option value={'B2'}>B2</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </Box>
        </Box>
      )}
      {paymentType === 'bankTransfer' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Alert severity="warning" icon={<WarningRoundedIcon />}>
            Your order will be processed once we receive the funds.
          </Alert>
          <Typography variant="subtitle1" fontWeight="medium">
            Bank account
          </Typography>
          <Typography variant="body1" gutterBottom>
            Please transfer the payment to the bank account details shown below.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1" color="text.secondary">
              Bank:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              Mastercredit
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1" color="text.secondary">
              Account number:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              123456789
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1" color="text.secondary">
              Routing number:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              987654321
            </Typography>
          </Box>
        </Box>
      )}
    </Stack>
  );
}
