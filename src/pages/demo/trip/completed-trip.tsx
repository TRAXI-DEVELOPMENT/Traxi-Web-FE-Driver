// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections

import { useRouter } from 'next/router';
import TripCompletedView from '../section/views/TripCompletedView';

// ----------------------------------------------------------------------

TripCompletedPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function TripCompletedPage() {
  const router = useRouter();
  const { tripId } = router.query;
  return (
    <>
      <TripCompletedView tripId={tripId as string} />
    </>
  );
}
