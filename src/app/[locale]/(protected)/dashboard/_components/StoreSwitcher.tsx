"use client";

import * as React from "react";
import { Check, ChevronsUpDown, PlusCircle, Store } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";

type Store = {
  id: string;
  name: string;
};

interface StoreSwitcherProps {
  stores: Store[];
  currentStore: Store;
}

export function StoreSwitcher({ stores, currentStore }: StoreSwitcherProps) {
  const router = useRouter();
  const [selectedStore, setSelectedStore] = React.useState<Store>(currentStore);

  const handleSelectStore = (store: Store) => {
    setSelectedStore(store);
    toast.success(`Switched to ${store.name}`);
  };

  const handleCreateStore = () => {
    router.push("/dashboard/stores");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Select an organization"
          className="justify-between mb-3 w-[98%] h-12"
        >
          <Store size={22} className="mr-1" />
          {selectedStore.name}
          <ChevronsUpDown className="opacity-50 ml-auto w-4 h-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[210px]">
        <DropdownMenuLabel>Stores</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {stores.map((store) => (
          <DropdownMenuItem
            key={store.id}
            onSelect={() => handleSelectStore(store)}
            className="text-sm"
          >
            {store.name}
            <Check
              className={cn(
                "ml-auto h-4 w-4",
                selectedStore.id === store.id ? "opacity-100" : "opacity-0"
              )}
            />
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleCreateStore} className="text-sm">
          <PlusCircle className="mr-2 w-4 h-4" />
          Create Store
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
