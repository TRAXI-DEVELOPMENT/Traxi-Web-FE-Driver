import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { paths } from 'src/routes/paths';

export const useAuthRedirect = (excludePaths: string[] = []) => {
  const router = useRouter();

  useEffect(() => {
    const userInfoString = localStorage.getItem('USER_INFO');
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

    if (!userInfo || !userInfo.id) {
      if (!excludePaths.includes(router.pathname)) {
        router.push(paths.demologin);
      }
    }
  }, [router, excludePaths]);
};
