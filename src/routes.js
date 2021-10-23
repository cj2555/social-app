/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import CategoryIcon from '@material-ui/icons/Category';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LanguageIcon from '@material-ui/icons/Language';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
    import CallIcon from '@mui/icons-material/Call';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SettingsIcon from '@material-ui/icons/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EmailIcon from '@mui/icons-material/Email';
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Maps from "views/Maps/Maps.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import CategoryList from "views/Category/CategoryList";
import CountryList from "views/Country/CountryList";
import UserList from "views/User/UserList";
import UserDetails from "views/User/UserDetails";
import CurrencyList from "views/Currency/CurrencyList";
import SettingList from "views/Settings/SettingList";
import ServiceList from "views/Service/ServiceList";
import Test from "views/Test/Test";
import ServiceById from "views/Service/ServiceById";
import PaymentIndex from "views/Payment/PaymentIndex";
import WithdrawPayment from "views/Withdraws/WithdrawPayment";
import WithDrawPendingList from 'views/Withdraws/WithDrawPendingList';
import PackageList from 'views/Package/PackageList';
import MessageIndex from "views/Message/MessageIndex";
import WithdrawIdex from "views/Withdraws/WithdrawIdex";
import CallRecords from "views/Calls/CallRecords";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },

  {
    path: "/users",
    name: "Users",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserList,
    layout: "/admin",
  },
  {
    path: "/category",
    name: "Category",
    rtlName: "ملف تعريفي للمستخدم",
    icon: ListAltIcon,
    component: CategoryList,
    layout: "/admin",
  },
  {
    path: "/service",
    name: "Service",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CategoryIcon,
    component: ServiceList,
    layout: "/admin",
  },
  {
    path: "/coutries",
    name: "Coutries",
    rtlName: "ملف تعريفي للمستخدم",
    icon: LanguageIcon,
    component: CountryList,
    layout: "/admin",
  },
  {
    path: "/currency",
    name: "Currency",
    rtlName: "ملف تعريفي للمستخدم",
    icon: AttachMoneyIcon,
    component: CurrencyList,
    layout: "/admin",
  },
  
  {
    path: "/payments",
    name: "Sales",
    rtlName: "ملف تعريفي للمستخدم",
    icon: LocalAtmIcon,
    component: PaymentIndex,
    layout: "/admin",
  },
  {
    path: "/withdraws",
    name: "Withdraws",
    rtlName: "ملف تعريفي للمستخدم",
    icon: AccountBalanceIcon,
    component: WithdrawIdex,
    layout: "/admin",
  },
    {
    path: "/packageList",
    name: "Balance packages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: ShoppingCartIcon,
    component: PackageList,
    layout: "/admin",
  },
    {
    path: "/callRecords",
    name: "Call Records",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CallIcon,
    component: CallRecords,
    layout: "/admin",
  },
  {
    path: "/messageList",
    name: "Messages",
    rtlName: "ملف تعريفي للمستخدم",
    icon: EmailIcon,
    component: MessageIndex,
    layout: "/admin",
  },
  {
    path: "/adminSettings",
    name: "Admin Settings",
    rtlName: "ملف تعريفي للمستخدم",
    icon: SupervisorAccountIcon,
    component: SettingList,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "ملف تعريفي للمستخدم",
    icon: NotificationsActiveIcon,
    component: Test,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Settings",
    rtlName: "ملف تعريفي للمستخدم",
    icon: SettingsIcon,
    component: SettingList,
    layout: "/admin",
  },
];

export const componentRoutes = [
  {
    path: "/userDetails/:id",
    name: "User Details",
    component: UserDetails,
    layout: "/admin",
  },
  {
    path: "/serviceById/:id",
    name: "service Details",
    component: ServiceById,
    layout: "/admin",
  },

  {
    path: "/withdrawPay/:wid",
    name: "Withdraw payment",
    component: WithdrawPayment,
    layout: "/admin",
  },
   
]



export default dashboardRoutes;
