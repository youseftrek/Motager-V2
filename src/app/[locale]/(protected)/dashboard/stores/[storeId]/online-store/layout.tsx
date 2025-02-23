"use client";
import { BuilderProvider } from "@/providers/builder-context-provider";
import React from "react";

type Props = { children: React.ReactNode };

const layout = ({ children }: Props) => {
  return (
    <div className="h-full">
      <BuilderProvider>{children}</BuilderProvider>
    </div>
  );
};

export default layout;
