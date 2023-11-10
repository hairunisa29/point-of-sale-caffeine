import { GoChecklist } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";

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

export const productsData = [
  {
    id: 1,
    name: "Americano",
    category: "Coffee",
    price: 40000,
    img: "/src/assets/images/iced-americano.jpg",
    qty: 5,
  },
  {
    id: 2,
    name: "Latte",
    category: "Coffee",
    price: 50000,
    img: "/src/assets/images/latte.jpg",
    qty: 5,
  },
  {
    id: 3,
    name: "Espresso",
    category: "Coffee",
    price: 40000,
    img: "/src/assets/images/espresso.jpg",
    qty: 3,
  },
  {
    id: 4,
    name: "Caramel Machiato",
    category: "Coffee",
    price: 55000,
    img: "/src/assets/images/caramel-machiato.jpg",
    qty: 3,
  },
  {
    id: 5,
    name: "Smoothies",
    category: "Non Coffee",
    price: 45000,
    img: "/src/assets/images/smoothies.jpg",
    qty: 2,
  },
  {
    id: 6,
    name: "Strawberry Milkshake",
    category: "Non Coffee",
    price: 50000,
    img: "/src/assets/images/strawberry-milkshake.jpg",
    qty: 5,
  },
  {
    id: 7,
    name: "Cheesecake",
    category: "Pastry",
    price: 50000,
    img: "/src/assets/images/cheesecake.jpg",
    qty: 7,
  },
  {
    id: 8,
    name: "Cinnamon Roll",
    category: "Pastry",
    price: 45000,
    img: "/src/assets/images/cinnamon-roll.jpg",
    qty: 8,
  },
  {
    id: 9,
    name: "Croissant",
    category: "Pastry",
    price: 40000,
    img: "/src/assets/images/croissant.jpg",
    qty: 12,
  },
];
