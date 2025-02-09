import Navbar from "@/components/landing/Navbar";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <Navbar />
      <Hero />
      <div className="flex gap-2 bg-primary w-full">
        <div className="bg-blue-200 w-1/2">Text</div>
        <div className="bg-destructive w-1/2">Image</div>
      </div>
    </MaxWidthWrapper>
  );
}
