import { getCharge } from "@/data/payment";
import React from "react";
import OrderPaymentSuccess from "./_components/SuccessPaymentPage";

export default async function PaymentSuccess({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const tap_id = searchParams.tap_id;

  if (!tap_id || typeof tap_id !== "string") {
    return <div>Error: Invalid payment reference</div>;
  }

  const data = await getCharge(tap_id);

  const { charge , store } = data.data;

  return (
    <OrderPaymentSuccess
      lastFour={charge?.card?.last_four}
      userEmail={charge.customer.email}
      total={charge.amount}
      currency={charge.currency}
      totalAmount={charge.amount}
      store={store}
    />
  );
}
