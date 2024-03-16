import * as React from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';

export default function Review() {
  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Họ và tên" />
          <Typography variant="body2">Lê Văn A</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Nơi cư trú" />
          <Typography variant="body2">Vietnam</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Số điện thoại" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            0123456789
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack direction="column" divider={<Divider flexItem />} spacing={2} sx={{ my: 2 }}>
        <div>
          <List disablePadding>
            <Typography variant="h5" gutterBottom>
              Giấy phép lái xe
            </Typography>
            <Grid item xs={12}>
              <ListItem sx={{ py: 1, px: 0 }}>
                <Iconify
                  icon="fa:drivers-license-o"
                  width={24}
                  height={24}
                  style={{ verticalAlign: 'middle' }}
                />
                <ListItemText primary="Họ và tên" />
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Lê Văn A
                </Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <Iconify
                  icon="mingcute:award-line"
                  width={24}
                  height={24}
                  style={{ verticalAlign: 'middle' }}
                />
                <ListItemText primary="Bằng lái" />
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Giấy phép lái xe
                </Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <Iconify
                  icon="ant-design:car-twotone"
                  width={24}
                  height={24}
                  style={{ verticalAlign: 'middle' }}
                />
                <ListItemText primary="Loại" />
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  B2
                </Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <Iconify
                  icon="solar:calendar-broken"
                  width={24}
                  height={24}
                  style={{ verticalAlign: 'middle' }}
                />
                <ListItemText primary="Ngày cấp" />
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  03/16/2024
                </Typography>
              </ListItem>
            </Grid>
          </List>
        </div>
      </Stack>
    </Stack>
  );
}
