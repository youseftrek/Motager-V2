"use client";

import { EditSectionSheet } from "./_components/EditSectionSheet";
import { BuilderContent } from "./_components/BuilderContent";
import { BuilderHeader } from "./_components/BuilderHeader";
import { useBuilder } from "@/providers/builder-context-provider";
import AnimatedDashboardPage from "../../../../_components/AnimatedDashboardPage";

const BuilderPage = () => {
  const { state } = useBuilder();

  return (
    <>
      <EditSectionSheet />
      <AnimatedDashboardPage className="bg-background dark:bg-background p-0 border rounded-none">
        <BuilderHeader />
        <BuilderContent />
      </AnimatedDashboardPage>
    </>
  );
};

export default BuilderPage;
