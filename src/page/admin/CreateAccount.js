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
                <Sidebar />
            </div>
        </ThemeProvider>

    );
}

export default CreateLeaderAccount