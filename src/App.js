import Router from './routes';
import { Route, Routes } from "react-router-dom";
import Login from "./page/auth/Login";
import Home from "./page/Home";
import ManageGatheringPoint from "./page/admin/ManageGatheringPoints";
import StatisticOrder from "./component/layout/StatisticOrder";
import ViewOrder from "./page/ViewOrder";
import CreateOrder from "./page/transactionStaff/CreateOrder";
import CreateDeliveryToGatheringPoint from "./page/gatheringStaff/CreateDeliveryToGatheringPoint";
import CreateAccount from "./page/admin/CreateAccount";
import CreateDeliveryToCustomer from "./page/transactionStaff/CreateDeliveryToCustomer";
import About from './page/About';
import { React } from 'react';
import Layout from './component/Layout';
import Dashboard from './page/admin/Dashboard';
import NewOrder from './page/gatheringStaff/NewOrder';
import MangageTransactionPoint from './page/admin/ManageTransactionPoint';
import ManageLeaderAccount from './page/admin/ManageLeaderAccount';
import OrderTransactionPoint from './page/transactionStaff/OrderTransactionPoint';
import DashboardTransaction from './page/transactionStaff/DashboardTransaction';
import ROLES from './page/auth/Role';
import NotFound from './page/NotFound';
// import ConfirmOrderArrival from "./page/transactionStaff/ConfirmOrderArrival";
import CreateDeliveryToTransactionPoint from "./page/gatheringStaff/CreateDeliveryToTransactionPoint";

const admin = [
    { path: '/manage-gatheringPoint', component: <ManageGatheringPoint /> },
    { path: '/manage-transactionPoint', component: <MangageTransactionPoint /> },
    { path: '/leader/manage', component: <ManageLeaderAccount /> },
    { path: '/dashboard', component: <Dashboard /> },
    { path: '/create-account', component: <CreateAccount /> }

];
const leader = [
    { path: '/create-account', component: <CreateAccount /> },
    { path: '/dashboard', component: <Dashboard /> },
    // { path: '/dashboard/leader', component: <Dashboard /> },
]
const tStaff = [
    { path: '/order/create', component: <CreateOrder /> },
    { path: '/transaction/order', component: <OrderTransactionPoint /> },
    { path: '/order/delivery/customer', component: <CreateDeliveryToCustomer /> },
    { path: '/order/delivery/gathering', component: <CreateDeliveryToGatheringPoint /> },
    { path: '/dashboard/transaction', component: <DashboardTransaction /> },
    // { path: '/order/manage', component: <ManageOrder /> },
    // { path: '/transaction/order/:id', component: <ConfirmOrderArrival /> },
]
const gStaff = [
    { path: '/gathering/order/:id', component: <NewOrder /> },
    { path: '/order/delivery/gathering/:id', component: <CreateDeliveryToGatheringPoint /> },
    { path: '/order/delivery/transaction/:id', component: <CreateDeliveryToTransactionPoint /> },
]

const unauthorizedUser = [
    { path: '/home', component: <Home /> },
    { path: '/intro', component: <About /> },
    { path: '/login', component: <Login /> },
    { path: '/order/view', component: <ViewOrder /> },
]

const role = localStorage.getItem('role');


function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route key='/not-found' path='/*' element={<NotFound />} />

                {/* public routes */}
                {unauthorizedUser.map((route) => (
                    <Route key={route.path} path={route.path} element={route.component} />
                ))}

                {/*transaction staff routes */}
                {role === ROLES[4] ? (
                    tStaff.map((route) => (
                        <Route key={route.path} path={route.path} element={route.component} />
                    ))
                ) :
                    <Route key='/not-found' path='/*' element={<NotFound />} />

                }

                {/* gathering staff routes */}
                {role === ROLES[3] ? (
                    gStaff.map((route) => (
                        <Route key={route.path} path={route.path} element={route.component} />
                    ))) :
                    <Route key='/not-found' path='/*' element={<NotFound />} />
                }

                {/* leader routes */}
                {(role === ROLES[2] || role === ROLES[1]) ? (
                    leader.map((route) => (
                        <Route key={route.path} path={route.path} element={route.component} />
                    )))
                    :
                    <Route key='/not-found' path='/*' element={<NotFound />} />}

                {/* admin routes */}
                {role === ROLES[0] ?
                    (admin.map((route) => (
                        <Route key={route.path} path={route.path} element={route.component} />
                    ))) :
                    <Route key='/not-found' path='/*' element={<NotFound />} />
                }
            </Route>
        </Routes>
    );
}

export default App;
