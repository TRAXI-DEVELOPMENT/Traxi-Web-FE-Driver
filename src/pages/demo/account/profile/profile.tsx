// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import DriverProfile from '../../section/views/DriverProfile';

// ----------------------------------------------------------------------

ProfilePage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ProfilePage() {
  return (
    <>
      <DriverProfile />
    </>
  );
}
