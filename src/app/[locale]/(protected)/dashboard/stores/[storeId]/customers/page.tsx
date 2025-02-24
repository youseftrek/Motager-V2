import { Button } from "@/components/ui/button";
import AnimatedDashboardPage from "../../../_components/AnimatedDashboardPage";
import DashboardPageHeader from "../../../_components/DashboardPageHeader";
import TableWithActions from "./_components/TableWithActions";
import { useTranslations } from "next-intl";
import { UserPlus } from "lucide-react";

const CustomersPage = () => {
  const t = useTranslations("CustomersPage");

  const data = [
    {
      id: "728ed52f",
      name: "John Doe",
      email: "m@example.com",
      amountPaied: 100,
      status: "new",
    },
    {
      id: "82aeb81c",
      name: "Jane Smith",
      email: "jane@example.com",
      amountPaied: 200,
      status: "active",
    },
    {
      id: "63c9fe02",
      name: "Mike Johnson",
      email: "mike@example.com",
      amountPaied: 50,
      status: "new",
    },
    {
      id: "45bf1e6d",
      name: "Emily Davis",
      email: "emily@example.com",
      amountPaied: 300,
      status: "premium",
    },
    {
      id: "9fa3b1e8",
      name: "Chris Brown",
      email: "chris@example.com",
      amountPaied: 75,
      status: "new",
    },
    {
      id: "c1b84a62",
      name: "Sara Wilson",
      email: "sara@example.com",
      amountPaied: 120,
      status: "active",
    },
    {
      id: "2d9ce43f",
      name: "James Lee",
      email: "james@example.com",
      amountPaied: 500,
      status: "premium",
    },
    {
      id: "79f8b3e0",
      name: "Anna Kim",
      email: "anna@example.com",
      amountPaied: 220,
      status: "active",
    },
    {
      id: "8ab3c7d4",
      name: "Paul Green",
      email: "paul@example.com",
      amountPaied: 95,
      status: "new",
    },
    {
      id: "eb3d8a1f",
      name: "Nancy Adams",
      email: "nancy@example.com",
      amountPaied: 80,
      status: "new",
    },
    {
      id: "c7d3b9f4",
      name: "David Miller",
      email: "david@example.com",
      amountPaied: 350,
      status: "premium",
    },
    {
      id: "f41b7e82",
      name: "Lisa Clark",
      email: "lisa@example.com",
      amountPaied: 400,
      status: "premium",
    },
    {
      id: "3a7bf12e",
      name: "Kevin Scott",
      email: "kevin@example.com",
      amountPaied: 60,
      status: "new",
    },
    {
      id: "e94f2b0a",
      name: "Sophia Martin",
      email: "sophia@example.com",
      amountPaied: 240,
      status: "active",
    },
    {
      id: "d2b94e73",
      name: "Matthew Lopez",
      email: "matthew@example.com",
      amountPaied: 50,
      status: "new",
    },
    {
      id: "79de8b14",
      name: "Amy Perez",
      email: "amy@example.com",
      amountPaied: 300,
      status: "active",
    },
    {
      id: "6eaf9b3c",
      name: "Nathan Baker",
      email: "nathan@example.com",
      amountPaied: 410,
      status: "premium",
    },
    {
      id: "bd3e8f24",
      name: "Emma Hill",
      email: "emma@example.com",
      amountPaied: 95,
      status: "new",
    },
    {
      id: "1bf4d2e8",
      name: "Olivia Carter",
      email: "olivia@example.com",
      amountPaied: 150,
      status: "active",
    },
    {
      id: "c2f7e94a",
      name: "Lucas Turner",
      email: "lucas@example.com",
      amountPaied: 510,
      status: "premium",
    },
    {
      id: "2d8e9b47",
      name: "Mia Harris",
      email: "mia@example.com",
      amountPaied: 70,
      status: "new",
    },
    {
      id: "9d3f7e85",
      name: "Noah Lewis",
      email: "noah@example.com",
      amountPaied: 340,
      status: "premium",
    },
    {
      id: "7ab5d3f2",
      name: "Ava Walker",
      email: "ava@example.com",
      amountPaied: 200,
      status: "active",
    },
    {
      id: "b3e79d14",
      name: "Liam Hall",
      email: "liam@example.com",
      amountPaied: 125,
      status: "new",
    },
    {
      id: "ed4f9b2c",
      name: "Zoe Young",
      email: "zoe@example.com",
      amountPaied: 360,
      status: "premium",
    },
    {
      id: "5a8be7d3",
      name: "Ethan King",
      email: "ethan@example.com",
      amountPaied: 60,
      status: "new",
    },
    {
      id: "f8d2b47a",
      name: "Chloe Wright",
      email: "chloe@example.com",
      amountPaied: 230,
      status: "active",
    },
    {
      id: "b4e6d92f",
      name: "Ella Robinson",
      email: "ella@example.com",
      amountPaied: 400,
      status: "premium",
    },
    {
      id: "d7f4e9a3",
      name: "Ryan Morgan",
      email: "ryan@example.com",
      amountPaied: 110,
      status: "active",
    },
    {
      id: "c7f3b92d",
      name: "Isabella Reed",
      email: "isabella@example.com",
      amountPaied: 70,
      status: "new",
    },
  ];

  return (
    <AnimatedDashboardPage>
      <DashboardPageHeader title="Customers">
        <Button size="sm">
          <UserPlus />
          {t("action")}
        </Button>
      </DashboardPageHeader>
      <TableWithActions products={data} />
    </AnimatedDashboardPage>
  );
};

export default CustomersPage;
