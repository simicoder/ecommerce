import { useForm } from 'react-hook-form';
import { inputValidation } from 'lib/utils/consts';
import { UserData } from 'types';
import Link from '@material-ui/core/Link';
import { auth } from 'lib/firebase';
import { useMainContext } from 'context/MainContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
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
import { useSnackbar } from 'notistack';
import { ThemeSwitch } from '../../atoms/ThemeSwitch/ThemeSwitch';

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
  link: { color: theme.palette.info.main },
}));

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { setLoading } = useMainContext();

  useEffect(() => {
    auth.signOut();
  }, []);

  const handleLogin = async ({ email, password }: UserData) => {
    setLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      router.push('/');
    } catch (e) {
      enqueueSnackbar((e as Error)?.message);
    } finally {
      setLoading(false);
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <ThemeSwitch />
        <Avatar className={classes.avatar}>
          <VpnKeyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(handleLogin)}>
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
            autoComplete="current-password"
            {...register('password', inputValidation.password)}
          />
          <FormHelperText error={true}>{errors?.password?.message}</FormHelperText>
          <Button
            data-testid="submit"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link className={classes.link} href="/register">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
