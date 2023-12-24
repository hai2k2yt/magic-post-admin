import Router from './routes';
import { Route, Routes } from "react-router-dom";
import Login from "./page/auth/Login";
import Home from "./page/Home";
import ManagePlace from "./page/ManageGatheringPoints";
import StatisticOrder from "./component/layout/StatisticOrder";
import ViewOrder from "./page/ViewOrder";
import CreateOrder from "./page/CreateOrder";
import CreateDeliveryToGatheringPoint from "./page/CreateDeliveryToGatheringPoint";
import CreateLeaderAccount from "./page/CreateLeaderAccount";
import CreateDeliveryToCustomer from "./page/CreateDeliveryToCustomer";
import ManageOrder from "./component/layout/StatisticAllOrder";
import About from './page/About';
import CreateStaffAccount from './page/CreateStaffAccount';
import Profile from './page/Profile';
import { React } from 'react';
import Layout from './component/Layout';
import Dashboard from './page/Dashboard';
import NewOrder from './page/ConfirmNewOrderGatheringPoint';
import MangageTransactionPoint from './page/ManageTransactionPoint';
import ManageLeaderAccount from './page/ManageLeaderAccount';
import OrderTransactionPoint from './page/OrderTransactionPoint';

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
]
const gStaff = [
    { path: '/gathering/order', component: <NewOrder /> },
    { path: '/order/create', component: <CreateOrder /> },
    { path: '/order/delivery/gathering', component: <CreateDeliveryToGatheringPoint /> },
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
