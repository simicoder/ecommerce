import { auth } from 'lib/firebase';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { useCart } from 'context/CartContext';
import { CartList } from 'components/molecules/CartList/CartList';
import Drawer from '@material-ui/core/Drawer';
import { emphasize, withStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';

const StyledBreadcrumb = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.spacing(2),
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip) as typeof Chip;

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  cart: {
    marginRight: theme.spacing(3),
    fontSize: '2rem',
  },
  cartList: {
    position: 'absolute',
    top: '5.5rem',
    right: '-8rem',
    zIndex: 10,
  },
  fullList: {
    width: 'auto',
    backgroundColor: 'red',
  },
}));

export const Header = () => {
  const classes = useStyles();

  const router = useRouter();

  const handleLogout = () => {
    auth.signOut();
    return router.push('/login');
  };

  const { cartItems, getTotalQuantity } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleDrawer = (isCartOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsCartOpen(isCartOpen);
  };

  return (
    <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
      <Toolbar component="nav" className={classes.toolbar}>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          <Link href="/" replace>
            <StyledBreadcrumb
              component="button"
              label="Home"
              icon={<HomeIcon fontSize="large" />}
            />
          </Link>
        </Typography>

        <Button className={classes.cart} onClick={() => setIsCartOpen((open) => !open)}>
          <ShoppingCartIcon fontSize="large" />
          {getTotalQuantity() > 99 ? '99' : getTotalQuantity()}
        </Button>

        <div className={classes.fullList}>
          <Drawer anchor="right" open={isCartOpen} onClose={toggleDrawer(false)}>
            <CartList cartItems={cartItems} />
          </Drawer>
        </div>

        <Button type="submit" variant="contained" color="primary" onClick={handleLogout}>
          logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};
