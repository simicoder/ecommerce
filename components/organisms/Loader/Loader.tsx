import { useMainContext } from 'context/MainContext';
import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      display: 'grid',
      placeItems: 'center',
    },
  }),
);

export const Loader = () => {
  const classes = useStyles();
  const { loading } = useMainContext();

  if (!loading) {
    return null;
  }

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};
