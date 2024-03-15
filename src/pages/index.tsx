// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import TripListView from './demo/section/views/TripListView';
// import FileUploadPage from 'src/components/FileUploadPage';

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <TripListView />
    </>
  );
}
