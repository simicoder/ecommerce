import { memo } from 'react';
import type { ProductType } from 'types';
import Image from 'next/image';
import Link from 'next/link';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

type CheckoutProductProps = {
  readonly product: ProductType & { quantity: number };
  readonly onChangeItemQuantity: (
    product: ProductType & { quantity: number },
    quantity: number,
  ) => void;
  readonly onRemoveItem: (product: ProductType & { quantity: number }) => void;
};

const useStyles = makeStyles((theme) => ({
  input: {
    width: theme.spacing(4),
  },
}));

export const CheckoutProduct = memo<CheckoutProductProps>(
  ({ product, onChangeItemQuantity, onRemoveItem }) => {
    const classes = useStyles();

    return (
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        data-testid="checkout-product"
      >
        <Grid xs={4} container item direction="row" alignItems="center" justifyContent="center">
          <Image src={product.imgurl} alt={product.name} width="200" height="200" />
        </Grid>
        <Grid xs={2} container item direction="row" alignItems="center" justifyContent="center">
          <Link href={`/products/${product.id}`}>
            <Typography variant="h4">{product.name}</Typography>
          </Link>
        </Grid>
        <Grid xs={2} container item direction="row" alignItems="center" justifyContent="center">
          <Input
            className={classes.input}
            value={product.quantity}
            type="number"
            onChange={(e) => onChangeItemQuantity(product, Number(e.target.value))}
          />
        </Grid>
        <Grid xs={2} container item direction="row" alignItems="center" justifyContent="center">
          <Typography variant="h5">${product.quantity * product.price}</Typography>
        </Grid>
        <Grid xs={2} container item direction="row" alignItems="center" justifyContent="center">
          <Button>
            <CloseIcon onClick={() => onRemoveItem(product)} />
          </Button>
        </Grid>
      </Grid>
    );
  },
);

CheckoutProduct.displayName = 'CheckoutProduct';
