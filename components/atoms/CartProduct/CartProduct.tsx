import { memo } from 'react';
import type { ProductType } from 'types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

type CartProductProps = {
  readonly product: ProductType & { quantity: number };
  readonly onRemoveItem: (product: ProductType & { quantity: number }) => void;
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
}));

export const CartProduct = memo<CartProductProps>(({ product, onRemoveItem }) => {
  const classes = useStyles();

  return (
    <li>
      <Grid className={classes.root} container data-testid="cart-product">
        <Grid item>
          <Typography variant="h6">{product.name}</Typography>
          <Typography>
            {product.quantity} x ${product.price}
          </Typography>
        </Grid>
        <Grid item>
          <Button onClick={() => onRemoveItem(product)}>
            <CloseIcon />
          </Button>
        </Grid>
      </Grid>
    </li>
  );
});

CartProduct.displayName = 'CartProduct';
