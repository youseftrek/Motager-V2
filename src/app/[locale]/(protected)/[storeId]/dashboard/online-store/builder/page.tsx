"use client";

import AnimatedDashboardPage from "../../_components/AnimatedDashboardPage";
import { EditSectionSheet } from "./_components/EditSectionSheet";
import { BuilderContent } from "./_components/BuilderContent";

const BuilderPage = () => {
  return (
    <>
      <EditSectionSheet />
      <AnimatedDashboardPage>
        <BuilderContent />
      </AnimatedDashboardPage>
    </>
  );
};

export default BuilderPage;
