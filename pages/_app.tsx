import React from 'react';
import '../styles/globals.scss';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { MainProvider } from 'context/MainContext';
import { ProductProvider } from 'context/ProductContext';
import { CartProvider } from 'context/CartContext';
import { SnackbarProvider } from 'notistack';

const meta = {
  title: 'Ecommerce',
  description: 'ecommerce app.',
};

export const titleTemplate = `%s | ${meta.title}`;

function MyApp({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();

  return (
    <>
      <DefaultSeo
        title={meta.title}
        description={meta.description}
        openGraph={{
          type: 'website',
          title: meta.title,
          url: `https://${process.env.NEXT_PUBLIC_URL!}${asPath}`,
          description: meta.description,
          images: [
            {
              url: `https://${process.env.NEXT_PUBLIC_URL!}/logo_lg.png`,
              width: 1000,
              height: 750,
            },
          ],
          site_name: meta.title,
        }}
      />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=yes, initial-scale=1.0, viewport-fit=cover"
        />

        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/android-192x192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png" sizes="180x180" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <MainProvider>
        <ProductProvider>
          <CartProvider>
            <SnackbarProvider maxSnack={3}>
              <Component {...pageProps} />
            </SnackbarProvider>
          </CartProvider>
        </ProductProvider>
      </MainProvider>
    </>
  );
}

export default MyApp;
