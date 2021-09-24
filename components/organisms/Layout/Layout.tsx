import React, { memo } from 'react';
import { titleTemplate as defaultTitleTemplate } from 'pages/_app';
import { Loader } from 'components/organisms/Loader/Loader';
import { NextSeo } from 'next-seo';
import { useMainContext } from 'context/MainContext';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

type LayoutProps = {
  readonly children: React.ReactNode;
  readonly title?: string;
  readonly titleTemplate?: string;
};

export const Layout = memo<LayoutProps>(
  ({ children, title, titleTemplate = defaultTitleTemplate }) => {
    const { isDarkTheme } = useMainContext();

    const lightTheme = React.useMemo(
      () =>
        createTheme({
          palette: {
            type: 'light',
            info: { main: '#1976d2' },
          },
        }),
      [isDarkTheme],
    );

    const darkTheme = React.useMemo(
      () =>
        createTheme({
          palette: {
            type: 'dark',
            info: { main: '#64b5f6' },
          },
        }),
      [isDarkTheme],
    );

    const themeConfig = isDarkTheme ? darkTheme : lightTheme;

    return (
      <>
        <NextSeo
          title={title ? titleTemplate.replace('%s', title) : titleTemplate.slice(4)}
          openGraph={{
            title: title ? titleTemplate.replace('%s', title) : titleTemplate.slice(4),
          }}
        />

        <Loader />

        <ThemeProvider theme={themeConfig}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </>
    );
  },
);

Layout.displayName = 'Layout';
