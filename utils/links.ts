import { IconType } from "react-icons";
import { MdOutlinePayment } from "react-icons/md";
import { GrTask } from "react-icons/gr";
import { AiFillProduct } from "react-icons/ai";
import { FaUsers, FaHome } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { TbReport } from "react-icons/tb";
import { MdCategory } from "react-icons/md";
import { SiOrigin } from "react-icons/si";
import { PiLinkBreakBold } from "react-icons/pi";
type LinkCategory = { title: string; children: NavLink[] };

type NavLink = {
  href: string;
  label: string;
  icon: IconType;
};

export const links: LinkCategory[] = [
  {
    title: "خدمات اصلی",
    children: [
      {
        label: "داشبورد",
        href: "/",
        icon: FaHome,
      },
    ],
  },
  {
    title: "معاملات",
    children: [
      { label: "لیست معاملات", href: "/transactions", icon: GrTransaction },
    ],
  },
  {
    title: "سرویس ها",
    children: [
      { label: "تامین کنندگان", href: "/suppliers", icon: FaUsers },
      {
        label: "مشتریان",
        href: "/customers",
        icon: FaUsers,
      },
      {
        label: "محصولات تامین کنندگان",
        href: "/suppliers-products",
        icon: AiFillProduct,
      },
      {
        label: "پرداخت ها",
        href: "/payments",
        icon: MdOutlinePayment,
      },
    ],
  },

  {
    title: "گزارشات",
    children: [{ label: "لیست گزارشات", href: "/reports", icon: TbReport }],
  },
  {
    title: "کاربران",
    children: [{ label: "کاربران", href: "/users", icon: FaUsers }],
  },
  {
    title: "اطلاعات مرجع",
    children: [
      {
        label: " دسته بندی ها",
        href: "/reference-data/categories",
        icon: MdCategory,
      },
      {
        label: "دلایل شکست ",
        href: "/reference-data/failures",
        icon: PiLinkBreakBold,
      },
      {
        label: "مبدا مشتری",
        href: "/reference-data/origins",
        icon: SiOrigin,
      },
      {
        label: "فعالیت ها",
        href: "/reference-data/tasks",
        icon: GrTask,
      },
      {
        label: "محصولات",
        href: "/reference-data/products",
        icon: AiFillProduct,
      },
    ],
  },
];
