// layouts
import MainLayout from 'src/layouts/main';
// sections
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { paths } from 'src/routes/paths';
// import FileUploadPage from 'src/components/FileUploadPage';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push(paths.demotriplist);
  }, [router]);

  return <></>;
}
