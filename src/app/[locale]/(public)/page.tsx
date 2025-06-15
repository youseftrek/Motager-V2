import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { getSession } from "@/actions/getSession";
import Hero from "../_components/Hero";
import MotagerBusinessCard from "../_components/BusinessCard";

export default async function Home() {
  const { user } = await getSession();
  const isAuthenticated = user !== null && user !== undefined;
  return (
    <MaxWidthWrapper className="pt-20 lg:pt-10">
      <Hero isAuthenticated={isAuthenticated} />
    </MaxWidthWrapper>
  );
}
