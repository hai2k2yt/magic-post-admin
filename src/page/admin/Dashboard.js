import React from 'react'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Navbar from '../../component/layout/Navbar';
import StatisticOrder from '../../component/layout/StatisticOrder';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AddLocationIconAlt from '@mui/icons-material/AddLocationAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ROLES from '../auth/Role';
import Sidebar from "../../component/layout/Sidebar";

const role = localStorage.getItem('role');
const theme = createTheme({
    typography: {
        "fontFamily": '"Montserrat", "sans-serif"',
    },
    palette: {
        primary: {
            main: '#161A30',
        },
        secondary: {
            main: '#31304D',
        },
        third: '#B6BBC4'
    }

})
const Dashbroad = () => {
    return (
        <ThemeProvider theme={theme}>
            <div class="min-h-full">
                <Navbar />
                <div class="drawer lg:drawer-open">

                    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                    <div class="drawer-content flex flex-col items-left">
                        {/* <!-- Page content here --> */}
                        <div class="m-20">
                            <StatisticOrder />
                        </div>

                    </div>
                    <Sidebar />
                </div>
            </div>
        </ThemeProvider>
    );
}

export default Dashbroad