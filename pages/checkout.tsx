import { Layout } from 'components/organisms/Layout/Layout';
import { CheckoutList } from 'components/molecules/CheckoutList/CheckoutList';
import { AuthChecker } from 'components/organisms/AuthChecker/AuthChecker';
import { useCart } from 'context/CartContext';
import { Header } from 'components/molecules/Header/Header';

const Checkout = () => {
  const { cartItems } = useCart();

  return (
    <AuthChecker>
      <Layout>
        <Header />
        <CheckoutList cartItems={cartItems} />
      </Layout>
    </AuthChecker>
  );
};

export default Checkout;
