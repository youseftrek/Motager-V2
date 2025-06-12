import {
  Book,
  ChartNoAxesCombined,
  CircleDollarSign,
  Cog,
  House,
  Info,
  Package,
  Store,
  TableProperties,
  TicketPercent,
  Users,
} from "lucide-react";

export const PUBLIC_ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  PRICING: "/pricing",
  DOCS: "/docs",
  LOGIN: "/auth/login",
  SIGNUP: "/auth/sign-up",
};

export const LANDING_PAGE_NAV_LINKS = [
  {
    name: "home",
    href: PUBLIC_ROUTES.HOME,
    icon: House,
  },
  {
    name: "about",
    href: PUBLIC_ROUTES.ABOUT,
    icon: Info,
  },
  {
    name: "pricing",
    href: PUBLIC_ROUTES.PRICING,
    icon: CircleDollarSign,
  },
  {
    name: "docs",
    href: PUBLIC_ROUTES.DOCS,
    icon: Book,
  },
];

export const BASE_URL = "http://localhost:8080";

export const PROTECTED_ROUTES = {
  DASHBOARD: "/dashboard",
  STORES: "/dashboard/stores",
  ORDERS: "/orders",
  PRODUCTS: "/products",
  CATEGORIES: "/categories",
  COLLECTIONS: "/collections",
  CUSTOMERS: "/customers",
  ANALYTICS: "/analytics",
  DISCOUNTS: "/discounts",
  SETTINGS: "/settings",
  ONLINE_STORE: "/online-store",
};

export const DASHBOARD_SIDEBAR_LINKS_DASGBOARDLINKS = [
  {
    name: "home",
    href: PROTECTED_ROUTES.DASHBOARD,
    icon: House,
    subLinks: [],
  },
  {
    name: "orders",
    href: PROTECTED_ROUTES.ORDERS,
    icon: TableProperties,
    subLinks: [],
  },
  {
    name: "products",
    href: PROTECTED_ROUTES.PRODUCTS,
    icon: Package,
    subLinks: [
      {
        name: "collections",
        href: PROTECTED_ROUTES.COLLECTIONS,
      },
      {
        name: "categories",
        href: PROTECTED_ROUTES.CATEGORIES,
      },
    ],
  },
  {
    name: "customers",
    href: PROTECTED_ROUTES.CUSTOMERS,
    icon: Users,
    subLinks: [],
  },
  {
    name: "analytics",
    href: PROTECTED_ROUTES.ANALYTICS,
    icon: ChartNoAxesCombined,
    subLinks: [],
  },
  {
    name: "discounts",
    href: PROTECTED_ROUTES.DISCOUNTS,
    icon: TicketPercent,
    subLinks: [],
  },
  {
    name: "settings",
    href: PROTECTED_ROUTES.SETTINGS,
    icon: Cog,
    subLinks: [],
  },
];

export const DASHBOARD_SIDEBAR_LINKS_STORELINKS = [
  {
    name: "onlineStore",
    href: PROTECTED_ROUTES.ONLINE_STORE,
    icon: Store,
    subLinks: [],
  },
];
