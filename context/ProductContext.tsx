import { createContext, useState, Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { ProductSizes } from 'lib/utils/consts';
import type { ProductType } from 'types';

type ProductContext = {
  products: ProductType[];
  setProducts: Dispatch<SetStateAction<ProductType[]>>;
  minPrice: number;
  setMinPrice: Dispatch<SetStateAction<number>>;
  maxPrice: number;
  setMaxPrice: Dispatch<SetStateAction<number>>;
  price: number;
  setPrice: Dispatch<SetStateAction<number>>;
  filteredProducts: ProductType[];
  setFilteredProducts: Dispatch<SetStateAction<ProductType[]>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  productsTypes: string[];
  setProductsTypes: Dispatch<SetStateAction<string[]>>;
  activeProductSize: typeof ProductSizes[number]['label'];
  setActiveProductSize: Dispatch<SetStateAction<typeof ProductSizes[number]['label']>>;
  handleChangeSearchQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePrice: (e: React.ChangeEvent<{}>, newValue: number | number[]) => void;
  handleSelectcategorys: (options: any) => void;
};

const ProductContext = createContext<ProductContext>({
  products: [],
  setProducts: () => {},
  minPrice: 0,
  setMinPrice: () => {},
  maxPrice: 2000,
  setMaxPrice: () => {},
  price: 350,
  setPrice: () => {},
  filteredProducts: [],
  setFilteredProducts: () => {},
  searchQuery: '',
  setSearchQuery: () => {},
  productsTypes: [],
  setProductsTypes: () => {},
  activeProductSize: 'S',
  setActiveProductSize: () => {},
  handleChangeSearchQuery: () => {},
  handleChangePrice: () => {},
  handleSelectcategorys: () => {},
});

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('Error while reading context!');
  }

  return context;
};

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [productsTypes, setProductsTypes] = useState<string[]>([]);
  const [selectedcategorys, setSelectedcategorys] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [price, setPrice] = useState(350);
  const [activeProductSize, setActiveProductSize] =
    useState<typeof ProductSizes[number]['label']>('S');

  const handleSelectcategorys = (types: { target: { value: string } }) => {
    setSelectedcategorys(types.target.value);
  };

  useEffect(() => {
    handleFilterProducts();
  }, [price, searchQuery, selectedcategorys]);

  const handleFilterProducts = () => {
    setFilteredProducts(
      products
        .filter((product) => product.name.toLowerCase().startsWith(searchQuery.toLowerCase()))
        .filter((product) => product.price <= price)
        .filter((product) => {
          if (!selectedcategorys.length) {
            return true;
          }

          if (selectedcategorys.includes(product.category)) {
            return true;
          }

          return false;
        }),
    );
  };

  const handleChangeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleChangePrice = (_e: React.ChangeEvent<{}>, newValue: number | number[]) => {
    setPrice(Number(newValue as Number));
  };

  useEffect(() => {
    setMinPrice(Math.min(...products.map((product) => product.price)));
    setMaxPrice(Math.max(...products.map((product) => product.price)));
    setPrice(Math.max(...products.map((product) => product.price)));
    setProductsTypes([...new Set(products.map((product) => product.category))]);
  }, [products]);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        price,
        setPrice,
        filteredProducts,
        setFilteredProducts,
        searchQuery,
        setSearchQuery,
        productsTypes,
        setProductsTypes,
        activeProductSize,
        setActiveProductSize,
        handleChangeSearchQuery,
        handleChangePrice,
        handleSelectcategorys,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
