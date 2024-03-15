import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { paths } from 'src/routes/paths';

// Cập nhật hook để nhận một mảng các đường dẫn loại trừ
const useRequireAuth = (excludePaths: string[] = []) => {
  const router = useRouter();

  useEffect(() => {
    // Kiểm tra xem đường dẫn hiện tại có nằm trong mảng loại trừ không
    if (!excludePaths.includes(router.pathname)) {
      const userInfoString = localStorage.getItem('USER_INFO');
      const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

      // Nếu không tìm thấy thông tin người dùng, chuyển hướng đến trang đăng nhập
      if (!userInfo || !userInfo.id) {
        router.push(paths.demologin);
      }
    }
  }, [router, excludePaths]); // Thêm excludePaths vào mảng phụ thuộc
};

export default useRequireAuth;
