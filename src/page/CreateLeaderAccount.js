import React from 'react'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Navbar from '../component/layout/Navbar';
import Footer from '../component/layout/Footer';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AddLocationAlt from '@mui/icons-material/AddLocationAlt';
import Register from './auth/Register';
import ManageLeaderAccount from './ManageLeaderAccount';
import { Typography } from '@mui/material';
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
const CreateLeaderAccount = () => {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <Navbar />
            </div>
            <div class="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col items-left">
                    {/* <!-- Page content here --> */}
                    <div class="m-10">
                        <div>
                            <Typography variant='h4' fontWeight={700} mb={5}>
                                Quản lý tài khoản trưởng điểm
                            </Typography>
                            <ManageLeaderAccount /></div>
                        <div>
                            <Typography variant='h4' fontWeight={700} mt={5}>
                                Tạo tài khoản trưởng điểm
                            </Typography>
                            <Register />
                        </div>
                    </div>
                </div>
                <div class="drawer-side">
                    <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
                    <ul class="menu p-4 w-80 min-h-full bg-secondary text-neutral">
                        <li><a href='/dashboard'><SpaceDashboardIcon />Bảng điều khiển</a></li>
                        <li><a href='/manage-place'><AddLocationIcon />Quản lý điểm giao dịch</a></li>
                        <li><a href='/manage-place'><AddLocationIcon /> Quản lý điểm tập kết</a></li>
                        <li><a class="bg-neutral text-primary"><PersonAddIcon />Quản lý tài khoản trưởng điểm</a></li>
                        <li><a href="/profile"><AccountCircleIcon />Cá nhân</a></li>
                    </ul>
                </div>
            </div>
        </ThemeProvider>

    );
}

export default CreateLeaderAccount