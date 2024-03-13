// next
import Head from 'next/head';
// layouts
import CompactLayout from 'src/layouts/compact';
// sections


// ----------------------------------------------------------------------

Page404.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>
      <Head>
        <title>404 Page Not Found | ZONE UI</title>
      </Head>

      
    </>
  );
}
