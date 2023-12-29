import Router from './routes';
import { Route, Routes } from "react-router-dom";
import Login from "./page/auth/Login";
import Home from "./page/Home";
import ManageGatheringPoint from "./page/admin/ManageGatheringPoints";
import StatisticOrder from "./component/layout/StatisticOrder";
import ViewOrder from "./page/ViewOrder";
import CreateOrder from "./page/transactionStaff/CreateOrder";
import CreateDeliveryGatheringToGatheringPoint from "./page/gatheringStaff/CreateDeliveryGatheringToGatheringPoint";
import CreateAccount from "./page/admin/CreateAccount";
import CreateDeliveryToCustomer from "./page/transactionStaff/CreateDeliveryToCustomer";
import About from './page/About';
import { React } from 'react';
import Layout from './component/Layout';
import Dashboard from './page/admin/Dashboard';
import ConfirmOrderArrivalToGathering from './page/gatheringStaff/NewOrder';
import MangageTransactionPoint from './page/admin/ManageTransactionPoint';
import ManageLeaderAccount from './page/admin/ManageLeaderAccount';
import OrderTransactionPoint from './page/transactionStaff/OrderTransactionPoint';
import DashboardTransaction from './page/transactionStaff/DashboardTransaction';
import ROLES from './page/auth/Role';
import NotFound from './page/NotFound';
import ConfirmOrderArrivalToTransaction from "./page/transactionStaff/ConfirmOrderArrivalToTransaction";
import CreateDeliveryToTransactionPoint from "./page/gatheringStaff/CreateDeliveryToTransactionPoint";
import CreateDeliveryTransactionToGatheringPoint
    from "./page/transactionStaff/CreateDeliveryTransactionToGatheringPoint";

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
    { path: '/order/create/:id', component: <CreateOrder /> },
    { path: '/transaction/order', component: <OrderTransactionPoint />},
    { path: '/order/transaction/:id/customer', component: <CreateDeliveryToCustomer /> },
    { path: '/order/transaction/:id/gathering', component: <CreateDeliveryTransactionToGatheringPoint /> },
    { path: '/order/transaction/:id', component: <ConfirmOrderArrivalToTransaction /> },
]
const gStaff = [
    { path: '/gathering/order/:id/arrival', component: <ConfirmOrderArrivalToGathering /> },
    { path: '/order/gathering/:id/gathering', component: <CreateDeliveryGatheringToGatheringPoint /> },
    { path: '/order/gathering/:id/transaction', component: <CreateDeliveryToTransactionPoint /> },
]

const unauthorizedUser = [
    { path: '/home', component: <Home /> },
    { path: '/intro', component: <About /> },
    { path: '/login', component: <Login /> },
    { path: '/order/view', component: <ViewOrder /> },
]
localStorage.setItem('role', ROLES[4])
const role = localStorage.getItem('role');


function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route key='/not-found' path='/*' element={<NotFound/>}/>

                {/* public routes */}
                {unauthorizedUser.map((route) => (
                    <Route key={route.path} path={route.path} element={route.component} />
                ))}

                {/*transaction staff routes */}
                {role === ROLES[4] && (
                    tStaff.map((route) => (
                        <Route key={route.path} path={route.path} element={route.component} />
                    ))
                )}

                {/* gathering staff routes */}
                {role === ROLES[3] && (
                    gStaff.map((route) => (
                        <Route key={route.path} path={route.path} element={route.component} />
                    )))}

                {/* leader routes */}
                {(role === ROLES[2] || role === ROLES[1]) && (
                    leader.map((route) => (
                        <Route key={route.path} path={route.path} element={route.component} />
                    )))}

                {/* admin routes */}
                {(role === ROLES[0] &&
                    admin.map((route) => (
                        <Route key={route.path} path={route.path} element={route.component} />
                    )))}
            </Route>
        </Routes>
    );
}

export default App;
