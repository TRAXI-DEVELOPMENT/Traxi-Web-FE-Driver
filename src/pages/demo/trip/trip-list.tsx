// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// components

// sections
import TripListView from '../section/views/TripListView';
import TripComponent from 'src/components/TripComponent';

// ----------------------------------------------------------------------

ElearningCoursesPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ElearningCoursesPage() {
  return (
    <>
      <TripListView />
      {/* <TripComponent /> */}
    </>
  );
}
