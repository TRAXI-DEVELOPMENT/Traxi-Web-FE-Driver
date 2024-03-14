// next
import Head from 'next/head';
// layouts
import SimpleLayout from 'src/layouts/simple';

// sections
import DemoLoginView from '../section/auth/views/LoginView';
// ----------------------------------------------------------------------

LoginPage.getLayout = (page: React.ReactElement) => <SimpleLayout>{page}</SimpleLayout>;

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <DemoLoginView />
    </>
  );
}
