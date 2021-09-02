import type { ProductType } from 'types';
import { memo } from 'react';
import Link from 'next/link';
import { useCart } from 'context/CartContext';

import { CartProduct } from 'components/atoms/CartProduct/CartProduct';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

type CartListProps = {
  readonly cartItems: (ProductType & {
    quantity: number;
  })[];
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4),
  },
}));

export const CartList = memo<CartListProps>(({ cartItems }) => {
  const { handleRemoveFromCart } = useCart();
  const classes = useStyles();

  return (
    <Grid className={classes.root} container id="cart-list">
      <Grid item>
        {cartItems.length ? (
          <>
            {cartItems.map((cartItem) => {
              return (
                <CartProduct
                  onRemoveItem={handleRemoveFromCart}
                  product={cartItem}
                  key={cartItem.id}
                />
              );
            })}
            <Link href="/checkout">
              <Button type="submit" fullWidth variant="contained" color="primary">
                Checkout
              </Button>
            </Link>
          </>
        ) : (
          <Typography variant="h4">Cart is empty</Typography>
        )}
      </Grid>
    </Grid>
  );
});

CartList.displayName = 'CartList';
