import React, { memo } from 'react';
import type { ProductType } from 'types';
import { SizeSelect } from 'components/molecules/SizeSelect/SizeSelect';
import { useProduct } from 'context/ProductContext';
import { useCart } from 'context/CartContext';
import { useMainContext } from 'context/MainContext';
import Button from '@material-ui/core/Button';
import { ProductSizes } from 'lib/utils/consts';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Image from 'next/image';

type ProductDescriptionProps = { readonly product: ProductType };

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      [theme.breakpoints.up('md')]: {
        maxWidth: '90%',
      },
    },
    info: { margin: theme.spacing(1, 0, 2) },
    buy: {
      marginTop: theme.spacing(2),
      maxHeight: '30px',
    },
  }),
);

export const ProductView = memo<ProductDescriptionProps>(({ product }) => {
  const { setActiveProductSize } = useProduct();

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveProductSize(e.target.value as typeof ProductSizes[number]['label']);
  };

  const { handleAddToCart } = useCart();
  const { setModal } = useMainContext();

  const handleAddProductToCart = () => {
    handleAddToCart(product);
    setModal({
      isOpen: true,
      type: 'success',
      message: 'Successfully added to cart!',
    });
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid xs={12} md={6} item>
            <Image
              width="100%"
              height="100%"
              layout="responsive"
              alt="product image"
              src={product.imgurl}
            />
          </Grid>
          <Grid className={classes.info} item xs md={6} container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h4">
                  {product.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {product.category}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {product.description}
                  {product.category}
                </Typography>
              </Grid>

              <Grid item>
                <SizeSelect onChange={handleColorChange} />
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">${product.price}</Typography>
            </Grid>
            <Grid container direction="column" justifyContent="flex-end">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleAddProductToCart}
                className={classes.buy}
              >
                Add to cart
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
});

ProductView.displayName = 'ProductView';
