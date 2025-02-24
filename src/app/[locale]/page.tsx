import Navbar from "@/components/landing/Navbar";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import Hero from "./_components/Hero";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <MaxWidthWrapper className="pt-20 lg:pt-10">
      <Navbar session={session || null} />
      <Hero />
    </MaxWidthWrapper>
  );
}
