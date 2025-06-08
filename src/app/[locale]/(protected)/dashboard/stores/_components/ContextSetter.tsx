"use client";

import { useUserStores } from "@/providers/user-stores-context";

const ContextSetter = () => {
  const { stores, currentStore } = useUserStores();
  return null;
};

export default ContextSetter;
