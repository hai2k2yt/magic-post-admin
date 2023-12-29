import React, {useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import {useNavigate, useParams} from "react-router-dom";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Navbar from '../../component/layout/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AddIcon from '@mui/icons-material/Add';
import {confirmP2PGatheringArrival, confirmP2PTransactionArrival, listP2PGatheringOrders} from "../../api/transport";
import {IconButton} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";
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
const ConfirmGatheringOrderArrival = () => {
    let {id} = useParams();
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const handleViewDetail = (orderId) => {
        navigate(`/order-detail/${orderId}`);
    };

    const columns = [
        {field: 'id', headerName: 'Order ID', flex: 2, sortable: false},
        {field: 'sendFrom', headerName: 'Send from', flex: 2, sortable: false},
        {field: 'sendTo', headerName: 'Send To', flex: 2, sortable: false},
        {field: 'departureTime', headerName: 'Departure time', flex: 2, sortable: false},
        {field: 'arrivalTime', headerName: 'Arrival time', flex: 2, sortable: false},
        {field: 'status', headerName: 'Status', flex: 1, sortable: true},
        {
            field: 'action',
            headerName: 'Action',
            flex: 2,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleViewDetail(params.row.OrderID)}>
                        <VisibilityIcon/>
                    </IconButton>
                    <IconButton onClick={async () => {
                        await confirmP2PGatheringArrival(id, params.row.id)
                    }}>
                        <CheckIcon/>
                    </IconButton>
                </>

            ),
        },
    ];

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await listP2PGatheringOrders(id);
                const data = response?.map(item => (
                    {
                        id: item.id,
                        sendFromId: item.from.id,
                        sendFrom: item.from.name,
                        sendTo: item.to.name,
                        departureTime: item.departureTime,
                        arrivalTime: item.arrivalTime,
                        status: item.status
                    }
                ))
                setOrders(data);
            } catch (e) {
                console.log(e)
            }
        }

        fetchData();
    }, [])


    return (
        <ThemeProvider theme={theme}>
            <div>
                <Navbar />
            </div>
            <div class="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col items-left">
                    {/* <!-- Page content here --> */}
                    <div class="mx-10">
                        <div class='mt-10'>
                            <Typography variant='h4' fontWeight={700} my={5}>
                                Đơn hàng mới tới điểm tập kết
                            </Typography>
                        </div>
                        <div>
                            <DataGrid
                                rows={orders}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                checkboxSelection
                            />
                        </div>

                    </div>

                </div>
                <div class="drawer-side">
                    <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
                    <ul class="menu p-4 w-80 min-h-full bg-secondary text-neutral">
                        <li><a href='/dashboard'><SpaceDashboardIcon />Bảng điều khiển</a></li>
                        <li><a class="bg-neutral text-primary"><AddIcon/>Đơn mới</a></li>
                        <li><a href='/order/delivery/gathering'><SwapHorizIcon/>Tạo đơn đến điểm tập kết</a></li>
                        <li><a href="/profile"><AccountCircleIcon />Cá nhân</a></li>
                    </ul>
                </div>
            </div>
        </ThemeProvider>

    );
};

export default ConfirmGatheringOrderArrival;
