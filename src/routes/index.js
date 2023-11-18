import {Route, Routes} from 'react-router-dom';

import Login from "../page/auth/Login";
import Register from "../page/auth/Register";
import Home from "../page/Home.js";
import ManagePlace from "../page/ManagePlace";
import CreateTransactionAccount from "../page/CreateTransactionAccount";

// ----------------------------------------------------------------------

const routes = [
    {path: '/home', component: <Home />},
    {path: '/login', component: <Login />},
    {path: '/register', component: <Register />},
    {path: '/manage-place', component: <ManagePlace />},
    {path: '/transaction/account/create', component: <CreateTransactionAccount />},
];

export default function Router() {
    return (
            <Routes>
                {routes.map((route) => (
                    <Route path={route.path} element={route.component}/>
                ))}
            </Routes>
    )
}
