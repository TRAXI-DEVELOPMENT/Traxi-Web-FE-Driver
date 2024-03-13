// next
import Head from 'next/head';
// layouts
import CompactLayout from 'src/layouts/compact';

// ----------------------------------------------------------------------

Page500.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function Page500() {
  return (
    <>
      <Head>
        <title>500 Internal Server Error | ZONE UI</title>
      </Head>


    </>
  );
}
