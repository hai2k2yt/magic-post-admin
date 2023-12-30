import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from "react-router-dom";
import Navbar from '../../component/layout/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AddIcon from '@mui/icons-material/Add';
import { confirmP2PGatheringArrival, confirmP2PTransactionArrival, listP2PGatheringOrders } from "../../api/transport";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";
import Sidebar from "../../component/layout/Sidebar";
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
    const id = localStorage.getItem('pointId')
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const handleViewDetail = (orderId) => {
        navigate(`/order-detail/${orderId}`);
    };

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1, sortable: false },
        { field: 'sendFrom', headerName: 'Nơi gửi', flex: 2, sortable: false },
        { field: 'sendTo', headerName: 'Nơi nhận', flex: 2, sortable: false },
        { field: 'departureTime', headerName: 'Thời gian gửi', flex: 2, sortable: false },
        { field: 'arrivalTime', headerName: 'Thời gian nhận', flex: 2, sortable: false },
        { field: 'status', headerName: 'Trạng thái', flex: 2, sortable: true },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleViewDetail(params.row.OrderID)}>
                        <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={async () => {
                        await confirmP2PGatheringArrival(id, params.row.id)
                    }}>
                        <CheckIcon />
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
                <Sidebar />
            </div>
        </ThemeProvider>

    );
};

export default ConfirmGatheringOrderArrival;
