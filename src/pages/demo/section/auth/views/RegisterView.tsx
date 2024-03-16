// next
import NextLink from 'next/link';
// @mui
import { Link, Stack, Divider, Container, Typography, Unstable_Grid2 as Grid } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import Image from 'src/components/image';
//
import AuthRegisterForm from '../components/AuthRegisterForm';
import PaymentForm from 'src/pages/checkout/PaymentForm';
import Checkout from 'src/pages/checkout/Checkout';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const isMdUp = useResponsive('up', 'md');

  return (
    <Container
      sx={{
        overflow: 'hidden',
        pb: 10,
        minHeight: 1,
      }}
    >
      <Grid container spacing={5} justifyContent="center">
        <Grid xs={12}>
          <Checkout />
        </Grid>
      </Grid>
    </Container>
  );
}
