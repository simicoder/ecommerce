import { ProductTile } from 'components/atoms/ProductTile/ProductTile';
import type { ProductType } from 'types';
import { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

type ProductsListProps = {
  readonly products: ProductType[];
};

const useStyles = makeStyles((theme) => ({
  emptyResult: {
    margin: theme.spacing(4),
  },
}));

export const ProductsList = memo<ProductsListProps>(({ products }) => {
  const classes = useStyles();

  return (
    <Grid container justifyContent="center">
      {products.length ? (
        products.map((product) => {
          return <ProductTile product={product} key={product.id} />;
        })
      ) : (
        <Typography className={classes.emptyResult} variant="h4">
          No products matches your search
        </Typography>
      )}
    </Grid>
  );
});

ProductsList.displayName = 'ProductsList';
