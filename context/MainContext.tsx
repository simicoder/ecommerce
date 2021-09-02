import { createContext, useState, Dispatch, SetStateAction, useContext } from 'react';

const MainContext = createContext<ContextType>({
  loading: false,
  setLoading: () => {},
});

type ContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('Error while reading context!');
  }

  return context;
};

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);

  return <MainContext.Provider value={{ loading, setLoading }}>{children}</MainContext.Provider>;
};
