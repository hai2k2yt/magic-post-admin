import Router from './routes';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./page/auth/Login";
import Home from "./page/Home";
import Register from "./page/auth/Register";

const routes = [
    {path: '/home', component: <Home/>},
    {path: '/login', component: <Login/>},
    {path: '/register', component: <Register/>},
];

function App() {
    return (
        <Router/>
    );
}

export default App;
