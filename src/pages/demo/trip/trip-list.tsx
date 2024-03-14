// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// components

import TripListView from '../section/views/TripListView';

// ----------------------------------------------------------------------

TripListPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function TripListPage() {
  return (
    <>
      <TripListView />
      {/* <TripComponent /> */}
    </>
  );
}
