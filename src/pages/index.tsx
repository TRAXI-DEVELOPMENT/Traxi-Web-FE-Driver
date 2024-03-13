// next
import Head from 'next/head';
// layouts
import SimpleLayout from 'src/layouts/simple';
import TripListView from './demo/section/views/TripListView';
// sections

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => <SimpleLayout>{page}</SimpleLayout>;

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <TripListView />
    </>
  );
}
