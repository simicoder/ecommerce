import { memo } from 'react';
import { titleTemplate as defaultTitleTemplate } from 'pages/_app';
import { Loader } from 'components/organisms/Loader/Loader';
import { NextSeo } from 'next-seo';

type LayoutProps = {
  readonly children: React.ReactNode;
  readonly title?: string;
  readonly titleTemplate?: string;
};

export const Layout = memo<LayoutProps>(
  ({ children, title, titleTemplate = defaultTitleTemplate }) => {
    return (
      <>
        <NextSeo
          title={title ? titleTemplate.replace('%s', title) : titleTemplate.slice(4)}
          openGraph={{
            title: title ? titleTemplate.replace('%s', title) : titleTemplate.slice(4),
          }}
        />

        <Loader />
        {children}
      </>
    );
  },
);

Layout.displayName = 'Layout';
