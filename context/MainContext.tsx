import { createContext, useState, Dispatch, SetStateAction, useContext } from 'react';

const MainContext = createContext<ContextType>({
  loading: false,
  setLoading: () => {},
  isDarkTheme: false,
  setIsDarkTheme: () => {},
});

type ContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  isDarkTheme: boolean;
  setIsDarkTheme: Dispatch<SetStateAction<boolean>>;
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
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <MainContext.Provider value={{ loading, setLoading, isDarkTheme, setIsDarkTheme }}>
      {children}
    </MainContext.Provider>
  );
};
