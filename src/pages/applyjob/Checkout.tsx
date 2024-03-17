import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
import { createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

// Đặt các import từ contexts và api trước các import của component
import { useCheckout } from 'src/contexts/CheckoutContext';
import { applyForJob, postDriverDegree } from 'src/api/Driver/ApplyJob';

import { paths } from 'src/routes/paths';

// Sau đó là các import của component
import { formatDateDegree } from 'src/utils/formatTime';
import DriverForm from './DriverForm';
import DegreeForm from './DegreeForm';
import Review from './Review';
import ToggleColorMode from './ToggleColorMode';

const steps = ['Thông tin cá nhân', 'Tải lên giấy tờ', 'Xác nhận thông tin'];

const logoStyle = {
  width: '140px',
  height: '56px',
  marginLeft: '-4px',
  marginRight: '-8px',
};

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <DriverForm />;
    case 1:
      return <DegreeForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const [activeStep, setActiveStep] = React.useState(0);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <CssBaseline />
      <Grid
        container
        sx={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '30px',
        }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '100%',
            width: '100%',
            backgroundColor: { xs: 'transparent', sm: 'background.default' },
            pt: { xs: 2, sm: 4 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: { sm: 'space-between', md: 'flex-end' },
              alignItems: 'center',
              width: '100%',
              maxWidth: { sm: '100%', md: 600 },
            }}
          >
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexGrow: 1,
                height: 150,
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              <Stepper
                id="desktop-stepper"
                activeStep={activeStep}
                sx={{
                  width: '100%',
                  height: 40,
                }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{
                      ':first-child': { pl: 0 },
                      ':last-child': { pr: 0 },
                    }}
                    key={label}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              maxWidth: { sm: '100%', md: 600 },
              maxHeight: '720px',
              gap: { xs: 5, md: 'none' },
            }}
          >
            <Stepper
              id="mobile-stepper"
              activeStep={activeStep}
              alternativeLabel
              sx={{ display: { sm: 'flex', md: 'none' } }}
            >
              {steps.map((label) => (
                <Step
                  sx={{
                    ':first-child': { pl: 0 },
                    ':last-child': { pr: 0 },
                    '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                  }}
                  key={label}
                >
                  <StepLabel sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Stack spacing={2} useFlexGap>
                <Typography variant="h1">
                  <Iconify icon="clarity:license-outline-alerted" />
                </Typography>
                <ApplyJob />
                <Typography variant="h5">Hồ sơ của bạn đã được gửi đi</Typography>
                <Typography variant="body1" color="text.secondary">
                  Hãy chờ phản hồi của TraXi thời gian làm việc tối đa 72 giờ <br />
                  (Không bao gồm T7/CN và ngày lễ)
                </Typography>
                <Button
                  variant="contained"
                  component={NextLink}
                  href={paths.demologin}
                  sx={{
                    alignSelf: 'start',
                    width: { xs: '100%', sm: 'auto' },
                  }}
                >
                  Quay trở về trang đăng nhập
                </Button>
              </Stack>
            ) : (
              <>
                {getStepContent(activeStep)}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column-reverse', sm: 'row' },
                    justifyContent: activeStep !== 0 ? 'space-between' : 'flex-end',
                    alignItems: 'end',
                    flexGrow: 1,
                    gap: 1,
                    pb: { xs: 12, sm: 0 },
                    mt: { xs: 2, sm: 0 },
                    mb: '60px',
                  }}
                >
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="text"
                      sx={{
                        display: { xs: 'none', sm: 'flex' },
                      }}
                    >
                      Quay lại
                    </Button>
                  )}
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="outlined"
                      fullWidth
                      sx={{
                        display: { xs: 'flex', sm: 'none' },
                      }}
                    >
                      Quay lại
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    endIcon={<ChevronRightRoundedIcon />}
                    onClick={handleNext}
                    sx={{
                      width: { xs: '100%', sm: 'fit-content' },
                    }}
                  >
                    {activeStep === steps.length - 1 ? 'Xác nhận thông tin' : 'Tiếp tục'}
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

function ApplyJob() {
  const { checkoutData } = useCheckout();
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const responseFromAPI = localStorage.getItem('fileUploadResponse');
    if (responseFromAPI) {
      const responseData = JSON.parse(responseFromAPI);
      setImageUrl(responseData.link_img);
    }
  }, []);

  useEffect(() => {
    const applyJob = async () => {
      if (!imageUrl) return;

      try {
        const responseFromAPI = localStorage.getItem('fileUploadResponse');
        if (responseFromAPI) {
          const responseData = JSON.parse(responseFromAPI);
          setImageUrl(responseData.link_img);
        }

        const applyResponse = await applyForJob({
          Fullname: checkoutData.Fullname,
          Phone: checkoutData.Phone,
          Address: checkoutData.Address,
          Password: checkoutData.Password,
        });
        const date = formatDateDegree(checkoutData.expirationDate || '');
        const degreeResponse = await postDriverDegree({
          DriverId: applyResponse.DriverId,
          DateDegree: date ?? 'Giá trị mặc định',
          DegreeName: 'Giấy phép lái xe',
          Type: checkoutData.licenseType ?? 'A1',
          ImageUrl: imageUrl,
        });
        // localStorage.removeItem('fileUploadResponse');
        console.log('Application response:', applyResponse, degreeResponse);
      } catch (error) {
        console.error('Error applying for job:', error);
      }
    };

    applyJob();
  }, [imageUrl, checkoutData]);

  return <></>;
}
