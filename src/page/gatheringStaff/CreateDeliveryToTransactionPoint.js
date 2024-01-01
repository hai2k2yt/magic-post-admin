import React, { useEffect, useState } from 'react';
// import { TextField, Button, IconButton, Grid, Paper } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from "react-router-dom";
import Navbar from '../../component/layout/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { FormControl, IconButton, InputLabel, MenuItem, Select } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { createP2PGatheringOrder, getP2PExpress, listP2PGatheringOrders } from "../../api/transport";
import { getPointInventory, listGatheringTransactionPoints } from "../../api/point";
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
const CreateDeliveryToGatheringPoint = () => {
    const id = localStorage.getItem('pointId')
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [transactionPoints, setTransactionPoints] = useState([])
    const [selectedPoint, setSelectedPoint] = useState(null)
    const [selectedRows, setSelectedRows] = useState([]);

    

    const handleSelectionChange = (selectionModel) => {
        setSelectedRows(selectionModel);
    };

    const handleCreateDelivery = async () => {
        try {
            const res = await createP2PGatheringOrder(id, {
                expressOrderIdList: selectedRows,
                destinationPointId: selectedPoint
            })
            setOrders(orders.filter(order => !selectedRows.includes(order.id)))
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
        // {
        //     field: 'action',
        //     headerName: 'Action',
        //     flex: 2,
        //     sortable: false,
        //     renderCell: (params) => (
        //         <>
        //             <IconButton onClick={() => handleViewDetail(params.row.OrderID)}>
        //                 <VisibilityIcon />
        //             </IconButton>
        //         </>

        //     ),
        // },
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
                        type: item.type === 'GOOD' ? 'Hàng hóa' : 'Tài liệu',
                        sendTime: item.sendTime,
                        status: (() => {
                            switch (item?.status) {
                                case 'POSTED':
                                    return 'Điểm giao dịch đã nhận hàng';
                                case 'TRANSPORTING_FROM_SRC_TRANSACTION':
                                    return 'Trung chuyển đến điểm tập kết';
                                case 'TRANSPORTED_TO_SRC_GATHERING':
                                    return 'Đến điểm tập kết';
                                case ' TRANSPORTING_FROM_SRC_GATHERING':
                                    return 'Trung chuyển đến điểm tập kết';
                                case 'TRANSPORTED_TO_DES_GATHERING':
                                    return 'Đến điểm tập kết đích';
                                case 'TRANSPORTING_FROM_DES_GATHERING':
                                    return 'Trung chuyển đến giao dịch đích';
                                case 'TRANSPORTED_TO_DES_TRANSACTION':
                                    return 'Đến điểm giao dịch đích';
                                case 'SHIPPING':
                                    return 'Đang giao hàng'
                                case 'DELIVERED':
                                    return 'Giao hàng thành công'
                                case 'CANCELING':
                                    return 'Người nhận không nhận hàng'
                                case 'CANCELED':
                                    return 'Đơn hàng đã hủy'
                                default:
                                    return 'Không xác định';
                            }
                        })()
                    }
                ))
                setOrders(data);

                const gatherPlace = await listGatheringTransactionPoints(id);
                const dataPlace = gatherPlace?.map(item => (
                    {
                        id: item.id,
                        name: item.name,
                        address: `${item.address.street}, ${item.address.commune}-${item.address.district}-${item.address.province}`
                    }
                ))
                setTransactionPoints(dataPlace)
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
                                Chuyển hàng tới điểm giao dịch
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
                                    {transactionPoints.map(i => (
                                        <MenuItem disabled={i.id === id} value={i.id}>{i.name}</MenuItem>
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
                <Sidebar />
            </div>
        </ThemeProvider>
    );
}
    ;

export default CreateDeliveryToGatheringPoint;
