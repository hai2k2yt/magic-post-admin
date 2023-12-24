import React from 'react'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
const DrawerSideAdmin = () => {
    return (
        <div class="drawer-side">
            <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu p-4 w-80 min-h-full bg-secondary text-neutral">
                <li><a class="bg-neutral text-primary" href=''><SpaceDashboardIcon />Bảng điều khiển</a></li>
                <li><a href='/manage-place'><AddLocationIcon/>Quản lý điểm giao dịch</a></li>
                <li><a href='/manage-place'><AddLocationIcon/> Quản lý điểm tập kết</a></li>
                <li><a href='/leader/manage'><PersonAddIcon />Quản lý tài khoản trưởng điểm</a></li>
                <li><a href="/profile"><AccountCircleIcon />Cá nhân</a></li>
            </ul>

        </div>

    )
}

export default DrawerSideAdmin