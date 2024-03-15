// next
import Head from 'next/head';
// layouts
import SimpleLayout from 'src/layouts/simple';
// sections
import RegisterView from '../section/auth/views/RegisterView';

// ----------------------------------------------------------------------

RegisterPage.getLayout = (page: React.ReactElement) => <SimpleLayout>{page}</SimpleLayout>;

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <RegisterView />
    </>
  );
}
