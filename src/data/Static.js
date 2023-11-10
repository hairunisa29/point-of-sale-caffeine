import { GoChecklist } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { BsCashCoin } from "react-icons/bs";
import { BiCreditCard, BiWallet } from "react-icons/bi";

export const sidebarData = [
  {
    id: 1,
    icon: RxDashboard,
    title: "Order",
    url: "/order",
  },
  {
    id: 2,
    icon: GoChecklist,
    title: "History",
    url: "/history",
  },
];

export const paymentMethods = [
  {
    id: 1,
    method: "Cash",
    icon: BsCashCoin,
  },
  {
    id: 2,
    method: "Debit Card",
    icon: BiCreditCard,
  },
  {
    id: 3,
    method: "E-Wallet",
    icon: BiWallet,
  },
];
