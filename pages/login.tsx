import { LoginForm } from 'components/organisms/LoginForm/LoginForm';
import { Layout } from 'components/organisms/Layout';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexFlow: 'column wrap',
  },
}));

const Login = () => {
  const classes = useStyles();

  return (
    <Layout title="Login">
      <main className={classes.main}>
        <LoginForm />
      </main>
    </Layout>
  );
};

export default Login;
