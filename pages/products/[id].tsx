import type { ProductSType, ProductType } from 'types';
import { Layout } from 'components/organisms/Layout';
import { ProductView } from 'components/organisms/ProductView/ProductView';
import { GetStaticProps, GetStaticPaths } from 'next';
import { DatoCMSData } from 'lib/datocms';
import { AuthChecker } from 'components/organisms/AuthChecker/AuthChecker';
import { Header } from '../../components/molecules/Header/Header';

const Product = ({ product }: { product: ProductType }) => {
  return (
    <AuthChecker>
      <Layout>
        <Header />
        <ProductView product={product} />
      </Layout>
    </AuthChecker>
  );
};

export default Product;

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const product: ProductSType = await DatoCMSData.items.find(context.params!.id);
    const imgurl = await DatoCMSData.uploads.find(product.imgurl.en.uploadId);
    product.imgurl = imgurl.url;

    if (!product) {
      return {
        notFound: true as const,
      };
    }

    return { props: { product } };
  } catch {
    return {
      notFound: true as const,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const results: ProductType[] = await DatoCMSData.items.all();
    return {
      paths: results.map(({ id }) => ({
        params: { id },
      })),
      fallback: 'blocking' as const,
    };
  } catch (err) {
    throw err;
  }
};
