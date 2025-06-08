"use client";

import { Store } from "@/types/store";

import { createContext, useContext, useState } from "react";

type UserStoresContextType = {
  stores: Store[];
  currentStore: Store | null;
  setStores: (stores: Store[]) => void;
  setCurrentStore: (store: Store) => void;
};

export const UserStoresContext = createContext<UserStoresContextType>({
  stores: [],
  currentStore: null,
  setStores: () => {},
  setCurrentStore: () => {},
});

export const UserStoresProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [currentStore, setCurrentStore] = useState<Store | null>(null);

  return (
    <UserStoresContext.Provider
      value={{ stores, currentStore, setStores, setCurrentStore }}
    >
      {children}
    </UserStoresContext.Provider>
  );
};

export const useUserStores = () => {
  const context = useContext(UserStoresContext);
  if (!context) {
    throw new Error("useUserStores must be used within a UserStoresProvider");
  }
  return context;
};
