import React from "react";
import PricingPage from "./_components/plansPage";
import { getPlans } from "@/data/plans";
import { getUser } from "@/data/user";
import { getSession } from "@/actions/getSession";

export const metadata = {
  title: "Pricing Plans | Motager",
  description: "Choose the perfect plan for your business needs",
};

const Pricing = async () => {
  const plans = await getPlans();
  const userSession = await getSession();
  const user = await getUser(
    String(userSession.user?.user_id),
    userSession.token ?? ""
  );

  return (
    <main>
      <PricingPage plans={plans} user={user} />
    </main>
  );
};

export default Pricing;
