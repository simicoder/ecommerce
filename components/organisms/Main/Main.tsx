import { Header } from 'components/molecules/Header/Header';
import { HomeBanner } from 'components/molecules/HomeBanner/HomeBanner';
import { memo, useEffect } from 'react';
import type { ProductType } from 'types';
import { ProductsList } from 'components/molecules/ProductsList/ProductsList';
import { Preferences } from 'components/molecules/Preferences/Preferences';
import { useProduct } from 'context/ProductContext';
import Grid from '@material-ui/core/Grid';

type MainProps = {
  readonly results: ProductType[];
};

export const Main = memo<MainProps>(({ results }) => {
  const { setProducts, setFilteredProducts, filteredProducts } = useProduct();

  useEffect(() => {
    setProducts(results);
    setFilteredProducts(results);
  }, []);

  return (
    <Grid>
      <Header />
      <Grid>
        <main>
          <HomeBanner />
          <Preferences />
          <ProductsList products={filteredProducts} />
        </main>
      </Grid>
    </Grid>
  );
});

Main.displayName = 'Main';
