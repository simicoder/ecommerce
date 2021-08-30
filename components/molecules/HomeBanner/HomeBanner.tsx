import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(25rem, 1fr))',
    placeItems: 'center',
    margin: '0 auto',
    marginTop: '1rem',
    marginBottom: '4rem',
    '@media all and (min-width: 1000px)': {
      minHeight: '65vh',
      marginTop: 0,
      maxWidth: '90rem',
      marginBottom: '2rem',
    },
    '@media all and (min-width: 360px)': {
      padding: '2rem 5rem',
    },
  },
  text: {
    position: 'relative',
    maxWidth: '40rem',
    color: 'white',

    '&::before': {
      position: 'absolute',
      width: '60%',
      height: '120%',
      content: '""',
      backgroundColor: 'rgb(140, 0, 255)',
      zIndex: -1,
      top: '-10%',
      left: '-5%',
      transform: 'rotateZ(60deg) translate(-5em, -7.5em)',
      animation: `$sheen 1s forwards`,
    },

    '&::after': {
      position: 'absolute',
      width: '70%',
      height: '120%',
      content: '""',
      backgroundColor: 'rgb(177, 82, 255)',
      zIndex: -1,
      top: '0%',
      left: '30%',
    },
  },
  '@keyframes sheen': {
    '100%': {
      transform: 'translate(0em, 0em)',
    },
  },
}));

export const HomeBanner = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <Typography variant="h2" align="center" className={classes.text}>
        Welcome in our ecommerce store!
      </Typography>
    </Grid>
  );
};
