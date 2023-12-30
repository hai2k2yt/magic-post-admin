import React, { useState } from "react";

import ROLES from "../../page/auth/Role";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CheckIcon from '@mui/icons-material/Check';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
const Sidebar = () => {
    const role = localStorage.getItem('role')
    console.log(role)
    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full bg-secondary text-neutral">

                {role === ROLES[0] && (
                    <>
                        <li><a href='/dashboard'><SpaceDashboardIcon />Bảng Điều Khiển</a></li>
                        <li><a href='/gathering/account/create'><AddIcon />Tạo Tài Khoản Tập Kết</a></li>
                        <li><a href='/transaction/account/create'><AddIcon />Tạo Tài Khoản Giao Dịch</a></li>
                        <li><a href='/gathering/create'><AddIcon />Tạo Điểm Tập Kết</a></li>
                        <li><a href='/transaction/create'><AddIcon />Tạo Điểm Giao Dịch</a></li>
                        <li><a href='/manage-gatheringPoint'><ControlPointIcon />Quản Lý Điểm Tập Kết</a></li>
                        <li><a href='/manage-transactionPoint'><ControlPointIcon />Quản Lý Điểm Giao Dịch</a></li>
                        <li><a href='/leader/manage'><AddCircleOutlineIcon />Quản Lý Tài Khoản Lãnh Đạo</a></li>

                    </>
                )}

                {role === ROLES[1] && (
                    <>
                        <li><a href='/dashboard'><SpaceDashboardIcon />Bảng Điều Khiển</a></li>
                        <li><a href='/gathering/account/create'><AddIcon />Tạo Tài Khoản Nhân viên Tập Kết</a></li>

                    </>
                )}

                {role === ROLES[2] && (
                    <>
                         <li><a href='/dashboard'><SpaceDashboardIcon />Bảng Điều Khiển</a></li>
                        <li><a href='/transaction/account/create'><AddIcon />Tạo Tài Khoản Nhân viên Giao Dịch</a></li>
                    </>
                )}

                {role === ROLES[3] && (
                    <>
                        <li><a href='/gathering/order/arrival'><CheckIcon  />Xác nhận đơn đến điểm tập kết</a></li>
                        <li><a href='/order/gathering/gathering'><SwapHorizIcon />Chuyển đơn đến điểm tập kết</a></li>
                        <li><a href='/order/gathering/transaction'><SwapHorizIcon />Chuyển đơn đến điểm giao dịch</a></li>
                    </>
                )}

                {role === ROLES[4] && (
                    <>
                        <li><a href='/order/create'><AddCircleOutlineIcon/>Tạo đơn</a></li>
                        <li><a href='/order/transaction/customer'><SwapHorizIcon />Chuyển đơn đến khách hàng</a></li>
                        <li><a href='/order/transaction/gathering'><SwapHorizIcon />Chuyển đơn đến điểm tập kết</a></li>
                        <li><a href='/order/transaction/arrival'><CheckIcon />Xác nhận đơn đến điểm giao dịch</a></li>
                    </>
                )}

            </ul>
        </div>
    )
}

export default Sidebar