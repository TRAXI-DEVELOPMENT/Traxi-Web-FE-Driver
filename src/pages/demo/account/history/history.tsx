// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// components

// sections
import AccountView from '../../section/views/AccountView';

// ----------------------------------------------------------------------

HistoryPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function HistoryPage() {
  return (
    <>
      <AccountView />
    </>
  );
}
