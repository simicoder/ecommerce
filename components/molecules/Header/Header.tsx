import React, { useState, Dispatch, SetStateAction } from 'react';
import { auth } from 'lib/firebase';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { useCart } from 'context/CartContext';
import { CartList } from 'components/molecules/CartList/CartList';
import Drawer from '@material-ui/core/Drawer';
import { emphasize, withStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
import { ThemeSwitch } from 'components/atoms/ThemeSwitch/ThemeSwitch';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

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
  icon: {
    marginRight: theme.spacing(1),
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
  },
  homeButton: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    padding: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export const Header = () => {
  const classes = useStyles();

  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { cartItems, getTotalQuantity } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    auth.signOut();
    return router.push('/login');
  };

  const toggleDrawer =
    (isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsOpen(isOpen);
    };

  return (
    <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
      <Toolbar component="nav" className={classes.toolbar}>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          <Link href="/" replace>
            <StyledBreadcrumb
              className={classes.homeButton}
              component="button"
              label="Home"
              icon={<HomeIcon fontSize="large" />}
            />
          </Link>
        </Typography>
        <Button
          data-testid="cart-btn"
          className={classes.icon}
          onClick={() => setIsCartOpen((open) => !open)}
        >
          <ShoppingCartIcon fontSize="large" />
          {getTotalQuantity() > 99 ? '99' : getTotalQuantity()}
        </Button>

        <div className={classes.fullList}>
          <Drawer anchor="right" open={isCartOpen} onClose={toggleDrawer(false, setIsCartOpen)}>
            <CartList cartItems={cartItems} />
          </Drawer>
        </div>

        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MenuIcon fontSize="large" />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <div className={classes.margin}>
                <ThemeSwitch />
              </div>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Button
                className={classes.margin}
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleLogout}
              >
                logout
              </Button>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};
