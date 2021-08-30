import { Layout } from 'components/organisms/Layout';
import { AuthChecker } from 'components/organisms/AuthChecker/AuthChecker';
import { Main } from 'components/organisms/Main/Main';
import { DatoCMSData } from 'lib/datocms';
import type { ProductType } from 'types';
import type { GetStaticProps } from 'next';

const Home = ({ results }: { results: ProductType[] }) => {
  return (
    <AuthChecker>
      <Layout>
        <Main results={results} />
      </Layout>
    </AuthChecker>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const data = await DatoCMSData.items.all();
    const images = await DatoCMSData.uploads.all();

    data.forEach((product: any, i: any) => {
      product.imgurl = images[i].url;
    });

    return { props: { results: data }, revalidate: 1 };
  } catch {
    return {
      notFound: true as const,
    };
  }
};
