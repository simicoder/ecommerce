import React, { memo } from 'react';
import type { ProductType } from 'types';
import Image from 'next/image';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

type ProductProps = {
  readonly product: ProductType;
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4),
    position: 'relative',
  },
  flashCard: {
    position: 'absolute',
    bottom: '12%',
    right: 0,
    backgroundColor: 'white',
    padding: '1rem 1.5rem',
    fontSize: '1.6rem',
  },
}));

export const ProductTile = memo<ProductProps>(({ product }) => {
  const classes = useStyles();

  return (
    <Link href={`/products/${product.id}`} passHref>
      <Grid className={classes.root} item xs={12} sm={6} md={3} data-testid="product-tile">
        <Image
          src={product.imgurl}
          width="100%"
          height="100%"
          layout="responsive"
          alt={product.name}
        />
        <Grid item className={classes.flashCard}>
          <Typography variant="h5">{product.name}</Typography>
          <Typography>${product.price}</Typography>
        </Grid>
      </Grid>
    </Link>
  );
});

ProductTile.displayName = 'ProductTile';
