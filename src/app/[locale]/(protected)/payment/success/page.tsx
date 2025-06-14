import { updatePayment } from "@/data/payment";
import React from "react";
import PaymentSuccessPage from "./_components/PaymentSuccessPage";

export default async function PaymentSuccess({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const tap_id = (await searchParams).tap_id;
  const data = await updatePayment(String(tap_id));
  return <PaymentSuccessPage data={data} />;
}
