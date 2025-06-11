import PaymentClientPage from "./_components/PaymentClientPage";

type Props = { params: Promise<{ id: string }> };

export default async function PaymentPage({ params }: Props) {
  const { id } = await params;
  return <PaymentClientPage id={id} />;
}
