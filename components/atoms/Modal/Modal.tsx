import React from 'react';
import { useMainContext } from 'context/MainContext';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import UiModal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #b20aff',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

export const Modal = () => {
  const {
    modal,
    modal: { isOpen, type, message },
    setModal,
  } = useMainContext();

  const handleCloseModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  if (!isOpen) {
    return null;
  }

  const classes = useStyles();

  const handleOpen = () => {
    setModal({ ...modal, isOpen: false });
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        react-transition-group
      </button>
      <UiModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{type === 'error' ? 'Error' : 'Info'}</h2>
            <p id="transition-modal-description">{message}</p>
          </div>
        </Fade>
      </UiModal>
    </div>
  );
};
