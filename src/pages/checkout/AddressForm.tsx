import * as React from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm() {
  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="Fullname" required>
          Họ và tên
        </FormLabel>
        <OutlinedInput id="Fullname" type="text" placeholder="Lê Văn A " required />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="phone">Số điện thoại</FormLabel>
        <OutlinedInput id="phone" type="tel" placeholder="0123456789" required />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="address" required>
          Địa chỉ
        </FormLabel>
        <OutlinedInput id="address" type="text" placeholder="Nơi cư trú" required />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="password" required>
          Mật khẩu
        </FormLabel>
        <OutlinedInput id="password" type="password" placeholder="Nhập mật khẩu" required />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="confirmPassword" required>
          Xác nhận mật khẩu
        </FormLabel>
        <OutlinedInput id="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" required />
      </FormGrid>
    </Grid>
  );
}