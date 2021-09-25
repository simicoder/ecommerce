import { render, screen } from '@testing-library/react';
import React from 'react';
import { CartList } from './CartList';

test('when cart is empty information should be displayed', () => {
  render(<CartList cartItems={[]} />);
  expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
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

  render(<CartList cartItems={fakeCartItems} />);
  expect(screen.queryByText(/cart is empty/i)).not.toBeInTheDocument();
  expect(screen.getAllByTestId('cart-product')).toHaveLength(2);
});
