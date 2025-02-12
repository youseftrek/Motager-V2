"use client";

import AnimatedDashboardPage from "../../_components/AnimatedDashboardPage";
import { EditSectionSheet } from "./_components/EditSectionSheet";
import { BuilderContent } from "./_components/BuilderContent";
import { useBuilder } from "@/providers/builder-context-provider";

const BuilderPage = () => {
  const { state } = useBuilder();
  console.log(state);
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
