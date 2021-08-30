import { useForm } from 'react-hook-form';
import { inputValidation } from 'lib/utils/consts';
import { UserData } from 'types';
import Link from 'next/link';
import { auth } from 'lib/firebase';
import { useMainContext } from 'context/MainContext';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.info.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const classes = useStyles();

  const { setLoading, setModal } = useMainContext();

  const handleRegister = async ({ email, password }: UserData) => {
    setLoading(true);
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      setModal({
        isOpen: true,
        type: 'success',
        message: 'Account was created. Log in!',
      });
      reset();
    } catch (e) {
      setModal({ isOpen: true, type: 'error', message: (e as Error)?.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VpnKeyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(handleRegister)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register('email', inputValidation.email)}
          />
          <FormHelperText error={true}>{errors?.email?.message}</FormHelperText>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            {...register('password', inputValidation.password)}
          />
          <FormHelperText error={true}>{errors?.password?.message}</FormHelperText>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login">{'Already have an account? Sign In'}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
