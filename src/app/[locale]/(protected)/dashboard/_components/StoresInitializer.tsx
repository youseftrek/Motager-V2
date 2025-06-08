"use client";

import { Store } from "@/types/store";
import { useUserStores } from "@/providers/user-stores-context";
import { useEffect } from "react";
import { useParams } from "next/navigation";

interface StoresInitializerProps {
  stores: Store[];
}

export function StoresInitializer({ stores }: StoresInitializerProps) {
  const { setStores, setCurrentStore } = useUserStores();
  const params = useParams();
  const storeId = params?.storeId ? Number(params.storeId) : null;

  useEffect(() => {
    if (stores && stores.length > 0) {
      setStores(stores);

      // If we have a storeId in the URL, use that store
      if (storeId) {
        const currentStore = stores.find((store) => store.id === storeId);
        if (currentStore) {
          setCurrentStore(currentStore);
        } else {
          setCurrentStore(stores[0]);
        }
      } else {
        setCurrentStore(stores[0]);
      }
    }
  }, [stores, storeId, setStores, setCurrentStore]);

  return null;
}
