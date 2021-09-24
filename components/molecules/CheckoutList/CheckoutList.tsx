import React, { memo } from 'react';
import type { ProductType } from 'types';
import { useCart } from 'context/CartContext';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import { CheckoutProduct } from 'components/atoms/CheckoutProduct/CheckoutProduct';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

type CheckoutListProps = {
  readonly cartItems: (ProductType & { quantity: number })[];
};

const useStyles = makeStyles((theme) => ({
  list: { margin: theme.spacing(4) },
  button: {
    marginLeft: theme.spacing(4),
  },
}));

export const CheckoutList = memo<CheckoutListProps>(({ cartItems }) => {
  const { getTotalCost, handleRemoveFromCart, handleChangeProductQuantity } = useCart();

  const classes = useStyles();

  const validPrice = getTotalCost() * 100;
  const key = 'test_token';
  const onToken = (token: Token) => console.log(token);

  return (
    <Grid container justifyContent="center" data-testid="checkout-list">
      {cartItems.length ? (
        <Grid container className={classes.list} item xs={8} justifyContent="center">
          <ul>
            {cartItems.map((cartItem) => {
              return (
                <CheckoutProduct
                  product={cartItem}
                  onRemoveItem={handleRemoveFromCart}
                  onChangeItemQuantity={handleChangeProductQuantity}
                  key={cartItem.id}
                />
              );
            })}
          </ul>
        </Grid>
      ) : (
        <Grid container className={classes.list} item justifyContent="center">
          Cart is empty
        </Grid>
      )}
      <Grid container justifyContent="center" item>
        <Typography variant="h4">${getTotalCost()}</Typography>
        <StripeCheckout
          name="Ecommerce"
          billingAddress
          shippingAddress
          description={`Total cost is  $${getTotalCost()}`}
          amount={validPrice}
          panelLabel="Pay now"
          token={onToken}
          stripeKey={key}
          alipay
          bitcoin
        >
          <Button
            size="large"
            fullWidth
            variant="contained"
            color="primary"
            disabled={getTotalCost() <= 0}
            data-testid="pay-now-btn"
            className={classes.button}
          >
            pay now
          </Button>
        </StripeCheckout>
      </Grid>
    </Grid>
  );
});

CheckoutList.displayName = 'CheckoutList';
