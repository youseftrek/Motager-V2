"use client";

import { EditSectionSheet } from "./_components/EditSectionSheet";
import { BuilderContent } from "./_components/BuilderContent";
import { BuilderHeader } from "./_components/BuilderHeader";
import AnimatedDashboardPage from "../../../../_components/AnimatedDashboardPage";

const BuilderPage = () => {
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
