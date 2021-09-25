import { render, screen } from '@testing-library/react';
import React from 'react';
import { ProductsList } from './ProductsList';

test('when products list is empty properly message should be displayed', () => {
  render(<ProductsList products={[]} />);
  expect(screen.getByText(/no products matches your search/i)).toBeInTheDocument();
});

test('when products list is not empty items should be displayed', () => {
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

  render(<ProductsList products={fakeCartItems} />);
  expect(screen.queryByText(/cart is empty/i)).not.toBeInTheDocument();
  expect(screen.getAllByTestId('product-tile')).toHaveLength(2);
});
