import React from 'react'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Navbar from '../../component/layout/Navbar';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import Register from '../auth/Register';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Typography } from '@mui/material';
import AddLocationIconAlt from '@mui/icons-material/AddLocationAlt';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ROLES from '../auth/Role';

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
const CreateLeaderAccount = () => {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <Navbar />
            </div>
            <div class="drawer lg:drawer-open max-h-screen">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col items-left">
                    {/* <!-- Page content here --> */}
                    <div class="mx-10">
                        {
                            role === ROLES[0] &&
                            (
                                <Typography variant='h4' fontWeight={700} mt={5}>
                                    Tạo tài khoản trưởng điểm
                                </Typography>
                            )
                        }
                        {
                            (role === ROLES[1] || role === ROLES[2]) &&
                            (
                                <Typography variant='h4' fontWeight={700} mt={5}>
                                    Tạo tài khoản nhân viên 
                                </Typography>
                            )
                        }

                        <Register />

                    </div>

                </div>
                <div class="drawer-side">
                    <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
                    {
                        role === ROLES[0] && (
                            <ul class="menu p-4 w-80 min-h-full bg-secondary text-neutral">
                                <li><a href='/dashboard'><SpaceDashboardIcon />Bảng điều khiển</a></li>
                                <li><a href='/manage-transactionPoint'><AddLocationIcon />Tạo điểm giao dịch</a></li>
                                <li><a href='/manage-gatheringPoint'><AddLocationIconAlt />Tạo điểm tập kết</a></li>
                                <li><a class="bg-neutral text-primary" href='/create-account'><PersonAddIcon />Tạo tài khoản trưởng điểm</a></li>
                                <li><a href='/leader/manage'><ManageAccountsIcon />Quản lý tài khoản trưởng điểm</a></li>
                            </ul>
                        )
                    }
                    {
                        (role === ROLES[1] || role === ROLES[2]) && (
                            <ul class="menu p-4 w-80 min-h-full bg-secondary text-neutral">
                                <li><a href='/dashboard'><SpaceDashboardIcon />Bảng điều khiển</a></li>
                                <li><a class="bg-neutral text-primary" ><PersonAddIcon />Tạo tài khoản nhân viên</a></li>
                            </ul>
                        )
                    }
                </div>
            </div>
        </ThemeProvider>

    );
}

export default CreateLeaderAccount