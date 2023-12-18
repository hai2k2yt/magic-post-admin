import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Login from "../page/auth/Login";
import Register from "../page/auth/Register";
import Home from "../page/Home.js";
import ManagePlace from "../page/ManagePlace";
import StatisticOrder from "../page/StatisticOrder";
import ViewOrder from "../page/ViewOrder";
import CreateOrder from "../page/CreateOrder";
import CreateDeliveryToGatheringPoint from "../page/CreateDeliveryToGatheringPoint";
import ManageLeaderAccount from "../page/ManageLeaderAccount";
import CreateDeliveryToCustomer from "../page/CreateDeliveryToCustomer";
import ManageOrder from "../page/ManageOrder";
import TransactionLeaderHome from '../page/TransactionLeaderHome.js';
import About from '../page/About.js';
import CreateAccount from '../page/CreateAccount.js';
import Profile from '../page/Profile.js';
import { React } from 'react';
import { AuthProvider } from '../context/AuthProvider';
import App from '../App.js';
// ----------------------------------------------------------------------


export default function Router() {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path='/*' element={<App/>}></Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </React.StrictMode>
    )
}
