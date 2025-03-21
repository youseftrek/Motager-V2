import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedDashboardPage from "../../_components/AnimatedDashboardPage";
import { UserBanner } from "./_components/UserBanner";

type StorePageProps = {
  params: Promise<{ storeId: string }>;
};

export default async function StorePage({ params }: StorePageProps) {
  const { storeId } = await params;
  return (
    <AnimatedDashboardPage>
      <UserBanner userName="User Name" />
      <div className="mx-auto mt-7 w-full">
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full max-w-[600px]"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </AnimatedDashboardPage>
  );
}
