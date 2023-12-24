import Router from './routes';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./page/auth/Login";
import Home from "./page/Home";
import ManagePlace from "./page/ManagePlace";
import StatisticOrder from "./component/layout/StatisticOrder";
import ViewOrder from "./page/ViewOrder";
import CreateOrder from "./page/CreateOrder";
import CreateDeliveryToGatheringPoint from "./page/CreateDeliveryToGatheringPoint";
import ManageLeaderAccount from "./page/ManageLeaderAccount";
import CreateDeliveryToCustomer from "./page/CreateDeliveryToCustomer";
import ManageOrder from "./component/layout/StatisticAllOrder";
import About from './page/About';
import CreateAccount from './page/CreateLeaderAccount';
import Profile from './page/Profile';
import { React } from 'react';
import Layout from './component/Layout';
import { Dashboard } from '@mui/icons-material';


const admin = [
    { path: '/manage-place', component: <ManagePlace /> },
    { path: '/order/statistics', component: <StatisticOrder /> },    
    { path: '/leader/manage', component: <ManageLeaderAccount /> },
    
];
const leader = [
    { path: '/createAccount', component: <CreateAccount /> },
    { path: '/profile', component: <Profile /> },
    { path: '/dashbroad', component: <Dashboard /> },
]
const staff = [
    { path: '/order/create', component: <CreateOrder /> },
    { path: '/order/delivery/customer', component: <CreateDeliveryToCustomer /> },
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
            <Route path="/" element={<Layout/>}>
                {/* public routes */}
                {unauthorizedUser.map((route) => (
                    <Route key={route.path} path={route.path} element={route.component} />
                ))} 
                
                {/* staff routes */}
                {staff.map((route) => (
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
