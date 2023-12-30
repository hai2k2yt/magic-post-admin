import Router from './routes';
import { Route, Routes } from "react-router-dom";
import Login from "./page/auth/Login";
import Home from "./page/Home";
import ManageGatheringPoint from "./page/admin/ManageGatheringPoints";
import ViewOrder from "./page/ViewOrder";
import CreateOrder from "./page/transactionStaff/CreateOrder";
import CreateDeliveryGatheringToGatheringPoint from "./page/gatheringStaff/CreateDeliveryGatheringToGatheringPoint";
import CreateDeliveryToCustomer from "./page/transactionStaff/CreateDeliveryToCustomer";
import About from './page/About';
import { React } from 'react';
import Layout from './component/Layout';
import Dashboard from './page/admin/Dashboard';
import ConfirmOrderArrivalToGathering from './page/gatheringStaff/NewOrder';
import MangageTransactionPoint from './page/admin/ManageTransactionPoint';
import ManageLeaderAccount from './page/admin/ManageLeaderAccount';
import OrderTransactionPoint from './page/transactionStaff/OrderTransactionPoint';
import ROLES from './page/auth/Role';
import NotFound from './page/NotFound';
import ConfirmOrderArrivalToTransaction from "./page/transactionStaff/ConfirmOrderArrivalToTransaction";
import CreateDeliveryToTransactionPoint from "./page/gatheringStaff/CreateDeliveryToTransactionPoint";
import CreateDeliveryTransactionToGatheringPoint
    from "./page/transactionStaff/CreateDeliveryTransactionToGatheringPoint";
import CreateGatheringPoint from "./page/admin/CreateGatheringPoint";
import CreateTransactionPoint from "./page/admin/CreateTransactionPoint";
import CreateTransactionAccount from "./page/transactionStaff/CreateTransactionAccount";
import CreateGatheringAccount from "./page/gatheringStaff/CreateGatheringAccount";

const admin = [
    { path: '/gathering/account/create', component: <CreateGatheringAccount /> },
    { path: '/transaction/account/create', component: <CreateTransactionAccount /> },
    { path: '/gathering/create', component: <CreateGatheringPoint /> },
    { path: '/transaction/create', component: <CreateTransactionPoint /> },
    { path: '/manage-gatheringPoint', component: <ManageGatheringPoint /> },
    { path: '/manage-transactionPoint', component: <MangageTransactionPoint /> },
    { path: '/leader/manage', component: <ManageLeaderAccount /> },
    { path: '/dashboard', component: <Dashboard /> },
];

const gLeader = [
    { path: '/dashboard', component: <Dashboard /> },
    { path: '/gathering/account/create', component: <CreateGatheringAccount /> },
]

const tLeader = [
    { path: '/dashboard', component: <Dashboard /> },
    { path: '/transaction/account/create', component: <CreateTransactionAccount /> },
]

const gStaff = [
    { path: '/gathering/order/arrival', component: <ConfirmOrderArrivalToGathering /> },
    { path: '/order/gathering/gathering', component: <CreateDeliveryGatheringToGatheringPoint /> },
    { path: '/order/gathering/transaction', component: <CreateDeliveryToTransactionPoint /> },
]

const tStaff = [
    { path: '/order/create', component: <CreateOrder /> },
    { path: '/transaction/order', component: <OrderTransactionPoint />},
    { path: '/order/transaction/customer', component: <CreateDeliveryToCustomer /> },
    { path: '/order/transaction/gathering', component: <CreateDeliveryTransactionToGatheringPoint /> },
    { path: '/order/transaction/arrival', component: <ConfirmOrderArrivalToTransaction /> },
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

                {/* gathering leader routes */}
                {(role === ROLES[1]) ? (
                    gLeader.map((route) => (
                        <Route key={route.path} path={route.path} element={route.component} />
                    ))) :
                (<Route key='/not-found' path='/*' element={<NotFound />} />)}

                {/* transaction leader routes */}
                {(role === ROLES[2]) ? (
                    tLeader.map((route) => (
                        <Route key={route.path} path={route.path} element={route.component} />
                    )))
                    :
                    (<Route key='/not-found' path='/*' element={<NotFound />} />)}

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
