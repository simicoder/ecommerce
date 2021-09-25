import { render, screen } from '@testing-library/react';
import React from 'react';
import { CheckoutList } from './CheckoutList';

test('when cart is empty information should be displayed', () => {
  render(<CheckoutList cartItems={[]} />);
  expect(screen.getByText(/Cart is empty/i)).toBeInTheDocument();
});

test('when cart is not empty items should be displayed', () => {
  const fakeCartItems = [
    {
      id: '1',
      name: 'product',
      description: 'product',
      price: 110,
      category: 'trousers',
      imgurl: '/product.jpg',
      quantity: 3,
    },
    {
      id: '2',
      name: 'product',
      description: 'product',
      price: 120,
      category: 'tshirt',
      imgurl: '/product.jpg',
      quantity: 2,
    },
  ];

  render(<CheckoutList cartItems={fakeCartItems} />);
  expect(screen.queryByText(/Cart is empty/i)).not.toBeInTheDocument();
  expect(screen.getAllByTestId('checkout-product')).toHaveLength(2);
});
