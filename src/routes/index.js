import {Route, Routes, HashRouter} from 'react-router-dom';

import Login from "../page/auth/Login";
import Register from "../page/auth/Register";
import Home from "../page/Home.js";

// ----------------------------------------------------------------------

const routes = [
    {path: '/home', component: <Home />},
    {path: '/login', component: <Login />},
    {path: '/register', component: <Register />},
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
