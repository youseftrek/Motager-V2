import { getPlans } from "@/data/plans";
import PaymentClientPage from "./_components/PaymentClientPage";
import { getSession } from "@/actions/getSession";

type Props = { params: Promise<{ id: string }> };

export default async function PaymentPage({ params }: Props) {
  const { id } = await params;
  const user = await getSession();
  return <PaymentClientPage id={id} user={user} />;
}
