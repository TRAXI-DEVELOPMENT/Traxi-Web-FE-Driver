import * as React from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { useCheckout } from 'src/contexts/CheckoutContext';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function DriverForm() {
  const { checkoutData, setCheckoutData } = useCheckout();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckoutData({ ...checkoutData, [e.target.name]: e.target.value });
  };

  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="Fullname" required>
          Họ và tên
        </FormLabel>
        <OutlinedInput
          id="Fullname"
          name="Fullname"
          type="text"
          placeholder="Lê Văn A"
          required
          value={checkoutData.Fullname}
          onChange={handleChange}
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="Phone">Số điện thoại</FormLabel>
        <OutlinedInput
          id="Phone"
          name="Phone"
          type="tel"
          placeholder="0123456789"
          required
          value={checkoutData.Phone}
          onChange={handleChange}
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="Address" required>
          Địa chỉ
        </FormLabel>
        <OutlinedInput
          id="Address"
          name="Address"
          type="text"
          placeholder="Nơi cư trú"
          required
          value={checkoutData.Address}
          onChange={handleChange}
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="s" required>
          Mật khẩu
        </FormLabel>
        <OutlinedInput
          id="Password"
          name="Password"
          type="Password"
          placeholder="Nhập mật khẩu"
          required
          value={checkoutData.Password}
          onChange={handleChange}
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="confirmPassword" required>
          Xác nhận mật khẩu
        </FormLabel>
        <OutlinedInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Nhập lại mật khẩu"
          required
          value={checkoutData.confirmPassword}
          onChange={handleChange}
        />
      </FormGrid>
    </Grid>
  );
}
