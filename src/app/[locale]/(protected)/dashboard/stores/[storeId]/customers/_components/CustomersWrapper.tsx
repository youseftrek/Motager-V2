"use client";

import React from "react";
import { Loader } from "lucide-react";
import CustomersTable from "./CustomersTable";

type Props = {
  customers: any[];
  isLoading?: boolean;
  error?: string | null;
};

const CustomersWrapper = ({ customers, isLoading = false, error = null }: Props) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-2">
          <Loader className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading customers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-2">
          <p className="text-destructive">Failed to load customers</p>
          <p className="text-sm text-muted-foreground">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return <CustomersTable customers={customers} />;
};

export default CustomersWrapper; 