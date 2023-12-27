import Router from './routes';
import { Route, Routes } from "react-router-dom";
import Login from "./page/auth/Login";
import Home from "./page/Home";
import ManagePlace from "./page/admin/ManageGatheringPoints";
import StatisticOrder from "./component/layout/StatisticOrder";
import ViewOrder from "./page/ViewOrder";
import CreateOrder from "./page/transactionStaff/CreateOrder";
import CreateDeliveryToGatheringPoint from "./page/gatheringStaff/CreateDeliveryToGatheringPoint";
import CreateLeaderAccount from "./page/admin/CreateLeaderAccount";
import CreateDeliveryToCustomer from "./page/transactionStaff/CreateDeliveryToCustomer";
import ManageOrder from "./component/layout/StatisticAllOrder";
import About from './page/About';
import CreateStaffAccount from './page/leader/CreateStaffAccount';
import Profile from './page/Profile';
import { React } from 'react';
import Layout from './component/Layout';
import Dashboard from './page/admin/Dashboard';
import NewOrder from './page/gatheringStaff/ConfirmNewOrderGatheringPoint';
import MangageTransactionPoint from './page/admin/ManageTransactionPoint';
import ManageLeaderAccount from './page/admin/ManageLeaderAccount';
import OrderTransactionPoint from './page/transactionStaff/OrderTransactionPoint';
import ConfirmOrderArrival from "./page/transactionStaff/ConfirmOrderArrival";
import CreateDeliveryToTransactionPoint from "./page/gatheringStaff/CreateDeliveryToTransactionPoint";

const admin = [
    { path: '/manage-gatheringPoint', component: <ManagePlace /> },
    { path: 'manage-transactionPoint', component: <MangageTransactionPoint /> },
    { path: '/order/statistics', component: <StatisticOrder /> },
    { path: '/leader/manage', component: <ManageLeaderAccount /> },
    { path: '/leader/create', component: <CreateLeaderAccount /> }

];
const leader = [
    { path: '/createStaffAccount', component: <CreateStaffAccount /> },
    { path: '/profile', component: <Profile /> },
    { path: '/dashboard', component: <Dashboard /> },
]
const tStaff = [
    { path: '/order/create', component: <CreateOrder /> },
    { path: '/transaction/order', component: <OrderTransactionPoint />},
    { path: '/order/delivery/customer', component: <CreateDeliveryToCustomer /> },
    { path: '/order/delivery/gathering', component: <CreateDeliveryToGatheringPoint /> },
    { path: '/order/manage', component: <ManageOrder /> },
    { path: '/order/gathering/:id', component: <ConfirmOrderArrival /> },
]
const gStaff = [
    { path: '/gathering/order/:id', component: <NewOrder /> },
    { path: '/order/create', component: <CreateOrder /> },
    { path: '/order/delivery/gathering/:id', component: <CreateDeliveryToGatheringPoint /> },
    { path: '/order/delivery/transaction/:id', component: <CreateDeliveryToTransactionPoint /> },
    { path: '/order/manage', component: <ManageOrder /> },
]

const unauthorizedUser = [
    { path: '/home', component: <Home /> },
    { path: '/intro', component: <About /> },
    { path: '/login', component: <Login /> },
    { path: '/order/view', component: <ViewOrder /> },
]

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public routes */}
                {unauthorizedUser.map((route) => (
                    <Route key={route.path} path={route.path} element={route.component} />
                ))}

                {/*transaction staff routes */}
                {tStaff.map((route) => (
                    <Route key={route.path} path={route.path} element={route.component} />
                ))}

                {/* gathering staff routes */}
                {gStaff.map((route) => (
                    <Route key={route.path} path={route.path} element={route.component} />
                ))}

                {/* leader routes */}
                {leader.map((route) => (
                    <Route key={route.path} path={route.path} element={route.component} />
                ))}

                {/* admin routes */}
                {admin.map((route) => (
                    <Route key={route.path} path={route.path} element={route.component} />
                ))}
            </Route>
        </Routes>
    );
}

export default App;
