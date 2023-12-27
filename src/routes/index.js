import { Route, Routes, BrowserRouter } from 'react-router-dom';

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
