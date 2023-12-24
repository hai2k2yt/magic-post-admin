import React from 'react'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Navbar from '../component/layout/Navbar';
import StatisticOrder from '../component/layout/StatisticOrder';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
                    <div class="drawer-side">
                        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
                        <ul class="menu p-4 w-80 min-h-full bg-secondary text-neutral">
                            {/* <!-- Sidebar content here --> */}

                            <li><a class="bg-neutral text-primary" href=''><SpaceDashboardIcon />Bảng điều khiển</a></li>
                            <li><a href='/createAccount'><PersonAddIcon />Cấp tài khoản</a></li>
                            <li><a href="/profile"><AccountCircleIcon />Cá nhân</a></li>
                        </ul>

                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default Dashbroad