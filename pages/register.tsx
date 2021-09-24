import { RegisterForm } from 'components/organisms/RegisterForm/RegisterForm';
import { Layout } from 'components/organisms/Layout/Layout';
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

const Register = () => {
  const classes = useStyles();

  return (
    <Layout title="Register">
      <main className={classes.main}>
        <RegisterForm />
      </main>
    </Layout>
  );
};

export default Register;
