import Navbar from "@/components/landing/Navbar";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import Hero from "./_components/Hero";
import { getSession } from "@/actions/get-session";

export default async function Home() {
  const { isAuthenticated, user } = await getSession();
  return (
    <MaxWidthWrapper className="pt-20 lg:pt-10">
      <Navbar user={user || undefined} isAuthenticated={isAuthenticated} />
      <Hero isAuthenticated={isAuthenticated} />
    </MaxWidthWrapper>
  );
}
