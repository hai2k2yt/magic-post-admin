import React from 'react'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Navbar from '../component/layout/Navbar';
import Footer from '../component/layout/Footer';
import Register from './auth/Register';
const Dashbroad = () => {
    return (
        <div>
            <Navbar />
            <div class="drawer lg:drawer-open">

                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col items-left">
                    <div>

                        <Register />
                    </div>
                    {/* <!-- Page content here --> */}

                </div>
                <div class="drawer-side">
                    <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
                    <ul class="menu p-4 w-80 min-h-full bg-secondary text-neutral">
                        {/* <!-- Sidebar content here --> */}
                        <li><a href='/dashbroad'><SpaceDashboardIcon />Bảng điều khiển</a></li>
                        <li><a class="bg-neutral text-primary" href='#'><PersonAddIcon />Cấp tài khoản</a></li>
                        <li><a href="/profile"><AccountCircleIcon />Cá nhân</a></li>
                    </ul>

                </div>

            </div>
        </div>

    );
}

export default Dashbroad