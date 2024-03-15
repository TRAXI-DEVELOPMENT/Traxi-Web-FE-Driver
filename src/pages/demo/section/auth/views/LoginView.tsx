// next
import NextLink from 'next/link';
// @mui
import { Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// routes
import { paths } from 'src/routes/paths'; // Đảm bảo rằng nhập khẩu này xuất hiện trước
// components
import AuthLoginForm from '../components/AuthLoginForm'; // Đưa nhập khẩu này xuống sau các nhập khẩu khác

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  // ...bgGradient({
  //   color: alpha(theme.palette.background.default, 0.9),
  //   imgUrl: '/assets/background/overlay_1.jpg',
  // }),
  display: 'flex',
  minHeight: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 2),
}));

// ----------------------------------------------------------------------

export default function DemoLoginView() {
  return (
    <StyledRoot>
      <Stack
        spacing={4}
        sx={{
          p: 4,
          width: 1,
          mx: 'auto',
          flexShrink: 0,
          maxWidth: 400,
          borderRadius: 2,
          bgcolor: 'background.default',
          textAlign: { xs: 'center', md: 'left' },
          boxShadow: (theme) => theme.customShadows.z24,
        }}
      >
        <div>
          <Typography variant="h3" paragraph>
            Đăng nhập
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`Bạn chưa chưa có tài khoản? `}
            <Link
              component={NextLink}
              href={paths.demoregister}
              variant="subtitle2"
              color="primary"
            >
              Ứng tuyển ngay
            </Link>
          </Typography>
        </div>

        <AuthLoginForm />
      </Stack>
    </StyledRoot>
  );
}
