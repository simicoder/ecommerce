import type { ProductType } from 'types';

export const addProductToCart = (
  cartItems: (ProductType & { quantity: number })[],
  productToAdd: ProductType,
) => {
  if (cartItems.reduce((acc, { quantity }) => acc + quantity, 0) === 99) {
    return cartItems;
  }
  const isProductInCart = cartItems.find(({ id }) => id === productToAdd.id);

  if (isProductInCart) {
    return cartItems.map((cartItem) => {
      return productToAdd.id === cartItem.id
        ? { ...productToAdd, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeProductFromCart = (
  cartItems: (ProductType & { quantity: number })[],
  productToRemove: ProductType,
) => {
  const isProductInCart = cartItems.find(({ id }) => id === productToRemove.id);

  if (Number(isProductInCart?.quantity) <= 1) {
    return cartItems.filter(({ id }) => id !== productToRemove.id);
  }

  return cartItems.map((cartItem) => {
    return cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem;
  });
};

export const changeProductQuantity = (
  cartItems: (ProductType & { quantity: number })[],
  product: ProductType,
  quantity: number,
) => {
  const availableQuantity = quantity > 99 ? 99 : quantity;

  return cartItems.map((cartItem) => {
    return cartItem.id === product.id ? { ...cartItem, quantity: availableQuantity } : cartItem;
  });
};

export const calculateTotalCartItemsCost = (cartItems: (ProductType & { quantity: number })[]) => {
  return cartItems.reduce((acc, { quantity, price }) => acc + quantity * price, 0);
};

export const calculateTotalCartItemsQuantity = (
  cartItems: (ProductType & { quantity: number })[],
) => {
  return cartItems.reduce((total, { quantity }) => total + quantity, 0);
};
