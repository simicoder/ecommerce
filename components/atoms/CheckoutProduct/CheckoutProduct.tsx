import { memo } from 'react';
import type { ProductType } from 'types';
import Image from 'next/image';
import Link from '@material-ui/core/Link';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

type CheckoutProductProps = {
  readonly product: ProductType & { quantity: number };
  readonly onChangeItemQuantity: (
    product: ProductType & { quantity: number },
    quantity: number,
  ) => void;
  readonly onRemoveItem: (product: ProductType & { quantity: number }) => void;
};

export const CheckoutProduct = memo<CheckoutProductProps>(
  ({ product, onChangeItemQuantity, onRemoveItem }) => {
    return (
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
        data-testid="checkout-product"
      >
        <Grid xs={3} container item direction="column" alignItems="center" justifyContent="center">
          <Image src={product.imgurl} alt={product.name} width="100%" height="100%" />
        </Grid>
        <Grid xs={4} container item direction="column" alignItems="center" justifyContent="center">
          <Link color="initial" underline="none" href={`/products/${product.id}`}>
            {product.name}
          </Link>
        </Grid>
        <Grid xs={2} container item direction="column" alignItems="center" justifyContent="center">
          <Input
            fullWidth
            value={product.quantity}
            type="number"
            onChange={(e) => onChangeItemQuantity(product, Number(e.target.value))}
          />
        </Grid>
        <Grid xs={2} container item direction="column" alignItems="center" justifyContent="center">
          <Typography variant="h5">${product.quantity * product.price}</Typography>
        </Grid>
        <Grid xs={1} container item direction="row" alignItems="center" justifyContent="center">
          <Button>
            <CloseIcon onClick={() => onRemoveItem(product)} />
          </Button>
        </Grid>
      </Grid>
    );
  },
);

CheckoutProduct.displayName = 'CheckoutProduct';
