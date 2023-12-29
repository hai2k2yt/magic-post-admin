import React, { useEffect, useState } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import PageviewIcon from '@mui/icons-material/Pageview';
import { useNavigate, useParams } from "react-router-dom";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckIcon from '@mui/icons-material/Check';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Navbar from '../../component/layout/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AddIcon from '@mui/icons-material/Add';
import { FormControl, IconButton, InputLabel, MenuItem, Select } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { createP2PGatheringOrder, createP2PTransactionOrder, listP2PGatheringOrders } from "../../api/transport";
import { getPointInventory, listGatheringPoints } from "../../api/point";

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
const CreateDeliveryTransactionToGatheringPoint = () => {
    const id = localStorage.getItem('pointId')
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [gatheringPoints, setGatheringPoints] = useState([])
    const [selectedPoint, setSelectedPoint] = useState(null)
    const [selectedRows, setSelectedRows] = useState([]);

    const handleViewDetail = (orderId) => {
        navigate(`/order-detail/${orderId}`);
    };

    const handleSelectionChange = (selectionModel) => {
        setSelectedRows(selectionModel);
    };

    const handleCreateDelivery = async () => {
        try {
            const res = await createP2PTransactionOrder(id, {
                expressOrderIdList: selectedRows,
                destinationPointId: selectedPoint
            })
        } catch (e) {
            console.error(e)
        }
    }

    const handleChangeSelectedPoint = (e) => {
        setSelectedPoint(e.target.value)
    }


    const columns = [
        { field: 'id', headerName: 'Order ID', flex: 2, sortable: false },
        { field: 'sendFromAddress', headerName: 'Send from', flex: 2, sortable: false },
        { field: 'sendToAddress', headerName: 'Send To', flex: 2, sortable: false },
        { field: 'type', headerName: 'Type', flex: 2, sortable: false },
        { field: 'sendTime', headerName: 'Send time', flex: 1, sortable: true },
        { field: 'status', headerName: 'Status', flex: 1, sortable: true },
        {
            field: 'action',
            headerName: 'Action',
            flex: 2,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleViewDetail(params.row.OrderID)}>
                        <VisibilityIcon />
                    </IconButton>
                </>

            ),
        },
    ];

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getPointInventory(id);
                const data = response?.map(item => (
                    {
                        id: item.id,
                        sendFromAddress: item?.sender?.address?.street,
                        sendToAddress: item?.receiver?.address?.street,
                        type: item.type,
                        sendTime: item.sendTime,
                        status: item.status
                    }
                ))
                setOrders(data);

                const gatherPlace = await listGatheringPoints();
                const dataPlace = gatherPlace?.map(item => (
                    {
                        id: item.id,
                        address: `${item.address.street}, ${item.address.zipcode}/${item.address.commune}-${item.address.district}-${item.address.province}`
                    }
                ))
                setGatheringPoints(dataPlace)
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
                                Chuyển hàng tới điểm tập kết
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
                                rowSelectionModel={selectedRows}
                                onRowSelectionModelChange={handleSelectionChange}
                            />
                        </div>
                        <div class='flex justify-end mt-5'>
                            <FormControl fullWidth>
                                <InputLabel id="gathering-point-select-label">Select point</InputLabel>
                                <Select
                                    className="w-full max-w-xs"
                                    labelId="gathering-point-select-label"
                                    id="gathering-point-select"
                                    value={selectedPoint}
                                    label="Select point"
                                    onChange={handleChangeSelectedPoint}
                                >
                                    {gatheringPoints.map(i => (
                                        <MenuItem disabled={i.id === id} value={i.id}>{i.address}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div class='flex justify-end mt-5'>
                            <Button onClick={handleCreateDelivery} variant="contained" color="secondary">
                                Chuyến giao hàng
                            </Button>
                        </div>

                    </div>

                </div>
                <div class="drawer-side">
                    <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
                    <ul class="menu p-4 w-80 min-h-full bg-secondary text-neutral">
                        <li><a href='/order/create'><AddCircleOutlineIcon />Ghi nhận hàng gửi</a></li>
                        <li><a href='/transaction/order'><SwapHorizIcon />Đơn mới đến điểm giao dịch</a></li>
                        <li><a class="bg-neutral text-primary" href='/order/transaction/gathering'><AddIcon />Tạo đơn hàng đến điểm tập kết</a></li>
                        <li><a href='/order/transaction/customer' ><DeliveryDiningIcon />Chuyển hàng đến người nhận</a></li>
                        <li><a href='/order/transaction/arrival'> <CheckIcon /> Xác nhận trạng thái đơn hàng</a></li>
                    </ul>
                </div>
            </div>
        </ThemeProvider >
    );
}
    ;

export default CreateDeliveryTransactionToGatheringPoint;
