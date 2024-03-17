import { useState, useEffect } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import {
  Link,
  Drawer,
  IconButton,
  Button,
  ListItemIcon,
  Stack,
  ListItemButton,
  ListItemText,
} from '@mui/material';
// config
import { NAV } from 'src/config-global';
// components
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
//
import { NavProps } from '../types';
import NavList from './NavList';
import { paths } from 'src/routes/paths';
import useAuth from 'src/hooks/useAuth';
import useActiveLink from 'src/hooks/useActiveLink';

export default function NavMobile() {
  const { pathname } = useRouter();
  const { logout } = useAuth();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    router.push(paths.demoaccount);
  };

  const navigations = [
    {
      title: 'Thông tin cá nhân',
      path: paths.demoaccount,
      icon: <Iconify icon="iconamoon:profile-duotone" />,
    },
    {
      title: 'Đăng xuất',
      path: '',
      icon: <Iconify icon="tabler:logout-2" />,
      onClick: logout,
    },
  ];

  return (
    <>
      <IconButton onClick={handleOpen} sx={{ ml: 1, color: 'inherit' }}>
        <Iconify icon="carbon:menu" />
      </IconButton>

      <Drawer
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            pb: 5,
            width: NAV.W_BASE,
          },
        }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <Stack sx={{ my: 1, px: 2 }}>
            {navigations.map((item) => (
              <MenuItem key={item.title} item={item} />
            ))}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}

type MenuItemProps = {
  item: {
    title: string;
    path: string;
    icon: React.ReactNode;
    onClick?: () => void;
  };
};

function MenuItem({ item }: MenuItemProps) {
  const router = useRouter();
  const { active } = useActiveLink(item.path);

  const handleClick = () => {
    if (item.onClick) {
      item.onClick();
    } else {
      router.push(item.path);
    }
  };

  return (
    <Link
      component={NextLink}
      key={item.title}
      href={item.path}
      color={active ? 'primary' : 'inherit'}
      underline="none"
    >
      <ListItemButton
        sx={{
          px: 1,
          height: 44,
          borderRadius: 1,
        }}
        onClick={handleClick}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText
          primary={item.title}
          primaryTypographyProps={{
            typography: 'body2',
            ...(active && {
              typography: 'subtitle2',
            }),
          }}
        />
      </ListItemButton>
    </Link>
  );
}
