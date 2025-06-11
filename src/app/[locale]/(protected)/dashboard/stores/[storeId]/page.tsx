import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedDashboardPage from "../../_components/AnimatedDashboardPage";
import { UserBanner } from "./_components/UserBanner";
import { checkStore, getStores } from "@/data/stores";
import { getSession } from "@/actions/getSession";
import { redirect } from "next/navigation";
import { StoresInitializer } from "../../_components/StoresInitializer";
import { Store } from "@/types/store";

type StorePageProps = {
  params: Promise<{ storeId: string; locale: string }>;
};

export default async function StorePage({ params }: StorePageProps) {
  const { storeId, locale } = await params;

  const { user, token } = await getSession();
  const validateStore = await checkStore(user?.user_id, token, Number(storeId));
  const storesResponse = await getStores(user?.user_id, token);

  if (!validateStore) {
    redirect(`/${locale}/dashboard/stores`);
  } else {
    const currentStore = storesResponse.data.find(
      (store: Store) => store.id === Number(storeId)
    );

    return (
      <>
        <StoresInitializer stores={storesResponse.data} />
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
                  Yes. It&apos;s animated by default, but you can disable it if
                  you prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </AnimatedDashboardPage>
      </>
    );
  }
}
