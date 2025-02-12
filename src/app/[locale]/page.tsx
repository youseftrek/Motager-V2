import Navbar from "@/components/landing/Navbar";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <MaxWidthWrapper className="pt-20 lg:pt-10">
      <Navbar />
      <Hero />
    </MaxWidthWrapper>
  );
}
