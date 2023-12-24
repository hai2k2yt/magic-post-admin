import {Route, Routes} from 'react-router-dom';

import Login from "../page/auth/Login";
import Register from "../page/auth/Register";
import Home from "../page/Home.js";
import ManagePlace from "../page/ManagePlace";
import StatisticOrder from "../page/StatisticOrder";
import ViewOrder from "../page/ViewOrder";
import CreateOrder from "../page/CreateOrder";
import CreateDeliveryToGatheringPoint from "../page/CreateDeliveryToGatheringPoint";
import CreateDeliveryToTransactionPoint from "../page/CreateDeliveryToTransactionPoint";
import ManageLeaderAccount from "../page/ManageLeaderAccount";
import CreateDeliveryToCustomer from "../page/CreateDeliveryToCustomer";
import ManageOrder from "../page/ManageOrder";
import TransactionLeaderHome from '../page/TransactionLeaderHome.js';
import About from '../page/About.js';
import CreateAccount from '../page/CreateAccount.js';
import Profile from '../page/Profile.js';

// ----------------------------------------------------------------------




const routes = [
    {path: '/home', component: <Home />},
    {path: '/intro', component: <About />},
    {path: '/dashbroad', component: <TransactionLeaderHome />},
    {path: "/profile", component: <Profile />},
    {path: '/createAccount', component: <CreateAccount />},
    {path: '/login', component: <Login />},
    {path: '/register', component: <Register />},
    {path: '/manage-place', component: <ManagePlace />},
    {path: '/order/statistics', component: <StatisticOrder />},
    {path: '/order/view', component: <ViewOrder />},
    {path: '/order/create', component: <CreateOrder />},
    {path: '/order/manage', component: <ManageOrder />},
    {path: '/leader/manage', component: <ManageLeaderAccount />},
    {path: '/order/delivery/customer', component: <CreateDeliveryToCustomer />},
    {path: '/order/delivery/transaction', component: <CreateDeliveryToTransactionPoint />},
    {path: '/order/delivery/gathering', component: <CreateDeliveryToGatheringPoint />},

];

export default function Router() {
    return (
            <Routes>
                {routes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.component}/>
                ))}
            </Routes>
    )
}
