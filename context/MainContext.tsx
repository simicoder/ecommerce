import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

const MainContext = createContext<ContextType>({
  loading: false,
  setLoading: () => {},
  modal: {
    isOpen: false,
    type: "success",
    message: "",
  },
  setModal: () => {},
});

type Modal = {
  isOpen: boolean;
  type: "error" | "success";
  message: string;
};

type ContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  modal: Modal;
  setModal: Dispatch<SetStateAction<Modal>>;
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("Error while reading context!");
  }

  return context;
};

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<Modal>({
    isOpen: false,
    type: "success" as const,
    message: "",
  });
  return (
    <MainContext.Provider value={{ loading, setLoading, modal, setModal }}>
      {children}
    </MainContext.Provider>
  );
};
